import { Client, Context, ID, StorageLocalStorage, errors } from '@mtkruto/node'
import { DataBase } from './data'
import * as fs from 'fs'
import { format } from 'date-fns';

import { toZonedTime } from 'date-fns-tz';

import { localStore } from './localStore'
import axios from 'axios'
import { EmailHashExpired } from '@mtkruto/node/script/3_errors'
import { groupModel, userModel } from './model'
import { totalmem } from 'os';
import { Markup } from './markup';
import { text } from 'stream/consumers';
import { send } from 'process';


interface botData {
    apiId: number,
    apiHash: string,
    botToken: string,
    mongoUri: string,
}

interface indexInterface {
    datas: {
        done: number,
        skip: number,
        round: number,
    },
    ctx: any,
    channelId: ID,
    msgId: number,
    chatId: string,
    msgToModify: number,
    channelName: string,
}


export class Bot extends localStore {

    private forceSub
    private premiumBenefitsVideo: string | undefined;
    private premiumBenefits
    private admin: string[]
    private fileLog: string[]
    private apiId
    private apiHash
    private botToken
    private mongoUri
    public client: Client
    private mongo
    private botDetails: any
    private msgDeleteTime
    private planDescription
    private planImage
    private upiId
    private paymentScreenshotId
    private qrImage: string | undefined
    private upiImage
    private qrCaption
    private forceSubUrl: string | undefined
    private forceSubChatId: undefined | string
    private indexLog;
    private botUrl;
    private tutorialUrl: string | undefined
    private apiUrl;
    private apiToken;
    public botUname: string | undefined
    private contactAdmin
    private poweringGroupLog;
    private isAdsOn;
    private publicChannelUserName;
    private botUserName;
    public publicChannelUname;
    private percentageAds
    private supportLog;
    private sendLogs



    constructor(data: botData) {
        super()
        this.sendLogs = '-1002462166410'
        this.botUrl = 'https://t.me/'
        this.percentageAds = 20;
        this.publicChannelUname = 'SingleMachiOffll';
        this.publicChannelUserName = `@${this.publicChannelUname}`;

        this.contactAdmin = `${this.botUrl}MachiXsupportBot`;
        this.upiId = 'sooon'
        this.paymentScreenshotId = `${this.botUrl}MachiXsupportBot`;


        this.admin = ['1767901454', '7822087230'];
        this.supportLog = '-1002404917291';

        this.indexLog = '-1002473253639'// - 1002279938392';

        this.poweringGroupLog = '-1002363091043'; //channel id of groupChat !
        this.fileLog = ['-1002094214421']


        this.isAdsOn = true;


        this.botUserName = '@';

        this.botUname = undefined
        this.tutorialUrl = undefined
        this.forceSubUrl = undefined
        this.forceSubChatId = undefined;
        this.premiumBenefitsVideo = undefined
        this.qrImage = undefined
        this.upiImage = 'https://ibb.co/xm65Ghx'
        this.planImage = 'https://ibb.co/3RynpHB'


        this.apiUrl = 'publicearn.com';
        this.apiToken = 'a80541b1e03491a66635e6b2a1942b5a2af15906';


        this.premiumBenefits = `<b>ᴘʀᴇᴍɪᴜᴍ ғᴇᴀᴛᴜʀᴇs ✅\n\n📌 ɴᴏ ɴᴇᴇᴅ ᴛᴏ ᴠᴇʀɪғʏ\n📌 ᴅɪʀᴇᴄᴛ ғɪʟᴇs\n📌 ғᴀsᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴ\n📌 ᴡᴀᴛᴄʜ ᴏɴʟɪɴᴇ ᴏᴘᴛɪᴏɴ\n📌 ᴜɴʟɪᴍɪᴛᴇᴅ ᴍᴏᴠɪᴇs & sᴇʀɪᴇs\n\nThese Benefit You Will Get If You Purchase The Premium Membership 😉</b>${this.publicChannelUserName}\n\n`

        this.apiId = data.apiId;
        this.apiHash = data.apiHash;
        this.botToken = data.botToken;
        this.mongoUri = data.mongoUri


        this.client = new Client({
            storage: new StorageLocalStorage('Session'),
            apiId: this.apiId,
            apiHash: this.apiHash,
            defaultHandlers: false,
        })

        this.mongo = new DataBase(this.mongoUri);
        this.botDetails = undefined;


        this.msgDeleteTime = 60000 //1 minute

        this.planDescription = `Hello!!😎\nThis Is Premium Purchase Section\nOwned by: ${this.publicChannelUserName} 💨 \n\nCh}eck The Premium Plans By Click the Button Below 👇`

        this.qrCaption = `Scan The Qr Code 👆And Pay The Plan Fees\n\nIMPORTANT - After Payment Send Screenshot Here👇`


        this.forceSub = true


        this.client.invoke.use(async ({ error }, next) => {
            if (error instanceof errors.FloodWait) {
                console.log(`Flood wait for ${error.seconds} seconds`);
                await new Promise((r) => setTimeout(r, 1000 * error.seconds));
                return true; // Indicates that the error was handled
            } else {
                return next(); // Proceed with the next middleware
            }
        });

    }

    private async fileLogs(client: Client, data: {
        userId: string,
        userName: string,
        fileName: string,
    }) {
        try {
            let caption = `USER: ${data.userName}\n\nUSERID: ${data.userId}\n\nFILENAME: ${data.fileName}`
            await this.client.sendMessage(this.sendLogs, caption)
        } catch (error) {
            console.log('error in fileLogs:::', error)
        }
    }

    /* private async sendFile(data: any) {
         try {
             try {
                 const sendDoc = await await ctx.replyVideo(fileData.fileId, {
                     caption,
                     parseMode: 'HTML',
                 });
 
                 setTimeout(async () => {
                     await ctx.deleteMessage(del.id)
                 }, 59000);
 
                 return
             } catch (error: any) {
                 console.log('error when sendinf as video')
                 if (error.message.startsWith('Unreachable')) {
                     const sendDoc = await ctx.replyDocument(fileData.fileId, {
                         caption,
                         parseMode: 'HTML',
                     });
 
                     setTimeout(async () => {
                         await ctx.deleteMessage(sendDoc.id)
                     }, 59000);
 
                     return
                 }
 
 
             }
         } catch (error) {
             console.log('error in send FIle:;;;', error)
         }
     }*/
    private upiInformation(upiId: string) {
        return `Pay On This Upi Id 👇\nUPI Handle - <code>${upiId}</code>\n\nIMPORTANT - After Payment Send Screenshot Here👇`
    }

    private percentagePartition() {
        // Generate a random number between 0 and 100
        const randomValue = Math.random() * 100;

        // Return true if the random value is less than or equal to the percentage chance
        return randomValue <= this.percentageAds;
    }

    public async indexEngine() {
        try {
            this.client.command('index', async (ctx: any) => {
                try {
                    let editedMsg
                    const chatId = ctx.message.chat.id
                    const channelId = ctx.message.replyToMessage?.forwardFrom?.chat?.id || undefined
                    const userId = String(ctx.message.from?.id)
                    //console.log(ctx.message.replyToMessage)
                    const channelName = ctx.message.replyToMessage?.forwardFrom?.chat.title || undefined
                    const indexMsgId = ctx.message.replyToMessage || undefined

                    const INDEXmsgId = indexMsgId.forwardFrom.messageId

                    //console.log(INDEXmsgId, 'chaattt');



                    if (!this.admin.includes(userId)) {
                        console.log("non admin invoking index");
                        return
                    }

                    if (!userId || !channelId || !channelName || !indexMsgId) {
                        return await ctx.reply("<b>INVALID FORMAT !! \n\nSend a File and Reply it With /Index..</b>", {
                            parseMode: 'HTML'
                        })
                    };



                    const isAccessible = await this.client.getMessage(channelId, INDEXmsgId);

                    //   console.log(isAccessible);


                    editedMsg = await ctx.reply(`<b>Indexing Started!!\n\nChannel: <u>${channelName}</u></b>`, {
                        parseMode: 'HTML',
                    });

                    let Datas = {
                        done: 0,
                        skip: 0,
                        round: 1
                    }

                    //  while (this.index) {
                    await this.indexRounds({
                        datas: Datas,
                        ctx: ctx,
                        channelId: channelId,
                        msgId: Number(INDEXmsgId),
                        chatId: String(chatId),
                        msgToModify: editedMsg.id,
                        channelName: channelName,
                    })
                    //  }


                } catch (error: any) {
                    console.log('error in index::::::::', error);
                    console.log('error in index::::::::', error.errorMessage)
                    if (error.errorMessage == 'CHANNEL_PRIVATE') {
                        return await ctx.reply("<b>Bot Has NO RIGHTS !!\n\nPlease ADD bot as Admin with All RIghts !</b>", {
                            parseMode: "HTML",
                        });
                    }
                }
            })
        } catch (error) {
            console.log('error in index engine:::', error)
        }
    }


    public async start() {
        try {
            await this.mongo.connectDB();
            console.log(await this.mongo.adminReport(this.isAdsOn))
            console.log('trying to connect to bot.....')
            await this.client.start({ botToken: this.botToken })
            console.log(' connected to bot..... getting details:')


            const data = this.botDetails = await this.client.getMe();

            this.botUname = data.username;
            this.botUserName = this.botUserName + data.username;

            console.log(this.botDetails);

            const conclude = await this.startEngine();



        } catch (error) {
            console.log('error in bot "start":', error)
            throw new Error('crashing..')
        }
    }

    private async startEngine() {
        try {
            let botData = await this.mongo.botModel(this.botToken);
            // console.log(botData, 'botDataaaaaaaa');
            if (!botData) {
                throw new Error('cant find Your BotModel or Datas..!')
            }
            botData = botData[0]

            if (botData.poweringGroupLog) {
                this.poweringGroupLog = botData.poweringGroupLog;
                console.log('refreshed poweingLog: ', this.poweringGroupLog)

            }
            if (botData.fileLog) {
                this.fileLog = botData.fileLog;
                console.log('refreshed fileLog: ', this.fileLog)


            }
            if (botData.upiId) {
                this.upiId = botData.upiId;
                console.log('refreshed upiId: ', this.upiId)

            }
            if (botData.contactAdmin) {
                this.contactAdmin = `${this.botUrl}${botData.contactAdmin}`;
                console.log('refreshed contactAdmin: ', this.contactAdmin)

            }
            if (botData.publicChannelUName) {
                this.publicChannelUname = `${this.botUrl}${botData.publicChannelUName}`;
                console.log('refreshed publicChannelName: ', this.publicChannelUname)

            }
            if (botData.qrFileId) {
                this.qrImage = botData.qrFileId;
                console.log('refreshed qr IDD: ', this.qrImage)
            }

            if (botData.tutorialVideo) {
                this.tutorialUrl = botData.tutorialVideo;
                console.log('refreshed tutorialVideo: ', this.tutorialUrl)
            }

            if (botData.forceSubUrl) {
                this.forceSubUrl = botData.forceSubUrl;
            }

            if (botData.forceSubChatId) {
                this.forceSubChatId = botData.forceSubChatId;

            }

            console.log('setupped everything')
            console.log('botURl:   ', this.botUrl)

            console.log('publicchannelname:   ', this.publicChannelUname)
            console.log('contact:   ', this.contactAdmin);
            console.log('powering group:   ', this.poweringGroupLog);
            console.log('fileLOG:   ', this.fileLog);
            console.log('upiId:   ', this.upiId);

            console.log('DONEEEEEEEEEEEEEEEEEE')

            console.log(botData)





        } catch (error) {
            console.log('error in startEngine..')
            throw new Error('crashing due to error in startENGINE')
        }
    }





    public async getCurrentISTTime() {
        const timeZone = 'Asia/Kolkata'; // IST timezone
        const zonedTime = toZonedTime(new Date(), timeZone); // Convert UTC time to IST
        const currentISTTime = format(zonedTime, 'yyyy-MM-dd HH:mm:ss');
        return currentISTTime
    }



    public async listener() {


        this.client.on('callbackQuery:data', async (ctx: any) => {

            const userId = ctx.callbackQuery.from.id;
            const callBackData = ctx.callbackQuery.data;
            const callBackDataId = ctx.callbackQuery.id
            const msgId = Number(ctx.callbackQuery.message?.id)
            const chatId = Number(ctx.callbackQuery.message?.chat.id)
            const chatTitle = ctx.callbackQuery.message.chat.title
            //console.log(ctx);


            if (callBackData.startsWith('freePlan')) {
                try {
                    await ctx.deleteMessage(msgId);
                    const isIt = await this.mongo.isFreeTrialUsed(String(userId));

                    if (!isIt) {
                        await this.mongo.Unlock(String(userId), this.client, undefined, true);
                        const del = await ctx.reply("<b>Your Premium Plan Has been Activated !\n\nTill TONIGHT!</b>", {
                            parseMode: 'HTML'
                        });

                        setTimeout(async () => {
                            await ctx.deleteMessage(del.id)
                        }, 5000)


                    } else {
                        const del = await ctx.reply('<b>🤣 you already used free now no more free trail. please buy subscription here are our 👉 /plan </b>', {
                            parseMode: 'HTML',
                        })

                        setTimeout(async () => {
                            await ctx.deleteMessage(del.id)
                        }, 5000)
                    }
                } catch (error) {
                    console.log('error in free plan callBack:::: ', error)
                }
            }
            if (callBackData.startsWith('Series')) {
                try {

                    let query = callBackData.split('/')
                    query = query[1]
                    const msgId = ctx.msg?.id || undefined;

                    //  console.log(query, msgId)

                    if (query && msgId) {

                        const msgID = await ctx.editMessageText(msgId, 'Choose The Season You Need !', {
                            replyMarkup: {
                                inlineKeyboard: [
                                    [{ text: 'Season 1', callbackData: `reQuery/${query}/S01` }, { text: 'Season 6', callbackData: `reQuery/${query}/S06` }],
                                    [{ text: 'Season 2', callbackData: `reQuery/${query}/S02` }, { text: 'Season 7', callbackData: `reQuery/${query}/S07` }],
                                    [{ text: 'Season 3', callbackData: `reQuery/${query}/S03` }, { text: 'Season 8', callbackData: `reQuery/${query}/S08` }],
                                    [{ text: 'Season 4', callbackData: `reQuery/${query}/S04` }, { text: 'Season 9', callbackData: `reQuery/${query}/S09` }],
                                    [{ text: 'Season 5', callbackData: `reQuery/${query}/S05` }, { text: 'Season 10', callbackData: `reQuery/${query}/S10` }]
                                ]
                            }
                        })

                        //console.log(msgID.id, 'msgID')

                        return
                    }


                } catch (error) {
                    console.log('error in SERIES FILTER::::', error)
                }
            }

            if (callBackData.startsWith('file')) {
                try {
                    let data = callBackData.split('/')
                    data = await this.mongo.sendFile(data[1]);

                    //console.log(data)
                } catch (error) {
                    console.log('eror in sending callback file:::::::', error)
                }
            }
            if (callBackData.startsWith('reQuery/')) {
                try {


                    const data = callBackData.split('/');

                    //console.log(data, 'datataaaaaaaa')

                    if (data.length > 2) {
                        await ctx.deleteMessage(ctx.msg.id);
                        const queryData: {
                            query: string,
                            addOn: string
                        } = {
                            query: data[1],
                            addOn: data[2],
                        }

                        await this.queryManager(ctx, ctx.callbackQuery.from.id, queryData, ctx.msg.chat.id, ctx.callbackQuery.from.firstName, chatTitle)

                    }

                    return


                } catch (error) {
                    console.log('error in reQuery::::::::', error)
                }
            }
            if (callBackData.startsWith('Quality')) {
                try {
                    const msgId = ctx.msg?.id || undefined;
                    const data = callBackData.split('/')

                    if (!msgId) {

                        await ctx.answerCallbackQuery({
                            text: 'Some ERROR CONTACT ADMIN',
                            alert: true,
                        });

                        return
                    }

                    const modif = await ctx.editMessageText(Number(msgId), `< b > The Results for : ${data[1]} \n\nRequested by: ${ctx.callbackQuery.from.firstName} \n\nPowered By: ${ctx.chat.title} </b>`, {
                        replyMarkup: {
                            inlineKeyboard: [
                                [{ text: '360p', callbackData: `reQuery/${data[1]}/360p` }, { text: '480p', callbackData: `reQuery/${data[1]}/480p` }],
                                [{ text: '720p', callbackData: `reQuery/${data[1]}/720p` }, { text: '1080p', callbackData: `reQuery/${data[1]}/1080p` }],
                                [{ text: '1440p', callbackData: `reQuery/${data[1]}/1440p` }, { text: '2160p', callbackData: `reQuery/${data[1]}/2160p` }]
                            ],
                        },
                        parseMode: 'HTML',
                    });



                    setTimeout(async () => {
                        await ctx.deleteMessage(modif.id)
                    }, 59000)




                } catch (error) {
                    console.log('errror in Quality::::', error)
                }
            }


            if (callBackData.startsWith('page')) {

                try {
                    const senderId = ctx.callbackQuery.from.id;
                    const data = callBackData.split('/');

                    // console.log(data[3], 'dataaaaaaaaaa')
                    if (ctx.callbackQuery.from.id !== ctx.msg.replyToMessage.from.id) {
                        await ctx.answerCallbackQuery({
                            text: 'Search for YOUrself Dont Distrub others Chat',
                            alert: true
                        })

                        return
                    }
                    if (Number(data[3]) < 1) {
                        await ctx.answerCallbackQuery({
                            text: `You ARE IN THE FIRST PAGE !!`,
                            alert: true,
                        })
                        return
                    }


                    let markup = this.getResult(data[1], Number(data[2]), userId);


                    if (data[3] > markup.length) {
                        await ctx.answerCallbackQuery({
                            text: `You ARE IN THE LAST PAGE!!`,
                            alert: true,
                        })

                        return
                    }

                    // console.log(await ctx.getMessage(Number(data[2])), 'msgREFF');


                    const del = await this.client.editMessageText(data[1], Number(data[2]), `< b > RESULTS: \n\nCurrent Page: ${(Number(data[3]) + 1)}\n\nThis Message Will be Deleted Automatically in 1 Minute </b>`, {
                        replyMarkup: {
                            inlineKeyboard: markup[Number(data[3])]
                        },
                        parseMode: 'HTML',

                    });

                    setTimeout(async () => {
                        await ctx.deleteMessage(del.id)
                    }, 59000)

                    markup[1]
                } catch (error) {
                    console.log('eror in callback pagination;;;;;;;;', error)
                }
            }

            if (callBackData.startsWith('planIntro')) {
                try {
                    await this.client.deleteMessage(chatId, msgId);

                    await ctx.replyPhoto(this.planImage, {
                        caption: this.planDescription,
                        replyMarkup: {
                            inlineKeyboard: Markup.planStartReplyMarkup(),
                        }
                    })

                } catch (error) {
                    console.log('error in callback planIntro::', error)

                }
            }

            if (callBackData.startsWith("ADS")) {
                try {
                    const destructure = callBackData.split('/');
                    const data = await this.mongo.adminReport(this.isAdsOn)


                    const msgId = Number(destructure[1])
                    const chatId = destructure[2]

                    //console.log(chatId, '/', msgId)
                    if (this.isAdsOn) {
                        console.log('turning off ads')
                        this.isAdsOn = false

                        await this.client.editMessageText(`${chatId}`, Number(msgId), data, {
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: [
                                    [{ text: 'Turn ON ADS', callbackData: `ADS/${msgId}/${chatId}` }]
                                ]
                            }
                        })

                    } else {
                        this.isAdsOn = true
                        console.log('turning on ads')



                        await this.client.editMessageText(`${chatId}`, Number(msgId), data, {
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: [
                                    [{ text: 'Turn ON ADS', callbackData: `ADS/${msgId}` }]
                                ]
                            }
                        })

                    }
                } catch (error) {
                    console.log('error in admin callback::', error)
                }
            }

            if (callBackData.startsWith('tutorial')) {
                try {
                    const data = callBackData.split('_');

                    const tempPool = await this.paramsGroupPool(data[1], 'tutorial', true);

                    if (tempPool) {
                        await ctx.replyVideo(tempPool.tutorial)

                        return

                    } else {
                        if (!this.tutorialUrl) {
                            const temp = await ctx.reply('No Tutorial Video exist')

                            setTimeout(async () => {
                                await ctx.deleteMessage(temp.id)
                            }, 5000);

                            return
                        }
                        await ctx.replyVideo(this.tutorialUrl, {
                            caption: '<b>This is a Default Video set FROM OWNER SIDE</b>'
                        })

                        return
                    }

                } catch (error) {
                    console.log('error in callback show tutorial::', error)
                }
            }

            if (callBackData.startsWith('showBenefits')) {
                try {
                    await this.client.deleteMessage(chatId, msgId);
                    if (this.premiumBenefitsVideo) {
                        const send = await ctx.replyVideo(this.premiumBenefitsVideo, {
                            caption: this.premiumBenefits,
                            parseMode: 'HTML'
                        })

                        setTimeout(async () => {
                            await this.client.deleteMessage(chatId, send.id)
                        }, 59000)

                        return
                    }

                    await ctx.reply('No Premium Benefits Video set By Admin...')
                    return
                } catch (error) {
                    console.log('error in callback show BEnefits::', error)

                }
            }

            if (callBackData.startsWith('qr')) {
                try {
                    console.log('invloking qr');
                    if (this.qrImage) {
                        await this.client.deleteMessage(chatId, msgId)

                        const sentMsg = await ctx.replyPhoto(this.qrImage, {
                            caption: this.qrCaption,
                            replyMarkup: {
                                inlineKeyboard: Markup.qrReplyMarkup(this.paymentScreenshotId)
                            }
                        });
                    }

                    await ctx.answerCallbackQuery({
                        text: 'No QR has Been Set By ADMIN !',
                        alert: true
                    })

                    return

                } catch (error) {
                    console.log('error in callback qr::', error)

                }
            }

            if (callBackData.startsWith('upi')) {
                try {
                    const cap = this.upiInformation(this.upiId)
                    await this.client.deleteMessage(chatId, msgId)
                    console.log('invloking upi');
                    await ctx.replyPhoto(this.upiImage, {
                        caption: cap,
                        parseMode: 'HTML',
                        replyMarkup: {
                            inlineKeyboard: Markup.upiReplyMarkup(this.paymentScreenshotId)
                        }
                    })

                } catch (error) {
                    console.log('error in callback upi::', error)

                }
            }

            if (callBackData.startsWith('delete')) {
                try {
                    console.log('invloking deletes')
                    await this.client.deleteMessage(chatId, msgId)

                } catch (error) {
                    console.log('error in callback delte::', error)
                }
            }

            if (callBackData.startsWith('plans')) {
                try {
                    await this.client.deleteMessage(chatId, msgId)
                    const data = callBackData.split('/')
                    // console.log(data);
                    await ctx.replyPhoto(this.planImage, {
                        caption: this.paymentCaption(data[2]),
                        replyMarkup: {
                            inlineKeyboard: Markup.paymentMethodReplyMarkup()
                        }
                    })

                } catch (error) {
                    console.log('error in plans:::', error)
                }


            }

            if (callBackData.startsWith('showPlans')) {
                await ctx.editMessageText(msgId, this.planDescription, {
                    replyMarkup: {
                        inlineKeyboard: Markup.planPriceReplyMarkup(this.paymentScreenshotId)
                    }
                })
            }
        }
        );


        this.client.on(':newChatMembers', async (ctx: any) => {
            try {

                const chatId = ctx.message.chat.id;

                const userName = ctx.message.from.firstName || ctx.message.from.userName;

                let channelName = (ctx?.message?.chat?.title) ? ctx.message.chat.title : 'Channel';

                const newMember = ctx.message.newChatMembers[0].username


                //  console.log(ctx, 'newwwwwwwwwww')
                if (newMember == this.botDetails.username) {
                    let channelName = (ctx?.message?.chat?.title) ? ctx.message.chat.title : 'Channel';


                    const d = await this.client.sendMessage(ctx.message.chat.id, this.groupAddCaption(channelName), {
                        replyMarkup: {
                            inlineKeyboard: Markup.newMemberReplyMarkup(this.publicChannelUname, this.paymentScreenshotId,)
                        },
                        parseMode: 'HTML',
                    })

                    console.log('added bot')

                    const chatDetails = await ctx.getChatAdministrators(ctx.message.chat.id);
                    const ownerdata = chatDetails.filter((d: any) => d.status == 'creator');
                    const ownerUserId = ownerdata[0].user.id;

                    // console.log(chatDetails, '////');
                    //console.log(ownerUserId)

                    await this.mongo.newGroup(String(ownerUserId), String(chatId))

                    await this.generateGroupPool()
                    await this.client.sendMessage(this.poweringGroupLog, `Bot ADDED to NEW Group !!\n\nUser: ${userName}\n\nGroupName: ${channelName}\n\nGroupId: ${chatId}`)

                    setTimeout(async () => {
                        await ctx.deleteMessage(d.id)
                    }, 10000)
                    return
                };

                const d = await ctx.reply(`<b>Hᴇʟʟᴏ ${userName} 😍, Aɴᴅ Wᴇʟᴄᴏᴍᴇ Tᴏ ${channelName} ❤️</b>\n\n<b>Just Send Any File Name ill SERCH Open Sourced Available files and <u>List YOU</u>.</b>`, {
                    parseMode: 'HTML',
                    replyMarkup: {
                        inlineKeyboard: Markup.groupJoinerReplyMarkup(this.paymentScreenshotId)
                    }
                })

                setTimeout(async () => {
                    await ctx.deleteMessage(d.id)
                }, 10000)
                return

            } catch (error) {
                console.log('error in listener: ', error)
            }
        });
    }


    private async indexRounds(params: indexInterface) {
        try {
            console.log('indexing invoked');

            const batchSize = 100;
            console.log('givenMssgId:', params.msgId);

            let currentTasks = params.msgId - batchSize;
            console.log('tillNeedTO: ', currentTasks)


            if (currentTasks < 0) {
                console.log('about to finsih:::', currentTasks)
                currentTasks = 0;
            }

            let fileArr = [];

            for (let i = params.msgId; i > currentTasks; i--) {
                fileArr.push(i)
            }

            const messages: any = await this.client.getMessages(params.channelId, fileArr);


            let finalSaved

            const lastBatchTime = await this.getCurrentISTTime();


            for (const message of messages) {
                if (
                    message.document &&
                    message.document.fileId
                    /* &&
                     (message.document.mimeType === 'video/x-matroska' || message.document.mimeType === 'video/mp4' || message.document.mimeType == 'video/x-msvideo')*/
                ) {

                    finalSaved = message.id
                    await this.mongo.addFile(message.document, params.datas, params.channelId, params.channelName)
                    //await db.addFile(message.document, buttonNum, Datas);
                } else if (
                    message.video &&
                    message.video.fileId
                    /*&&
                    (message.video.mimeType === 'video/x-matroska' || message.video.mimeType === 'video/mp4' || message.video.mimeType == 'video/x-msvideo')*/
                ) {
                    finalSaved = message.id


                    await this.mongo.addFile(message.video, params.datas, params.channelId, params.channelName)

                    //await db.addFile(message.video, buttonNum, Datas);
                } else {
                    try {
                        params.datas.skip++
                        console.log('Ignoring non-file messages...', message, 'ingoreeeeeeeeeeeeeeee');

                        console.log(message, 'meessafe')

                        await this.client.forwardMessage(params.channelId, this.supportLog, message.id);

                    } catch (error: any) {
                        if (error.errorMessage == 'MESSAGE_ID_INVALID') {
                            if (finalSaved) {
                                await this.client.forwardMessage(params.channelId, this.indexLog, finalSaved)
                            }

                            const modified = await params.ctx.editMessageText(params.msgToModify, `<b>Total Rounds: ${params.datas.round}\n\nSaved: ${params.datas.done}\n\nSkipped: ${params.datas.skip}\n\nLast Indexed Batch Time: ${lastBatchTime}\n<spoiler>If You Believe Your Current Time is Past Than this Atleast 5 Mins Send the Last File From the Index Log and /Index Again<spoiler></b>`, {
                                parseMode: 'HTML',
                            });

                            if (currentTasks > 0) {

                                setTimeout(async () => {

                                    await this.indexRounds({
                                        datas: {
                                            done: params.datas.done,
                                            skip: params.datas.skip,
                                            round: params.datas.round++
                                        },
                                        ctx: params.ctx,
                                        channelId: params.channelId,
                                        msgId: currentTasks,
                                        chatId: params.chatId,
                                        msgToModify: params.msgToModify,
                                        channelName: params.channelName,
                                    });

                                }, 59000); //

                            } else {
                                console.log(`Indexing Finished !!\n\nSaved: ${params.datas.done}\n\nDuplicated: ${params.datas.skip}\n\nTotal Rounds: ${params.datas.round}`);
                                return await params.ctx.editMessageText(params.msgToModify, `<b>Indexing Finished !!\n\nSaved: ${params.datas.done}\n\nDuplicated: ${params.datas.skip}\n\nTotal Rounds: ${params.datas.round}</b>`, {
                                    parseMode: 'HTML',
                                });
                            }



                        }
                    }

                }
            }


            console.log('going again for', params.datas.round++)

            console.log(finalSaved, 'finalsabeeed');

            if (finalSaved) {
                await this.client.forwardMessage(params.channelId, this.indexLog, finalSaved)
            }

            const modified = await params.ctx.editMessageText(params.msgToModify, `<b>Total Rounds: ${params.datas.round}\n\nSaved: ${params.datas.done}\n\nSkipped: ${params.datas.skip}\n\nBalance Msg Left: ${currentTasks}\n\nLast Indexed Batch Time: ${lastBatchTime}\n<spoiler>If You Believe Your Current Time is Past Than this Atleast 5 Mins Send the Last File From the Index Log and /Index Again<spoiler></b>`, {
                parseMode: 'HTML',
            });


            if (currentTasks > 0) {

                setTimeout(async () => {

                    await this.indexRounds({
                        datas: {
                            done: params.datas.done,
                            skip: params.datas.skip,
                            round: params.datas.round++
                        },
                        ctx: params.ctx,
                        channelId: params.channelId,
                        msgId: currentTasks,
                        chatId: params.chatId,
                        msgToModify: params.msgToModify,
                        channelName: params.channelName,
                    });

                }, 59000); //

            } else {
                console.log(`Indexing Finished !!\n\nSaved: ${params.datas.done}\n\nDuplicated: ${params.datas.skip}\n\nTotal Rounds: ${params.datas.round}`);
                return await params.ctx.editMessageText(params.msgToModify, `<b>Indexing Finished !!\n\nSaved: ${params.datas.done}\n\nDuplicated: ${params.datas.skip}\n\nTotal Rounds: ${params.datas.round}</b>`, {
                    parseMode: 'HTML',
                });
            }

        } catch (error: any) {

            console.log('errorr in indexRounds::::', error)


        }
    }

    private async shortenUrlText(apiUrl: string, apiToken: string, dest: string): Promise<[String] | []> {
        try {
            const url = `https://${apiUrl}/api?api=${apiToken}&url=${encodeURIComponent(dest)}`
            // const url = `${apiUrl}${apiToken}&url=${encodeURIComponent(dest)}`;
            const response = await axios.get(url);

            if (response.status !== 200) {
                console.error('Error:', `Status code: ${response.status}`);
                console.log(response.headers);
                console.log(response.statusText);
                return [];
            }

            const data = response.data;
            console.log(data)
            if (data.status !== 'success') {
                console.error('Error:', data.message); // Access error message from JSON response
                return [];
            }

            console.log('Shortened URL:', data.shortenedUrl);
            return [data.shortenedUrl];
        } catch (error: any) {
            console.error('Error:', error.message);
            return [];
        }
    }

    public async commands() {

        this.client.command('set_admin', async (ctx) => {
            try {

                const text = ctx.message.text
                const userID = ctx.message.from?.id;

                if (!this.admin.includes(String(userID))) {
                    return
                };

                if (text == '/set_admin') {
                    await ctx.reply('INVALID FORMAT \n\nSend in this Format: /set_admin aDMinPubLicUsErNaMe')
                }

                const split = text.split(' ');

                if (split.length == 2) {
                    await this.mongo.editBotModel(this.botToken, split[1], 'contactAdmin')
                    await this.startEngine()
                    return
                }

            } catch (error) {
                console.log('error in set fileLOG::', error)
            }
        })

        this.client.command('filelog', async (ctx: any) => {
            try {

                const userID = ctx.message.from?.id;

                if (!this.admin.includes(String(userID))) {
                    return
                };

                const isRepied = ctx.message.replyToMessage;

                if (!isRepied) {
                    await ctx.reply('forward A message from fileLog channel and Reply it with fileLog !');
                    return
                }
                const isChatId = isRepied.forwardFrom?.chat?.id || undefined

                if (!isChatId) {
                    await ctx.reply("no Chat id found on forward from")
                    return
                } else {
                    await this.mongo.editBotModel(this.botToken, String(isChatId), 'fileLog')
                    await this.startEngine()
                    let temp = await ctx.reply('Addded');
                    setTimeout(async () => {
                        await ctx.deleteMessage(temp.id)
                    }, 5000)
                    return
                }




            } catch (error) {
                console.log('error in set fileLOG::', error)
            }
        })

        this.client.command('qr', async (ctx: any) => {
            try {
                const userID = ctx.message.from?.id;

                if (!this.admin.includes(String(userID))) {
                    return
                };

                const isRepied = ctx.message.replyToMessage;

                if (!isRepied) {
                    await ctx.reply('Send AN Image and Reply it with QR !');
                    return
                }

                const fileId = isRepied.photo?.fileId || undefined

                if (!fileId) {
                    await ctx.reply('Cant find FILEID..');
                    // console.log(fileId, 'missing fileeee iDDDD');
                    return
                }

                const change = await this.mongo.editBotModel(this.botToken, fileId, 'qrFileId');

                if (!change) {
                    await ctx.reply(`Failed to set QR ID !}`);
                    if (this.qrImage) {
                        await ctx.replyPhoto(this.qrImage, {
                            caption: 'Your Current QR IMAGE..0'
                        })
                    }
                    return
                } else {
                    await ctx.reply(`QR ID SET!`);
                    await ctx.reply(`${this.qrImage}`)
                    await this.startEngine();
                    await ctx.replyPhoto(String(this.qrImage), {
                        caption: 'Your Current QR Image..'
                    })
                    return
                }


            } catch (error) {
                console.log('error in set QR::', error)
            }

        })

        this.client.command('upi', async (ctx: any) => {
            try {

                const text = ctx.msg.text || undefined

                // console.log(text)

                if (this.admin.includes(String(ctx.message.from?.id)) && text) {

                    if (text == '/upi') {
                        await ctx.reply('Send in This format /upi/yourUPIid@som');
                        return
                    }

                    const data = text.split(' ');


                    const changeBotModel = await this.mongo.editBotModel(this.botToken, data[1], 'upiId')

                    if (changeBotModel) {
                        this.upiId = data[1];
                        await ctx.reply(`UPI ID SET!: ${this.upiId}`)
                        await this.startEngine();
                        return
                    } else {
                        await ctx.reply(`Failed to set UPI ID !: ${this.upiId}`)
                    }

                }
            } catch (error) {
                console.log('error in upi:::', error)
            }
        })

        this.client.command('commands', async (ctx) => {
            try {

                const chatType = ctx.message.chat.type
                const commandListAdmin = `<b><u>COMMAND LIST (ADMIN only) !!</u>\n\n\n<u>QR image:</u>\n  '/set_qr' Usage:(send an Image and Reply with /set_qr)\n\n<u>Premium Benefit Video:</u>\n  '/set_benefitvideo' Usage:(send an Video and Reply with /set_benefitvideo)\n\n<u>BroadCast:</u>\n  '/bcast' Usage:(send an Text and Reply with /bcast {Coming SOoon..})\n\n<u>ForceSUB:</u>\n  '/forceSub' Usage:(send an Message from any Channel with Bot Admin and Reply with /forceSub)\n\n<u>Default Tutorial Video:</u>\n  '/tutorial' Usage:(send an Video and Reply with /tutorial)\n\n<u>Ban / UBan User:</u>\n  '/ban/NuMeRiCuSeRiD' '/uban/NuMeRiCuSeRiD'' Usage:(/ban/1585451545)\n\n<u>Index Files:</u>\n  '/index' Usage:(Forward a File from The Channel and Reply with /index)\n\n<u>Premium An USER:</u>\n  '/prime' Usage:(/prime/NuMeRiCuSERiD)\n\n</b>`;
                const commandListUserGroup = `<b>COMMAND LIST !!\n\n<u>1) Set Shortner:</u>\n\n"<i>Create a Group and Add me Admin. and then use this Command in the Group (Owner ONlY Command)"</i>\n\n<u>Command:</u> /set_shortner/yourShortner.com/yOuRsHoRtNeRTokeNHer651255241520\n\n<u>2) Set Tutorial:</u>\n\n"<i>Create a Group and Add me Admin. and send a Video for the Group Tutorial Video then use this Command by Replying to the Video in the Group<u>(Owner ONlY Command)</u>"</i>\n\n<u>Command:</u> /set_tutorial\n\n<u>3) Plan:</u>\n\n"<i>come @${this.botUname} use this Command to <u>Check Available Plans</u>"</i>\n\n<u>Command:</u> /plan\n\n<u>4) My Plan:</u>\n\n"<i>come @${this.botUname} use this Command to <u>Check Your Current Plan</u></i>\n\n<u>Command:</u> /myPlan`;

                if (this.admin.includes(String(ctx.message.from?.id))) {
                    await ctx.reply(commandListAdmin, {
                        parseMode: 'HTML'
                    });

                    return
                }
                else if (chatType == 'group' || chatType == 'supergroup' || chatType == 'private') {
                    await ctx.reply(commandListUserGroup, {
                        parseMode: "HTML",
                    })

                    return
                }
            } catch (error) {
                console.log(error)
            }
        })
        this.client.command('set_qr', async (ctx: any) => {
            try {

                const userId = String(ctx.message.from?.id)
                const chatType = String(ctx.message.chat.type);
                const isReplied = ctx.message.replyToMessage?.photo || undefined

                if (this.admin.includes(String(userId)) && isReplied) {

                    this.qrImage = isReplied.fileId
                    await ctx.replyPhoto(this.qrImage, {
                        caption: 'Your Current QRImage',
                    });

                    return
                }

            } catch (error) {
                console.log('error in QR....', error)
            }
        })
        this.client.command('set_benefitvideo', async (ctx: any) => {
            try {

                const userId = String(ctx.message.from?.id)
                const chatType = String(ctx.message.chat.type);
                const isReplied = ctx.message.replyToMessage?.video || undefined

                if (this.admin.includes(String(userId)) && isReplied) {
                    this.premiumBenefitsVideo = isReplied.fileId
                    await ctx.replyVideo(this.premiumBenefitsVideo, {
                        caption: 'Your Current Video',
                    });
                }

            } catch (error) {
                console.log('error in benefit Video..', error)
            }
        })

        this.client.command('admin', async (ctx) => {
            try {

                const modify = await ctx.reply('<i>Fetching Details</i>')
                const data = await this.mongo.adminReport(this.isAdsOn)
                const chatId = String(ctx.message.chat?.id)

                if (data) {
                    if (this.isAdsOn) {
                        const msg = await ctx.editMessageText(modify.id, data, {
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: [
                                    [{ text: 'Switch ADS', callbackData: `ADS/${modify.id}/${chatId} ` }]
                                ]
                            }
                        })

                        // console.log(msg.id, 'og')
                        return
                    } else {
                        const msg = await ctx.editMessageText(modify.id, data, {
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: [
                                    [{
                                        text: 'Switch ADS', callbackData: `ADS / ${modify.id}/${chatId}`
                                    }]
                                ]
                            }
                        })
                        // console.log(msg.id, 'og')

                    }

                }
            } catch (error) {
                console.log('error in Admin::;', error)
            }
        })



        this.client.command('bcast', async (ctx: any) => {
            try {
                const userId = String(ctx.message.from?.id)
                const chatType = String(ctx.message.chat.type);
                const isReplied = ctx.message.replyToMessage || undefined

                if (this.admin.includes(userId)) {
                    if (chatType !== 'private') {
                        return await ctx.reply('Only used in PrivateChat')
                    }

                    if (!isReplied) {
                        return await ctx.reply('Reply to Any Message with /bcast\n\nTO BROADCAST the MESSAGE to ALL USERS!')
                    }

                    await ctx.reply('wait bro next update!!...')

                    return

                    /*
                    console.log(isReplied);
         
                    const caption = isReplied.caption ?? undefined;
         
                    const text = isReplied.text ?? undefined
         
                    if (text) {
                        const total = await userModel.find({});
         
                        const users = total.map((m) => m.userId);
         
                        console.log(users)
         
                        const totalUsers = users.length
         
                        if (totalUsers > 100) {
         
                        }
         
         
                    }
        */



                }




            } catch (error) {

                console.log('error in BCAST:::: ', error)
            }
        })

        this.client.command('forceSub', async (ctx) => {
            try {
                const userId = ctx.message.from?.id
                const chatId = String(ctx.message.chat.id)
                const isReplied = ctx.message.replyToMessage || undefined

                if (this.admin.includes(String(userId)) && isReplied && isReplied.forwardFrom?.type == 'channel') {
                    const forceSubId = isReplied.forwardFrom.chat.id

                    this.forceSubChatId = String(forceSubId);

                    const createInviteLink = await this.client.createInviteLink(forceSubId)

                    console.log(createInviteLink);

                    this.forceSubUrl = createInviteLink.inviteLink
                    if (isReplied.forwardFrom.chat.id) {
                        await this.mongo.editBotModel(this.botToken, this.forceSubUrl, 'forceSubUrl')
                        await this.mongo.editBotModel(this.botToken, String(isReplied.forwardFrom.chat.id), 'forceSubChatId')


                        await ctx.reply('DONE')

                        await this.startEngine()
                        return
                    } else {
                        await ctx.reply('no chat id found');
                        return
                    }


                }

                return

            } catch (error: any) {
                if (error.errorMessage === 'CHANNEL_PRIVATE') {
                    return ctx.reply('Add Bot as Admin With All Rights !\n\nAnd Try Again')
                }
                console.log('error in forceSub:::', error)
            }
        })

        this.client.command('tutorial', async (ctx: any) => {
            try {
                const userId = ctx.message.from?.id
                const chatId = String(ctx.message.chat.id)
                const chatType = ctx.message.chat.type;



                if (this.admin.includes(String(userId))) {

                    const isRepliedVideo = ctx.message.replyToMessage?.video || undefined

                    if (!isRepliedVideo) {
                        await ctx.reply('Send to Video File and reply it with \n\n/tutorial \n\nto set Universal tutorial');
                        return
                    }


                    this.tutorialUrl = isRepliedVideo.fileId

                    if (!this.tutorialUrl) {
                        await ctx.reply('cant find fileid')

                        return
                    }

                    await ctx.replyVideo(this.tutorialUrl);

                    const edited = await this.mongo.editBotModel(this.botToken, this.tutorialUrl, 'tutorialVideo');

                    if (!edited) {
                        await ctx.reply("error in saving gile in botmodel");
                        return
                    } else {

                        await this.startEngine()
                        const temp = await ctx.reply('<b>Saved Sucess in MODEL</b>', {
                            parseMode: "HTML"
                        })

                        setTimeout(async () => {
                            await ctx.deleteMessage(temp.id)
                        }, 5000);

                        return
                    }


                }

                if (chatType == 'private') {
                    //console.log(this.tutorialUrl, 'tutooo')
                    await ctx.replyVideo(this.tutorialUrl);
                } else if (chatType == 'supergroup' || 'group') {
                    const groupDetails = await this.paramsGroupPool(chatId, 'userTutorial')

                    if (!groupDetails) {
                        if (!this.tutorialUrl) {
                            await ctx.reply('No Tutorial Video From Admin')
                            return
                        } else {
                            await ctx.replyVideo(this.tutorialUrl, {
                                caption: '<b>This Group Doenst Have an Tutorial Video..\n\nSo Sent u an Default Tutorial Video From Bot Owner Side!</b>',
                                parseMode: 'HTML',
                            })

                            return
                        }
                    }


                    await ctx.replyVideo(groupDetails, {
                        caption: '<b>Tutorial Video of this GROUP <3</b>',
                        parseMode: 'HTML'
                    });

                    return
                }

                return

            } catch (error) {
                console.log('error in tutorial;;;;', error)
            }

        })

        this.client.command('set_shortner', async (ctx) => {
            try {
                const senderId = ctx.message.from?.id
                const chatId = ctx.message.chat.id
                const msgFrom = ctx.message.chat.type
                const msgId = ctx.message.id
                const text = ctx.message.text


                if (msgFrom == 'private') {
                    const del = await ctx.reply('ADD Me to Your Group and Use the Command there');

                    setTimeout(async () => {
                        await ctx.deleteMessage(del.id)
                    })

                    return
                }

                if (text == '/set_shortner') {
                    const del = await ctx.reply(`<b>Command Incomplete :(\n\nGive me a shortener website link and api along with the command !\n\nFormat:</b> /set_shortner/website.com/1f1da5c9df9a58058672ac8d8134e203b03426a1`, {
                        parseMode: 'HTML',
                    });

                    setTimeout(async () => {
                        await ctx.deleteMessage(del.id)
                    }, 10000)

                    return

                }

                if ((msgFrom == 'group' || 'supergroup')) {
                    const groupDetails = await ctx.getChatAdministrators()
                    console.log(groupDetails)
                    const ownerId = groupDetails.filter((m: any) => m.status == 'creator')
                    const ownerUserId = ownerId[0].user.id

                    //console.log(ownerUserId, '/', senderId)

                    if (ownerUserId !== senderId) {
                        const del = await ctx.reply("unAuth only group owner can set!");

                        setTimeout(async () => {
                            await ctx.deleteMessage(del.id)
                        }, 5000)

                        return
                    }

                    const data = text.split('/')

                    const isValidUrl = await this.shortenUrlText(data[2], data[3], 'www.instagram.com');


                    if (isValidUrl.length < 1) {

                        await ctx.deleteMessage(msgId)
                        await ctx.reply('<b>Invalid Url or TOKEN / CONTACT ADMIN !!</b>', {
                            replyMarkup: {
                                inlineKeyboard: Markup.contactAdminReplyMarkup(this.contactAdmin),
                            },
                            parseMode: 'HTML',
                            protectContent: true,
                        })

                        return
                    }

                    await this.mongo.setShortner(String(ownerUserId), String(chatId), String(data[2]), String(data[3]));
                    await this.generateGroupPool()
                    await ctx.reply("<b>Congrats Your API has been ADDED!\n\nFrom now On this Group will generate Links from Your Account and Keep in Mind that a 5% ADS will be From our Side as a Part of <u>Hosting FEE of Bot</u> and As a Contribution to Open Source Application\n\n</u>Happy EARNING 💵 </u></b>\n\nuse /commands to check ur Commands (in Group)", {
                        parseMode: 'HTML',
                    })
                    await ctx.deleteMessage(msgId);

                    return





                }

                return


            } catch (error) {
                console.log('error in setShortner:::', error)
            }
        })
        this.client.command('set_tutorial', async (ctx: any) => {
            try {
                const senderId = ctx.message.from.id
                const chatId = ctx.message.chat.id
                const msgFrom = ctx.message.chat.type
                const isRepied = ctx.message.replyToMessage || undefined;
                const fileAvailable = ctx.message.replyToMessage?.video?.fileId || undefined
                //  console.log(ctx.message.replyToMessage, 'filleee')


                if (msgFrom == 'private') {
                    await ctx.reply('ADD Me to Your Group and Use the Command there \n\nBy Replying to Any Video');
                    return
                }

                if ((msgFrom == 'supergroup' || 'group') && fileAvailable) {

                    const groupDetails = await ctx.getChatAdministrators(ctx.message.chat.id);
                    const ownerId = groupDetails.filter((m: any) => m.status == 'creator');
                    const ownerUserId = String(ownerId[0].user.id);



                    if (parseInt(ownerUserId) !== parseInt(senderId)) {

                        let del = await ctx.reply('UnAuth. Command only for Owner of the Group!');

                        setTimeout(async () => {
                            await ctx.deleteMessage(del.id);
                        }, 5000);

                        return;
                    };

                    //console.log(fileAvailable, 'filllllll')
                    await this.mongo.setTutorial(String(ownerUserId), String(chatId), fileAvailable)

                    await this.generateGroupPool();
                    let del = await ctx.reply('Tutorial has Been Set!..\n\nUse /tutorial')

                    setTimeout(async () => {
                        await ctx.deleteMessage(del.id)
                    }, 50000)

                    return

                }

            } catch (error) {
                console.log('errror in setTutorial:::', error)
            }
        })

        this.client.command('myPlan', async (ctx) => {
            try {
                const isPremiumExpired = await this.mongo.isVerified(String(ctx.message.from?.id))

                if (!isPremiumExpired) {
                    await ctx.reply(`Hey ${ctx.message.from?.firstName || 'user'},\n\nʏᴏᴜ ᴅᴏ ɴᴏᴛ ʜᴀᴠᴇ ᴀɴʏ ᴀᴄᴛɪᴠᴇ ᴘʀᴇᴍɪᴜᴍ ᴘʟᴀɴs, ɪꜰ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴛᴀᴋᴇ ᴘʀᴇᴍɪᴜᴍ ᴛʜᴇɴ ᴄʟɪᴄᴋ ᴏɴ ʙᴇʟᴏᴡ ʙᴜᴛᴛᴏɴ 👇`, {
                        replyMarkup: {
                            inlineKeyboard: Markup.myPlanReplyMarkup()
                        }
                    });
                    return
                }

                const data: any = await userModel.findOne({ userId: String(ctx.message.from?.id) })

                console.log(data)


                const del = await ctx.reply(`You Have an Active PLAN..\n\nExpiring On: ${data.verifiedTill}`)

                setTimeout(async () => {
                    await ctx.deleteMessage(del.id)
                }, 10000)



                return

            } catch (error) {
                console.log('error in myPlan::::', error)
            }
        })
        this.client.command('ban', async (ctx) => {
            try {
                console.log('triggering ban')
                const text = ctx.message.text;

                if (this.admin.includes(String(ctx.message.from?.id))) {
                    if (text == '/ban') {
                        const d = await ctx.reply('send in this format\n\n/ban/uSeRiD');

                        setTimeout(async () => {
                            await ctx.deleteMessage(d.id)
                        }, 10000)
                        return
                    }
                    const data = text.replace('/ban/', '');

                    await this.mongo.changeValid(data, false);

                    await ctx.reply(`!! Banned USER !!\n\nUserID: ${data}\n\nStaus: BANNED.`)
                } else {
                    const k = await ctx.reply('unAuth')

                    setTimeout(async () => {
                        await ctx.deleteMessage(k.id)
                    })
                }
            } catch (error) {
                console.log('error in ban::::::', error);
            }
        })

        this.client.command('uban', async (ctx) => {
            try {
                const text = ctx.message.text;

                if (this.admin.includes(String(ctx.message.from?.id))) {


                    if (text == '/unban') {
                        const d = await ctx.reply('send in this format\n\n/uban/uSeRiD');

                        setTimeout(async () => {
                            await ctx.deleteMessage(d.id)
                        }, 10000)
                        return
                    }
                    const data = text.replace('/uban/', '')
                    await this.mongo.changeValid(data, true)

                    await ctx.reply(`!! UnBanned USER !!\n\nUserID: ${data}\n\nStaus: UNBANNED.`)
                }
                else {
                    const k = await ctx.reply('unAuth')

                    setTimeout(async () => {
                        await ctx.deleteMessage(k.id)
                    })
                }

            } catch (error) {
                console.log('error in ban::::::', error)
            }
        })




        this.client.command('send', async (ctx: any) => {
            try {
                const data = ctx.message.text;
                const val = data.split(' ');
                await this.client.sendVideo(ctx.message.from.id, val[1]);
            } catch (error) {
                console.log('in bug send::', error)
            }
        })


        this.client.command('prime', async (ctx) => {
            try {
                const userId = String(ctx.message.from?.id)

                const vals = ctx.message.text

                if (this.admin.includes(userId)) {

                    if (vals == '/prime') {
                        const del = await ctx.reply('Invalid FORMAT !! \n\nUse this Format\n\n/prime/uSeRiDoFtHeUsEr');

                        setTimeout(async () => {
                            await ctx.deleteMessage(del.id);
                        }, 5000)

                        return
                    }
                    const data = vals.split('/')

                    //console.log(data)

                    await this.mongo.Unlock(userId, Number(data[2]));

                    await ctx.reply('ADDED PREMIUM');
                }

                const del = await ctx.reply('unAuth')

                setTimeout(async () => {
                    await ctx.deleteMessage(del.id)
                })

                return



            } catch (error) {
                console.log('error in making PRIME:::', error)
            }
        })
        this.client.command('start', async (ctx, next) => {

            try {
                const userId = String(ctx.message.from?.id)
                const chatId = String(ctx.message.chat.id)
                const isExist = await this.mongo.isExist(userId);
                const vals = ctx.message.text;
                //console.log(ctx.message.text)


                if (vals.startsWith(`/start@${this.botUname}`)) {
                    console.log("Added to Group");
                    next()
                }

                if (vals.startsWith('/start hash_')) {
                    let data = vals.split('_');

                    const hash = data[1];

                    const pool = this.poolExist(hash);

                    if (!pool) {
                        await ctx.reply("DONT TRY TO SMART AND BYPASS !");

                        return
                    }

                    await this.mongo.Unlock(userId);

                    const del = await ctx.reply('<b>You are Unlocked Till Today ENJOY</b>', {
                        parseMode: 'HTML',
                    })

                    let del1: undefined | any

                    try {
                        del1 = await ctx.replyDocument(pool.fileId, {
                            caption: '💬   🗨️   ➤   💬\n\nThis File WIll be Deleted in 1 Min to keep it permanent forward the file to Other Chat'
                        })
                    } catch (error: any) {
                        if (error.message.startsWith('Unreachable')) {
                            del1 = await ctx.replyVideo(pool.fileId, {
                                caption: '💬   🗨️   ➤   💬\n\nThis File WIll be Deleted in 1 Min to keep it permanent forward the file to Other Chat'
                            });

                            return
                        }

                    } finally {

                        await this.fileLogs(this.client, {
                            userId,
                            userName: ctx.message.from?.firstName || 'USER',
                            fileName: pool.fileName,
                        })
                        setTimeout(async () => {
                            await ctx.deleteMessage(del.id)
                        }, 4000)

                        if (!del1) {
                            return
                        } else {
                            setTimeout(async () => {
                                await ctx.deleteMessage(del1.id)
                            }, 59000)

                            return
                        }

                    }



                }


                if (vals.startsWith('/start file_')) {

                    console.log('comes here')

                    const match = vals.match(/^\/start file_(.*)_(.*)$/);

                    if (match) {
                        console.log('matcbed')
                        const fileId = match[1]; // Contains the file ID part
                        const chatId = match[2]; // Contains the chat ID part
                        console.log('File ID:', fileId);
                        console.log('Chat ID:', chatId);

                        const uniqueId = fileId
                        let fileData: any = await this.mongo.sendFile(uniqueId);
                        const fileType = fileData.fileMimeType

                        console.log(fileData, 'fillleleleleelel')

                        const user = await this.mongo.isExist(userId)

                        const isVerified = await this.mongo.isVerified(userId)

                        if (!user.valid) {
                            await ctx.reply('YOU ARE BANNED BY OUR TEAM !!\n\nContact: Admin', {
                                replyMarkup: {
                                    inlineKeyboard: Markup.bannedReplyMarkup(this.paymentScreenshotId)
                                }
                            })

                            return
                        }

                        const hash = crypto.randomUUID()

                        const endPoint = `https://t.me/${this.botUname}?start=hash_${hash}`

                        const isPower = await this.paramsGroupPool(String(chatId), 'userPowering', true)


                        console.log(isPower, 'issssssssssssspower')
                        let shortenedUrl;
                        let tutorialUrl: undefined | string
                        if (!isPower) {
                            shortenedUrl = await this.shortenUrlText(this.apiUrl, this.apiToken, endPoint)

                            tutorialUrl = this.tutorialUrl


                            console.log('not power')
                        } else {
                            const underTax = this.percentagePartition()

                            if (!underTax) {

                                tutorialUrl = (isPower.tutorial) ? isPower.tutorial : this.tutorialUrl

                                shortenedUrl = await this.shortenUrlText(isPower.userApi, isPower.userApiToken, endPoint);

                            } else {

                                tutorialUrl = this.tutorialUrl

                                shortenedUrl = await this.shortenUrlText(this.apiUrl, this.apiToken, endPoint)

                            }

                        }




                        console.log(shortenedUrl, 'shoertttt')

                        console.log(user.verified, '/', isVerified, '/', tutorialUrl)

                        if (!user.verified && fileData && shortenedUrl.length > 0 && !isVerified && this.isAdsOn) {
                            const shortUrl = String(shortenedUrl[0])
                            if (tutorialUrl) {

                                let pool = this.addPool(String(ctx.message.from?.id), hash, endPoint, shortUrl, fileData.fileId, tutorialUrl, fileData.fileName);

                                console.log(pool, 'pool')


                                await ctx.reply(`🫂 ʜᴇʏ.. ${ctx.message.from?.firstName || 'user'}\n\n✅ ʏᴏᴜʀ ʟɪɴᴋ ɪꜱ ʀᴇᴀᴅʏ, ᴋɪɴᴅʟʏ ᴄʟɪᴄᴋ ᴏɴ ᴅᴏᴡɴʟᴏᴀᴅ ʙᴜᴛᴛᴏɴ.\n\n⚠️ ꜰɪʟᴇ ɴᴀᴍᴇ : ${fileData.fileName}\n\n📥 ꜰɪʟᴇ ꜱɪᴢᴇ : ${fileData.fileSize}`, {
                                    replyMarkup: {
                                        inlineKeyboard: [
                                            [{ text: 'Unlock Now & Download!', url: pool.shortUrl }],
                                            //    [{ text: 'Bypassed URL', url: pool.url }],
                                            [{ text: 'Tutorial Video!', callbackData: `tutorial_${chatId}` }],
                                            [{ text: `Buy Subscription | Remove AD's`, callbackData: 'planIntro' }]

                                        ]
                                    }
                                })

                                return
                            } else {
                                let pool = this.addPool(String(ctx.message.from?.id), hash, endPoint, shortUrl, fileData.fileId, tutorialUrl, fileData.fileName);

                                await ctx.reply(`🫂 ʜᴇʏ.. ${ctx.message.from?.firstName || 'user'}\n\n✅ ʏᴏᴜʀ ʟɪɴᴋ ɪꜱ ʀᴇᴀᴅʏ, ᴋɪɴᴅʟʏ ᴄʟɪᴄᴋ ᴏɴ ᴅᴏᴡɴʟᴏᴀᴅ ʙᴜᴛᴛᴏɴ.\n\n⚠️ ꜰɪʟᴇ ɴᴀᴍᴇ : ${fileData.fileName}\n\n📥 ꜰɪʟᴇ ꜱɪᴢᴇ : ${fileData.fileSize}`, {
                                    replyMarkup: {
                                        inlineKeyboard: [
                                            [{ text: 'Unlock Now & Download!', url: pool.shortUrl }],
                                            //    [{ text: 'Bypassed URL', url: pool.url }],
                                            ///[{ text: 'Tutorial Video!', callbackData: `tutorial_${chatId}` }],
                                            [{ text: `Buy Subscription | Remove AD's`, callbackData: 'planIntro' }]

                                        ]
                                    }
                                })

                                return
                            }




                            return
                        }
                        else if ((!this.isAdsOn || user.verified) && fileData && shortenedUrl.length > 0) {

                            let data = vals.split('_');

                            const hash = data[1];
                            let pool = this.poolExist(hash)

                            if (!pool) {
                                await ctx.reply('<b>BYPASS_DETECTED !!\n\nDont TRY to Bypass ME\n\nIf you beleive you are not bypassing and facing an error\n\nMSG: @MachiXadminBot');
                                return
                            }
                            const caption = Markup.FileCaption(fileData)
                            //   console.log(fileData);
                            // console.log('fileID:', fileData.fileId, '\n\nFileType: ', fileData.fileMimeType)

                            let del: undefined | any

                            try {
                                del = await ctx.replyVideo(fileData.fileId, {
                                    caption,
                                    parseMode: 'HTML',
                                });

                                setTimeout(async () => {
                                    await ctx.deleteMessage(del.id)
                                }, 59000);

                                return
                            } catch (error: any) {
                                console.log('error when sendinf as video')
                                if (error.message.startsWith('Unreachable')) {
                                    const sendDoc = await ctx.replyDocument(fileData.fileId, {
                                        caption,
                                        parseMode: 'HTML',
                                    });
                                }
                            } finally {
                                await this.fileLogs(this.client, {
                                    userId,
                                    userName: ctx.message.from?.firstName || 'USER',
                                    fileName: pool.fileName,
                                })
                            }

                            if (!del) {
                                return
                            } else {
                                setTimeout(async () => {
                                    await ctx.deleteMessage(del.id)
                                }, 59000); del

                                return
                            }

                        }



                    } else {
                        console.log('un behabioured user....')
                    }

                }

                if (vals == '/start') {
                    const name = ctx.message.from?.firstName || 'User'
                    console.log('comes under start')
                    await ctx.reply(this.startCaption(name), {
                        parseMode: 'HTML',
                        replyMarkup: {
                            inlineKeyboard: Markup.introReplyMarkup(String(this.botUname), this.publicChannelUname)
                        }
                    })
                }
            } catch (error: any) {
                console.log(error)

            }
        })



        this.client.command('plan', async (ctx) => {

            await ctx.replyPhoto(this.planImage, {
                caption: this.planDescription,
                replyMarkup: {
                    inlineKeyboard: Markup.planStartReplyMarkup()
                }
            })

        })
    }


    public async fileSaver() {



        this.client.on('message', async (ctx: any, next) => {

            try {
                const chatType = ctx.message.chat.type;
                console.log(chatType)

                console.log('getting');
                console.log(this.fileLog, '/', ctx.message.chat.id)
                if (this.fileLog.includes(String(ctx.message.chat.id))) {
                    console.log('from filelog')
                    if (
                        ctx.message && (
                            (ctx.message.document
                                &&
                                (ctx.message.document.mimeType === 'video/x-matroska' || ctx.message.document.mimeType === 'video/mp4')) ||
                            (ctx.message.video &&
                                (ctx.message.video.mimeType === 'video/x-matroska' || ctx.message.video.mimeType === 'video/mp4'))

                        )
                    ) {
                        const data = ctx.message.document || ctx.message.video

                        console.log(data, 'dataaaaa');

                        console.log(ctx)

                        await this.mongo.addFile(data, undefined, ctx.message.chat.id, ctx.message.chat.title);

                        return
                    }
                }

                else if (ctx.message.chat.type == 'private' && ctx.message.chat.isBot) {
                    console.log('spamming private');
                    await ctx.reply(this.startCaption(ctx.message.from.firstName || 'USER'), {
                        parseMode: "HTML",
                        replyMarkup: {
                            inlineKeyboard: Markup.introReplyMarkup(String(this.botUname), this.publicChannelUname)
                        }
                    })
                    return
                }

                else {
                    console.log('some Query initiating next')
                    next()
                }




            } catch (error) {
                console.log('error in fileSave...', error)
            }

        })



    }

    public async groupManager() {

        this.client.on('message:text', async (ctx) => {

            try {
                console.log('msg comes under groupManager')
                const firstName = ctx.message.from?.firstName || 'user'
                const msgId = ctx.message.id;
                const userId = ctx.message.from?.id
                const chatId = ctx.message.chat.id
                const typeMedium = ctx.message.chat.type;
                const text = ctx.message.text
                if ((typeMedium == 'group' || typeMedium == 'supergroup') && !text.startsWith('/')) {

                    const query = {
                        query: text,
                        addOn: ''
                    }
                    await this.queryManager(ctx, Number(userId), query, chatId, firstName, ctx.message.chat.title)

                    return
                } else if (typeMedium == 'private') {

                    await ctx.reply(this.startCaption(ctx.message.from?.firstName || 'USER'), {
                        parseMode: 'HTML',
                        replyMarkup: {
                            inlineKeyboard: Markup.introReplyMarkup(String(this.botUname), this.publicChannelUname)
                        }
                    })
                    return

                }

            } catch (error) {
                console.log(error)
            }


        })

    }

    private async queryManager(ctx: any, userId: number, Query: { query: string, addOn: String }, chatId: number, firstName: string, chatTitle: string) {
        try {

            let query = `${Query.query} ${Query.addOn}`
            let exist

            const isExistInDb = await this.mongo.isExist(String(userId))
            if (this.forceSubChatId) {
                exist = await this.isForceSub(this.forceSubChatId, userId);

            }

            let editedMsg: any | undefined

            console.log(exist, '/', this.forceSubUrl, 'existtttttttttttttt');

            if (!exist && this.forceSubUrl) {
                editedMsg = await ctx.reply('<b>Hey Hey Heyyy..\n\nYou Need to JOIN my Channel to USE ME!😜\n\n Join My Channel to Use ME! and Type Again .</b>', {
                    parseMode: 'HTML',
                    replyMarkup: {
                        inlineKeyboard: Markup.forceSubReplyMarkup(this.forceSubUrl),
                    }

                })


                return setTimeout(async () => {
                    await ctx.deleteMessage(editedMsg.id);
                }, 59000)
            }

            editedMsg = await ctx.reply(`<b>Searching for "${query}"... </b>`, {
                parseMode: 'HTML',
                protectContent: 'true',
            })

            const file = await this.mongo.isFileExist(query);


            if (file.length > 0) {

                const fileAsReplyMarkup = this.savingReplyMarkup(Query.query, file, 8, String(chatId), editedMsg.id, userId);

                editedMsg = await ctx.editMessageText(editedMsg.id, `𝙏𝙝𝙚 𝙍𝙚𝙨𝙪𝙡𝙩 𝙛𝙤𝙧: ${query}\n\nTotal: ${fileAsReplyMarkup.length}\n\n𝙍𝙚𝙦𝙪𝙚𝙨𝙩 𝘽𝙮: ${firstName}\n\n𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝘽𝙮: ${chatTitle}\n\n<b>!! This Message will be Deleted in 1 Min !!</b>`, {
                    parseMode: "HTML",
                    replyMarkup: {
                        inlineKeyboard: fileAsReplyMarkup[0],
                    }
                })


            }
            else if (file.length == 0) {
                editedMsg = await ctx.editMessageText(editedMsg.id, `𝙎𝙤𝙧𝙧𝙮 𝙉𝙤 𝙁𝙞𝙡𝙚𝙨 𝙒𝙚𝙧𝙚 𝙁𝙤𝙪𝙣𝙙 : ${query}\n\n𝘾𝙝𝙚𝙘𝙠 𝙔𝙤𝙪𝙧 𝙎𝙥𝙚𝙡𝙡𝙞𝙣𝙜 𝙞𝙣 𝙂𝙤𝙤𝙜𝙡𝙚 𝙖𝙣𝙙 𝙏𝙧𝙮 𝘼𝙜𝙖𝙞𝙣 !!`, {
                    replyMarkup: {
                        inlineKeyboard: [
                            [{ text: '🔎 𝗤𝘂𝗶𝗰𝗸 𝗚𝗼𝗼𝗴𝗹𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 🔍', url: `https://www.google.com/search?q=${encodeURIComponent(query)}` }]
                        ]
                    }
                });
            }

            setTimeout(async () => {
                await ctx.deleteMessage(editedMsg.id);
                this.deleteResponse(String(chatId), userId, editedMsg.id)
            }, 59000 + 59000);


        } catch (error) {
            console.log('errorr in query manager:::::::::::::', error)
        }



    }


    private async isForceSub(chatId: string | number, userId: string | number) {
        try {
            if (!chatId) {
                return
            }
            return await this.client.getChatMember(chatId, userId)
        } catch (error: any) {
            if (error.message === '400: CHANNEL_INVALID (channels.getChannels)') {
                throw new Error("ADd button to Force SUb channel... reason: channel private")

            }
            console.log('errror on isForceSub:::', error.message)
        }
    }

    // private userplanCaption(name: string,)

    private startCaption(name: string) {
        return `👋 Hey ${name} , <b>GOOD DAY</b>  ⚡️\n\n🤗 Welcome to  Open Source Advance Filter bot.\n\n🤖 I Can Send you Direct Files by searching OpenLy Available Datas. \n\n📁 Add Me to a Group First and Send Me Any File Name on the <b><u>GROUP</u></b>`
    }
    private paymentCaption(ammount: number | string) {
        return `Wow!!🤯\nYou Have Choosen Weekly Bot Membership Of Price ₹${ammount}\nChoose Payment Method 👇`
    }
    private groupAddCaption(name: string) {
        return `<b>Thankyou For Adding Me In ${name} ❣️\n\nCheck My Commands using /Commands\n\nIf you have any questions & doubts about using me contact support.</b>`
    }



    private async captureCtx(ctx: any, name: string) {
        try {
            const ctxJson = JSON.stringify(ctx, (key, value) => {
                // Handle circular references and functions if needed
                if (typeof value === 'function') return undefined;
                return value;
            }, 2); // Pretty-print with 2 spaces

            // Write the JSON string to a file
            fs.writeFileSync(`${name}.json`, ctxJson, 'utf8'); // Corrected quote here
            console.log('Context saved to', `${name}.json`);
        } catch (error) {
            console.log('Error in captureCtx', error);
        }
    }

}