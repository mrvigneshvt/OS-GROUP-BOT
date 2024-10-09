import { ID } from "@mtkruto/node";
import { ResetRequestMissing } from "@mtkruto/node/script/3_errors";
import { text } from "stream/consumers";
import { groupModel } from "./model";
import bot from "./server";

export class localStore {
    public storage: any
    private unlockPool: any
    private groupPool: any

    constructor() {

        this.storage = {

        };

        this.unlockPool = {

        };

        this.groupPool = {

        };

    }

    public async paramsGroupPool(id: string, params: string, sendfull?: boolean) {
        try {
            console.log(this.groupPool, '/', id, '/', params)
            if (this.groupPool && this.groupPool[id]) {
                console.log('exist in groupPool');
                console.log(this.groupPool[id])

                // Check if 'params' exists within this.groupPool[id]
                if (this.groupPool[id][params]) {
                    if (sendfull) {
                        return this.groupPool[id];
                    }
                    return this.groupPool[id][params];
                }

                console.log('property Not exit in gorupool')

                return false

            }

            // If id or params don't exist, return false
            return false;
        } catch (error) {
            console.log('error in paramsGroupPool:::', error);
            return false; // Return false in case of an error
        }
    }


    public async generateGroupPool() {
        try {
            const powerer = await groupModel.find({})
            this.groupPool = {}
            const listingPowerer = powerer.map((m) => this.groupPool[m.userGroupId] = m);
            console.log(this.groupPool)
        } catch (error) {
            console.log('error in poolGEnerator')
        }
    }


    public poolExist(hash: string) {
        if (!this.unlockPool[hash]) {
            return false
        }
        return this.unlockPool[hash]

    }

    public addPool(id: string, hash: string, endPoint: string, short: string, uniqueId: string) {


        if (!this.unlockPool[hash]) {
            this.unlockPool[hash] = {
                user: id,
                url: endPoint,
                shortUrl: short,
                fileId: uniqueId,
            }
        }

        setTimeout(() => {
            delete this.unlockPool[hash]
        }, 600000 + 600000);

        return this.unlockPool[hash];
    }

    public deleteResponse(chatId: string, userID: number, msgId: number) {
        // Check if the chatId, userID, and msgId exist
        console.log(chatId, '/', userID, '/', msgId)
        if (this.storage[chatId] && this.storage[chatId][userID] && this.storage[chatId][userID][msgId]) {
            // Delete the msgId from storage
            delete this.storage[chatId][userID][msgId];
            console.log(`Deleted msgId ${msgId} from chat ${chatId}, user ${userID}`);
        } else {
            console.log(`No data found for msgId ${msgId} under chat ${chatId} and user ${userID}`);
        }
        console.log('deleted n updated :  ', this.storage)
    }


    public isResponse(chatId: string, userID: number, msgId: number) {
        if (!this.storage[chatId][userID][msgId]) {
            return false
        }

        return true
    }

    private checkChatAvailable(chatId: string, userId: number, msgId: number) {
        console.log(chatId, '/', userId);

        // Check if chatId exists, if not, initialize it as an empty object
        if (!this.storage[chatId]) {
            this.storage[chatId] = {};
        }

        // Check if userId exists under chatId, if not, initialize it
        if (!this.storage[chatId][userId]) {
            this.storage[chatId][userId] = {};
        }

        if (!this.storage[chatId][userId][msgId]) {
            this.storage[chatId][userId][msgId] = {};

        }

        console.log(this.storage);
        return;
    }


    private storeResult(chatId: string, msgId: number, file: any, userID: number) {
        this.checkChatAvailable(chatId, userID, msgId)
        this.storage[chatId][userID][msgId] = file
        console.log(this.storage[chatId][userID], 'store result')
    }


    public savingReplyMarkup(text: string, arr: any[], chunkSize: number, chatId: string, msgId: number, userID: number) {

        // Map data to the format required for buttons
        const mappedData = arr.map((m: any) => ([{
            text: `[${m.fileSize}]-${m.fileName}`,
            url: `https://t.me/${bot.botUname}?start=file_${m.fileUniqueId}_${chatId}`,
        }]));

        // Function to create the main structure
        const createMarkup = (query: string, fileChunk: any[], currentIndex: number, totalChunks: number) => {
            const result: any[][] = [
                [{ text: `⚡️${text}⚡️`, url: `https://t.me/${bot.publicChannelUname}` }],
                [{ text: `Quality`, callbackData: `Quality/${query}` }, { text: "Series", callbackData: `Series/${query}` }],
            ];

            result.push(...fileChunk); // Add file chunk

            // Handle previous and next navigation buttons
            const prevPage = currentIndex > 0 ? currentIndex - 1 : 0;
            const nextPage = currentIndex < totalChunks - 1 ? currentIndex + 1 : currentIndex;

            result.push([
                { text: '<-', callbackData: `page/${chatId}/${msgId}/${prevPage}` },
                { text: '->', callbackData: `page/${chatId}/${msgId}/${nextPage}` }
            ]);

            return result;
        };

        // Array to hold the entire reply markup
        const fullReplyMarkup: any[][][] = [];

        // Iterate over the array in chunks
        const totalChunks = Math.ceil(arr.length / chunkSize);
        for (let i = 0; i < arr.length; i += chunkSize) {
            const fileChunk = mappedData.slice(i, i + chunkSize);
            const currentIndex = i / chunkSize; // Track current page index
            fullReplyMarkup.push(createMarkup(text, fileChunk, currentIndex, totalChunks));
        }

        // Store result in the storage
        this.storeResult(chatId, msgId, fullReplyMarkup, userID);

        return fullReplyMarkup;
    }



    public getResult(chatId: string, msgId: number, userId: number) {
        console.log(this.storage);
        console.log(chatId, '/', msgId, '/', userId);

        // Ensure that chatId, userId, and msgId exist in the storage
        const isExist = this.checkChatAvailable(chatId, userId, msgId);
        if (!this.storage[chatId][userId][msgId]) {
            return [];
        }

        // Return the stored result
        return this.storage[chatId][userId][msgId];
    }



}

