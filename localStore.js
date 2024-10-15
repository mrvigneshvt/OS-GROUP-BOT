"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.localStore = void 0;
const model_1 = require("./model");
const server_1 = __importDefault(require("./server"));
class localStore {
    constructor() {
        this.storage = {};
        this.unlockPool = {};
        this.groupPool = {};
    }
    paramsGroupPool(id, params, sendfull) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(this.groupPool, '/', id, '/', params);
                if (this.groupPool && this.groupPool[id]) {
                    console.log('exist in groupPool');
                    console.log(this.groupPool[id]);
                    // Check if 'params' exists within this.groupPool[id]
                    if (this.groupPool[id][params]) {
                        if (sendfull) {
                            return this.groupPool[id];
                        }
                        return this.groupPool[id][params];
                    }
                    console.log('property Not exit in gorupool');
                    return false;
                }
                // If id or params don't exist, return false
                return false;
            }
            catch (error) {
                console.log('error in paramsGroupPool:::', error);
                return false; // Return false in case of an error
            }
        });
    }
    generateGroupPool() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const powerer = yield model_1.groupModel.find({});
                this.groupPool = {};
                const listingPowerer = powerer.map((m) => this.groupPool[m.userGroupId] = m);
                console.log(this.groupPool);
            }
            catch (error) {
                console.log('error in poolGEnerator');
            }
        });
    }
    poolExist(hash) {
        if (!this.unlockPool[hash]) {
            return false;
        }
        return this.unlockPool[hash];
    }
    addPool(id, hash, endPoint, short, uniqueId, tutorialId) {
        if (!this.unlockPool[hash]) {
            if (tutorialId) {
                this.unlockPool[hash] = {
                    user: id,
                    url: endPoint,
                    shortUrl: short,
                    fileId: uniqueId,
                    tutorial: tutorialId,
                };
            }
            else {
                this.unlockPool[hash] = {
                    user: id,
                    url: endPoint,
                    shortUrl: short,
                    fileId: uniqueId,
                };
            }
        }
        setTimeout(() => {
            delete this.unlockPool[hash];
        }, 600000 + 600000);
        return this.unlockPool[hash];
    }
    deleteResponse(chatId, userID, msgId) {
        // Check if the chatId, userID, and msgId exist
        console.log(chatId, '/', userID, '/', msgId);
        if (this.storage[chatId] && this.storage[chatId][userID] && this.storage[chatId][userID][msgId]) {
            // Delete the msgId from storage
            delete this.storage[chatId][userID][msgId];
            console.log(`Deleted msgId ${msgId} from chat ${chatId}, user ${userID}`);
        }
        else {
            console.log(`No data found for msgId ${msgId} under chat ${chatId} and user ${userID}`);
        }
        console.log('deleted n updated :  ', this.storage);
    }
    isResponse(chatId, userID, msgId) {
        if (!this.storage[chatId][userID][msgId]) {
            return false;
        }
        return true;
    }
    checkChatAvailable(chatId, userId, msgId) {
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
    storeResult(chatId, msgId, file, userID) {
        this.checkChatAvailable(chatId, userID, msgId);
        this.storage[chatId][userID][msgId] = file;
        console.log(this.storage[chatId][userID], 'store result');
    }
    savingReplyMarkup(text, arr, chunkSize, chatId, msgId, userID) {
        // Map data to the format required for buttons
        const mappedData = arr.map((m) => ([{
                text: `[${m.fileSize}]-${m.fileName}`,
                url: `https://t.me/${server_1.default.botUname}?start=file_${m.fileUniqueId}_${chatId}`,
            }]));
        // Function to create the main structure
        const createMarkup = (query, fileChunk, currentIndex, totalChunks) => {
            const result = [
                [{ text: `⚡️${text}⚡️`, url: `${server_1.default.publicChannelUname}` }],
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
        const fullReplyMarkup = [];
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
    getResult(chatId, msgId, userId) {
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
exports.localStore = localStore;
