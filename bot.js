"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Bot = void 0;
const node_1 = require("@mtkruto/node");
const data_1 = require("./data");
const fs = __importStar(require("fs"));
const date_fns_1 = require("date-fns");
const date_fns_tz_1 = require("date-fns-tz");
const localStore_1 = require("./localStore");
const axios_1 = __importDefault(require("axios"));
const model_1 = require("./model");
const markup_1 = require("./markup");
class Bot extends localStore_1.localStore {
    constructor(data) {
        super();
        this.botUrl = 'https://t.me/';
        this.percentageAds = 10;
        this.publicChannelUname = 'SingleMachiOffll';
        this.publicChannelUserName = `@${this.publicChannelUname}`;
        this.contactAdmin = `${this.botUrl}MachiXsupportBot`;
        this.upiId = 'sooon';
        this.paymentScreenshotId = `${this.botUrl}MachiXsupportBot`;
        this.admin = ['1767901454', '7822087230'];
        this.indexLog = '-1002473253639'; // - 1002279938392';
        this.poweringGroupLog = '-1002269051306'; //channel id of groupChat !
        this.fileLog = ['-1002094214421'];
        this.isAdsOn = true;
        this.botUserName = '@';
        this.botUname = undefined;
        this.tutorialUrl = undefined;
        this.forceSubUrl = undefined;
        this.forceSubChatId = undefined;
        this.premiumBenefitsVideo = undefined;
        this.qrImage = undefined;
        this.upiImage = 'https://ibb.co/xm65Ghx';
        this.planImage = 'https://ibb.co/3RynpHB';
        this.apiUrl = 'publicearn.com';
        this.apiToken = 'a80541b1e03491a66635e6b2a1942b5a2af15906';
        this.premiumBenefits = `<b>ᴘʀᴇᴍɪᴜᴍ ғᴇᴀᴛᴜʀᴇs ✅\n\n📌 ɴᴏ ɴᴇᴇᴅ ᴛᴏ ᴠᴇʀɪғʏ\n📌 ᴅɪʀᴇᴄᴛ ғɪʟᴇs\n📌 ғᴀsᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴ\n📌 ᴡᴀᴛᴄʜ ᴏɴʟɪɴᴇ ᴏᴘᴛɪᴏɴ\n📌 ᴜɴʟɪᴍɪᴛᴇᴅ ᴍᴏᴠɪᴇs & sᴇʀɪᴇs\n\nThese Benefit You Will Get If You Purchase The Premium Membership 😉</b>${this.publicChannelUserName}\n\n`;
        this.apiId = data.apiId;
        this.apiHash = data.apiHash;
        this.botToken = data.botToken;
        this.mongoUri = data.mongoUri;
        this.client = new node_1.Client({
            storage: new node_1.StorageLocalStorage('Session'),
            apiId: this.apiId,
            apiHash: this.apiHash,
            defaultHandlers: false,
        });
        this.mongo = new data_1.DataBase(this.mongoUri);
        this.botDetails = undefined;
        this.msgDeleteTime = 60000; //1 minute
        this.planDescription = `Hello!!😎\nThis Is Premium Purchase Section\nOwned by: ${this.publicChannelUserName} 💨 \n\nCh}eck The Premium Plans By Click the Button Below 👇`;
        this.qrCaption = `Scan The Qr Code 👆And Pay The Plan Fees\n\nIMPORTANT - After Payment Send Screenshot Here👇`;
        this.forceSub = true;
        this.client.invoke.use(({ error }, next) => __awaiter(this, void 0, void 0, function* () {
            if (error instanceof node_1.errors.FloodWait) {
                console.log(`Flood wait for ${error.seconds} seconds`);
                yield new Promise((r) => setTimeout(r, 1000 * error.seconds));
                return true; // Indicates that the error was handled
            }
            else {
                return next(); // Proceed with the next middleware
            }
        }));
    }
    upiInformation(upiId) {
        return `Pay On This Upi Id 👇\nUPI Handle - <code>${upiId}</code>\n\nIMPORTANT - After Payment Send Screenshot Here👇`;
    }
    percentagePartition() {
        // Generate a random number between 0 and 100
        const randomValue = Math.random() * 100;
        // Return true if the random value is less than or equal to the percentage chance
        return randomValue <= this.percentageAds;
    }
    indexEngine() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client.command('index', (ctx) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d, _e, _f;
                    try {
                        let editedMsg;
                        const chatId = ctx.message.chat.id;
                        const channelId = ((_c = (_b = (_a = ctx.message.replyToMessage) === null || _a === void 0 ? void 0 : _a.forwardFrom) === null || _b === void 0 ? void 0 : _b.chat) === null || _c === void 0 ? void 0 : _c.id) || undefined;
                        const userId = String((_d = ctx.message.from) === null || _d === void 0 ? void 0 : _d.id);
                        console.log(ctx.message.replyToMessage);
                        const channelName = ((_f = (_e = ctx.message.replyToMessage) === null || _e === void 0 ? void 0 : _e.forwardFrom) === null || _f === void 0 ? void 0 : _f.chat.title) || undefined;
                        const indexMsgId = ctx.message.replyToMessage || undefined;
                        const INDEXmsgId = indexMsgId.forwardFrom.messageId;
                        console.log(INDEXmsgId, 'chaattt');
                        if (!this.admin.includes(userId)) {
                            console.log("non admin invoking index");
                            return;
                        }
                        if (!userId || !channelId || !channelName || !indexMsgId) {
                            return yield ctx.reply("<b>INVALID FORMAT !! \n\nSend a File and Reply it With /Index..</b>", {
                                parseMode: 'HTML'
                            });
                        }
                        ;
                        const isAccessible = yield this.client.getMessage(channelId, INDEXmsgId);
                        console.log(isAccessible);
                        editedMsg = yield ctx.reply(`<b>Indexing Started!!\n\nChannel: <u>${channelName}</u></b>`, {
                            parseMode: 'HTML',
                        });
                        let Datas = {
                            done: 0,
                            skip: 0,
                            round: 1
                        };
                        //  while (this.index) {
                        yield this.indexRounds({
                            datas: Datas,
                            ctx: ctx,
                            channelId: channelId,
                            msgId: Number(INDEXmsgId),
                            chatId: String(chatId),
                            msgToModify: editedMsg.id,
                            channelName: channelName,
                        });
                        //  }
                    }
                    catch (error) {
                        console.log('error in index::::::::', error);
                        console.log('error in index::::::::', error.message);
                        console.log('error in index::::::::', error.errorMessage);
                        if (error.errorMessage == 'CHANNEL_PRIVATE') {
                            return yield ctx.reply("<b>Bot Has NO RIGHTS !!\n\nPlease ADD bot as Admin with All RIghts !</b>", {
                                parseMode: "HTML",
                            });
                        }
                    }
                }));
            }
            catch (error) {
                console.log('error in index engine:::', error);
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.mongo.connectDB();
                console.log('making admin rep');
                console.log(yield this.mongo.adminReport(this.isAdsOn));
                console.log('trying to connect to bot.....');
                yield this.client.start({ botToken: this.botToken });
                console.log(' connected to bot..... getting details:');
                const data = this.botDetails = yield this.client.getMe();
                this.botUname = data.username;
                this.botUserName = this.botUserName + data.username;
                this.botUrl = this.botUrl + data.username;
                console.log(this.botDetails);
                const conclude = yield this.startEngine();
            }
            catch (error) {
                console.log('error in bot "start":', error);
                throw new Error('crashing..');
            }
        });
    }
    startEngine() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let botData = yield this.mongo.botModel(this.botToken);
                console.log(botData, 'botDataaaaaaaa');
                if (!botData) {
                    throw new Error('cant find Your BotModel or Datas..!');
                }
                botData = botData[0];
                this.publicChannelUname = `${this.botUrl}${botData.publicChannelUName}`;
                this.contactAdmin = `${this.botUrl}${botData.contactAdmin}`;
                this.poweringGroupLog = botData.poweringGroupLog;
                this.fileLog = botData.fileLog;
                this.upiId = botData.upiId;
                if (botData.qrFileId) {
                    this.qrImage = botData.qrCaption;
                }
                console.log('setupped everything');
                console.log('publicchannelname:   ', this.publicChannelUname);
                console.log('contact:   ', this.contactAdmin);
                console.log('powering group:   ', this.poweringGroupLog);
                console.log('fileLOG:   ', this.fileLog);
                console.log('upiId:   ', this.upiId);
                console.log('DONEEEEEEEEEEEEEEEEEE');
            }
            catch (error) {
                console.log('error in startEngine..');
                throw new Error('crashing due to error in startENGINE');
            }
        });
    }
    getCurrentISTTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const timeZone = 'Asia/Kolkata'; // IST timezone
            const zonedTime = (0, date_fns_tz_1.toZonedTime)(new Date(), timeZone); // Convert UTC time to IST
            const currentISTTime = (0, date_fns_1.format)(zonedTime, 'yyyy-MM-dd HH:mm:ss');
            return currentISTTime;
        });
    }
    listener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.on('callbackQuery:data', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                const userId = ctx.callbackQuery.from.id;
                const callBackData = ctx.callbackQuery.data;
                const callBackDataId = ctx.callbackQuery.id;
                const msgId = Number((_a = ctx.callbackQuery.message) === null || _a === void 0 ? void 0 : _a.id);
                const chatId = Number((_b = ctx.callbackQuery.message) === null || _b === void 0 ? void 0 : _b.chat.id);
                const chatTitle = ctx.callbackQuery.message.chat.title;
                console.log(callBackData);
                if (callBackData.startsWith('freePlan')) {
                    try {
                        yield ctx.deleteMessage(msgId);
                        const isIt = yield this.mongo.isFreeTrialUsed(String(userId));
                        if (!isIt) {
                            yield this.mongo.Unlock(String(userId), this.client, undefined, true);
                            const del = yield ctx.reply("<b>Your Premium Plan Has been Activated !\n\nTill TONIGHT!</b>", {
                                parseMode: 'HTML'
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                        }
                        else {
                            const del = yield ctx.reply('<b>🤣 you already used free now no more free trail. please buy subscription here are our 👉 /plan </b>', {
                                parseMode: 'HTML',
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                        }
                    }
                    catch (error) {
                        console.log('error in free plan callBack:::: ', error);
                    }
                }
                if (callBackData.startsWith('Series')) {
                    try {
                        let query = callBackData.split('/');
                        query = query[1];
                        const msgId = ((_c = ctx.msg) === null || _c === void 0 ? void 0 : _c.id) || undefined;
                        console.log(query, msgId);
                        if (query && msgId) {
                            const msgID = yield ctx.editMessageText(msgId, 'Choose The Season You Need !', {
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [{ text: 'Season 1', callbackData: `reQuery/${query} S01` }, { text: 'Season 6', callbackData: `reQuery/${query} S06` }],
                                        [{ text: 'Season 2', callbackData: `reQuery/${query} S02` }, { text: 'Season 7', callbackData: `reQuery/${query} S07` }],
                                        [{ text: 'Season 3', callbackData: `reQuery/${query} S03` }, { text: 'Season 8', callbackData: `reQuery/${query} S08` }],
                                        [{ text: 'Season 4', callbackData: `reQuery/${query} S04` }, { text: 'Season 9', callbackData: `reQuery/${query} S09` }],
                                        [{ text: 'Season 5', callbackData: `reQuery/${query} S05` }, { text: 'Season 10', callbackData: `reQuery/${query} S10` }]
                                    ]
                                }
                            });
                            console.log(msgID.id, 'msgID');
                            return;
                        }
                    }
                    catch (error) {
                        console.log('error in SERIES FILTER::::', error);
                    }
                }
                if (callBackData.startsWith('file')) {
                    try {
                        let data = callBackData.split('/');
                        data = yield this.mongo.sendFile(data[1]);
                        console.log(data);
                    }
                    catch (error) {
                        console.log('eror in sending callback file:::::::', error);
                    }
                }
                if (callBackData.startsWith('reQuery/')) {
                    try {
                        const data = callBackData.split('/');
                        yield ctx.deleteMessage(ctx.msg.id);
                        console.log(msgId);
                        yield this.queryManager(ctx, ctx.callbackQuery.from.id, data[1], ctx.msg.chat.id, ctx.callbackQuery.from.firstName, chatTitle);
                    }
                    catch (error) {
                        console.log('error in reQuery::::::::', error);
                    }
                }
                if (callBackData.startsWith('Quality')) {
                    try {
                        const msgId = ((_d = ctx.msg) === null || _d === void 0 ? void 0 : _d.id) || undefined;
                        const data = callBackData.split('/');
                        if (!msgId) {
                            yield ctx.answerCallbackQuery({
                                text: 'Some ERROR CONTACT ADMIN',
                                alert: true,
                            });
                            return;
                        }
                        const modif = yield ctx.editMessageText(Number(msgId), `<b>The Results for : ${data[1]}\n\nRequested by: ${ctx.callbackQuery.from.firstName}\n\nPowered By: ${ctx.chat.title}</b>`, {
                            replyMarkup: {
                                inlineKeyboard: [
                                    [{ text: '360p', callbackData: `reQuery/${data[1]} 360p` }, { text: '480p', callbackData: `reQuery/${data[1]} 480p` }],
                                    [{ text: '720p', callbackData: `reQuery/${data[1]} 720p` }, { text: '1080p', callbackData: `reQuery/${data[1]} 1080p` }],
                                    [{ text: '1440p', callbackData: `reQuery/${data[1]} 1440p` }, { text: '2160p', callbackData: `reQuery/${data[1]} 2160p` }]
                                ],
                            },
                            parseMode: 'HTML',
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(modif.id);
                        }), 59000);
                    }
                    catch (error) {
                        console.log('errror in Quality::::', error);
                    }
                }
                if (callBackData.startsWith('page')) {
                    try {
                        const data = callBackData.split('/');
                        console.log(data, 'dddat');
                        if (Number(data[3]) < 0) {
                            yield ctx.answerCallbackQuery({
                                text: `You ARE IN THE FIRST PAGE !!`,
                                alert: true,
                            });
                            return;
                        }
                        let markup = this.getResult(data[1], Number(data[2]), userId);
                        if (data[3] > markup.length) {
                            yield ctx.answerCallbackQuery({
                                text: `You ARE IN THE LAST PAGE!!`,
                                alert: true,
                            });
                            return;
                        }
                        console.log(yield ctx.getMessage(Number(data[2])), 'msgREFF');
                        const del = yield this.client.editMessageText(data[1], Number(data[2]), `< b > RESULTS: \n\nCurrent Page: ${(Number(data[3]) + 1)}\n\nThis Message Will be Deleted Automatically in 1 Minute </b>`, {
                            replyMarkup: {
                                inlineKeyboard: markup[Number(data[3])]
                            },
                            parseMode: 'HTML',
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }), 59000);
                        markup[1];
                    }
                    catch (error) {
                        console.log('eror in callback pagination;;;;;;;;', error);
                    }
                }
                if (callBackData.startsWith('planIntro')) {
                    try {
                        yield this.client.deleteMessage(chatId, msgId);
                        yield ctx.replyPhoto(this.planImage, {
                            caption: this.planDescription,
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.planStartReplyMarkup(),
                            }
                        });
                    }
                    catch (error) {
                        console.log('error in callback planIntro::', error);
                    }
                }
                if (callBackData.startsWith("ADS")) {
                    try {
                        const destructure = callBackData.split('/');
                        const data = yield this.mongo.adminReport(this.isAdsOn);
                        const msgId = Number(destructure[1]);
                        const chatId = destructure[2];
                        console.log(chatId, '/', msgId);
                        if (this.isAdsOn) {
                            console.log('turning off ads');
                            this.isAdsOn = false;
                            yield this.client.editMessageText(`${chatId}`, Number(msgId), data, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [{ text: 'Turn ON ADS', callbackData: `ADS/${msgId}/${chatId}` }]
                                    ]
                                }
                            });
                        }
                        else {
                            this.isAdsOn = true;
                            console.log('turning on ads');
                            yield this.client.editMessageText(`${chatId}`, Number(msgId), data, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [{ text: 'Turn ON ADS', callbackData: `ADS/${msgId}` }]
                                    ]
                                }
                            });
                        }
                    }
                    catch (error) {
                        console.log('error in admin callback::', error);
                    }
                }
                if (callBackData.startsWith('showBenefits')) {
                    try {
                        yield this.client.deleteMessage(chatId, msgId);
                        if (this.premiumBenefitsVideo) {
                            const send = yield ctx.replyVideo(this.premiumBenefitsVideo, {
                                caption: this.premiumBenefits,
                                parseMode: 'HTML'
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield this.client.deleteMessage(chatId, send.id);
                            }), 59000);
                            return;
                        }
                        yield ctx.reply('No Premium Benefits Video set By Admin...');
                        return;
                    }
                    catch (error) {
                        console.log('error in callback show BEnefits::', error);
                    }
                }
                if (callBackData.startsWith('qr')) {
                    try {
                        console.log('invloking qr');
                        if (this.qrImage) {
                            yield this.client.deleteMessage(chatId, msgId);
                            const sentMsg = yield ctx.replyPhoto(this.qrImage, {
                                caption: this.qrCaption,
                                replyMarkup: {
                                    inlineKeyboard: markup_1.Markup.qrReplyMarkup(this.paymentScreenshotId)
                                }
                            });
                        }
                        console.log('comes here');
                        yield ctx.answerCallbackQuery({
                            text: 'No QR has Been Set By ADMIN !',
                            alert: true
                        });
                        return;
                    }
                    catch (error) {
                        console.log('error in callback qr::', error);
                    }
                }
                if (callBackData.startsWith('upi')) {
                    try {
                        const cap = this.upiInformation(this.upiId);
                        yield this.client.deleteMessage(chatId, msgId);
                        console.log('invloking upi');
                        yield ctx.replyPhoto(this.upiImage, {
                            caption: cap,
                            parseMode: 'HTML',
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.upiReplyMarkup(this.paymentScreenshotId)
                            }
                        });
                    }
                    catch (error) {
                        console.log('error in callback upi::', error);
                    }
                }
                if (callBackData.startsWith('delete')) {
                    try {
                        console.log('invloking deletes');
                        yield this.client.deleteMessage(chatId, msgId);
                    }
                    catch (error) {
                        console.log('error in callback delte::', error);
                    }
                }
                if (callBackData.startsWith('plans')) {
                    try {
                        yield this.client.deleteMessage(chatId, msgId);
                        const data = callBackData.split('/');
                        console.log(data);
                        yield ctx.replyPhoto(this.planImage, {
                            caption: this.paymentCaption(data[2]),
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.paymentMethodReplyMarkup()
                            }
                        });
                    }
                    catch (error) {
                        console.log('error in plans:::', error);
                    }
                }
                if (callBackData.startsWith('showPlans')) {
                    yield ctx.editMessageText(msgId, this.planDescription, {
                        replyMarkup: {
                            inlineKeyboard: markup_1.Markup.planPriceReplyMarkup(this.paymentScreenshotId)
                        }
                    });
                }
            }));
            this.client.on(':newChatMembers', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _e, _f, _g, _h;
                try {
                    const chatId = ctx.message.chat.id;
                    const userName = ctx.message.from.firstName || ctx.message.from.userName;
                    let channelName = ((_f = (_e = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _e === void 0 ? void 0 : _e.chat) === null || _f === void 0 ? void 0 : _f.title) ? ctx.message.chat.title : 'Channel';
                    const newMember = ctx.message.newChatMembers[0].username;
                    console.log(ctx, 'newwwwwwwwwww');
                    if (newMember == this.botDetails.username) {
                        let channelName = ((_h = (_g = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _g === void 0 ? void 0 : _g.chat) === null || _h === void 0 ? void 0 : _h.title) ? ctx.message.chat.title : 'Channel';
                        const d = yield this.client.sendMessage(ctx.message.chat.id, this.groupAddCaption(channelName), {
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.newMemberReplyMarkup(this.publicChannelUname, this.paymentScreenshotId)
                            },
                            parseMode: 'HTML',
                        });
                        console.log('added bot');
                        const chatDetails = yield ctx.getChatAdministrators(ctx.message.chat.id);
                        const ownerdata = chatDetails.filter((d) => d.status == 'creator');
                        const ownerUserId = ownerdata[0].user.id;
                        console.log(chatDetails, '////');
                        console.log(ownerUserId);
                        yield this.mongo.newGroup(String(ownerUserId), String(chatId));
                        yield this.generateGroupPool();
                        yield this.client.sendMessage(this.poweringGroupLog, `Bot ADDED to NEW Group !!\n\nUser: ${userName}\n\nGroupName: ${channelName}\n\nGroupId: ${chatId}`);
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(d.id);
                        }), 10000);
                        return;
                    }
                    ;
                    const d = yield ctx.reply(`<b>Hᴇʟʟᴏ ${userName} 😍, Aɴᴅ Wᴇʟᴄᴏᴍᴇ Tᴏ ${channelName} ❤️</b>\n\n<b>Just Send Any File Name ill SERCH Open Sourced Available files and <u>List YOU</u>.</b>`, {
                        parseMode: 'HTML',
                        replyMarkup: {
                            inlineKeyboard: markup_1.Markup.groupJoinerReplyMarkup(this.paymentScreenshotId)
                        }
                    });
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(d.id);
                    }), 10000);
                    return;
                }
                catch (error) {
                    console.log('error in listener: ', error);
                }
            }));
        });
    }
    indexRounds(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('indexing invoked');
                const batchSize = 100;
                console.log('givenMssgId:', params.msgId);
                let currentTasks = params.msgId - batchSize;
                console.log('tillNeedTO: ', currentTasks);
                if (currentTasks < 0) {
                    console.log('about to finsih:::', currentTasks);
                    currentTasks = 0;
                }
                let fileArr = [];
                for (let i = params.msgId; i > currentTasks; i--) {
                    fileArr.push(i);
                }
                const messages = yield this.client.getMessages(params.channelId, fileArr);
                let finalSaved;
                for (const message of messages) {
                    if (message.document &&
                        message.document.fileId &&
                        (message.document.mimeType === 'video/x-matroska' || message.document.mimeType === 'video/mp4' || message.document.mimeType == 'video/x-msvideo')) {
                        finalSaved = message.id;
                        yield this.mongo.addFile(message.document, params.datas, params.channelId, params.channelName);
                        //await db.addFile(message.document, buttonNum, Datas);
                    }
                    else if (message.video &&
                        message.video.fileId &&
                        (message.video.mimeType === 'video/x-matroska' || message.video.mimeType === 'video/mp4' || message.video.mimeType == 'video/x-msvideo')) {
                        finalSaved = message.id;
                        yield this.mongo.addFile(message.video, params.datas, params.channelId, params.channelName);
                        //await db.addFile(message.video, buttonNum, Datas);
                    }
                    else {
                        params.datas.skip++;
                        console.log('Ignoring non-file messages...', message, 'ingoreeeeeeeeeeeeeeee');
                    }
                }
                const lastBatchTime = yield this.getCurrentISTTime();
                console.log('going again for', params.datas.round++);
                console.log(finalSaved, 'finalsabeeed');
                if (finalSaved) {
                    yield this.client.forwardMessage(params.channelId, this.indexLog, finalSaved);
                }
                const modified = yield params.ctx.editMessageText(params.msgToModify, `<b>Total Rounds: ${params.datas.round}\n\nSaved: ${params.datas.done}\n\nSkipped: ${params.datas.skip}\n\nLast Indexed Batch Time: ${lastBatchTime}\n<spoiler>If You Believe Your Current Time is Past Than this Atleast 5 Mins Send the Last File From the Index Log and /Index Again<spoiler></b>`, {
                    parseMode: 'HTML',
                });
                if (currentTasks > 0) {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield this.indexRounds({
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
                    }), 59000); //
                }
                else {
                    console.log(`Indexing Finished !!\n\nSaved: ${params.datas.done}\n\nDuplicated: ${params.datas.skip}\n\nTotal Rounds: ${params.datas.round}`);
                    return yield params.ctx.editMessageText(params.msgToModify, `<b>Indexing Finished !!\n\nSaved: ${params.datas.done}\n\nDuplicated: ${params.datas.skip}\n\nTotal Rounds: ${params.datas.round}</b>`, {
                        parseMode: 'HTML',
                    });
                }
            }
            catch (error) {
                console.log('errorr in indexRounds::::', error);
            }
        });
    }
    shortenUrlText(apiUrl, apiToken, dest) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const url = `https://${apiUrl}/api?api=${apiToken}&url=${encodeURIComponent(dest)}`;
                // const url = `${apiUrl}${apiToken}&url=${encodeURIComponent(dest)}`;
                const response = yield axios_1.default.get(url);
                if (response.status !== 200) {
                    console.error('Error:', `Status code: ${response.status}`);
                    console.log(response.headers);
                    console.log(response.statusText);
                    return [];
                }
                const data = response.data;
                console.log(data);
                if (data.status !== 'success') {
                    console.error('Error:', data.message); // Access error message from JSON response
                    return [];
                }
                console.log('Shortened URL:', data.shortenedUrl);
                return [data.shortenedUrl];
            }
            catch (error) {
                console.error('Error:', error.message);
                return [];
            }
        });
    }
    commands() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.command('set_admin', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const text = ctx.message.text;
                    const userID = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!this.admin.includes(String(userID))) {
                        return;
                    }
                    ;
                    if (text == '/set_admin') {
                        yield ctx.reply('INVALID FORMAT \n\nSend in this Format: /set_admin aDMinPubLicUsErNaMe');
                    }
                    const split = text.split(' ');
                    if (split.length == 2) {
                        yield this.mongo.editBotModel(this.botToken, split[1], 'contactAdmin');
                        yield this.startEngine();
                        return;
                    }
                }
                catch (error) {
                    console.log('error in set fileLOG::', error);
                }
            }));
            this.client.command('filelog', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _b;
                try {
                    const userID = (_b = ctx.message.from) === null || _b === void 0 ? void 0 : _b.id;
                    if (!this.admin.includes(String(userID))) {
                        return;
                    }
                    ;
                    const isRepied = ctx.message.replyToMessage;
                    if (!isRepied) {
                        yield ctx.reply('forward A message from fileLog channel and Reply it with fileLog !');
                        return;
                    }
                    const isChatId = isRepied.chat.id;
                    const chatType = isRepied.chat.type;
                    if (chatType !== 'channel') {
                        yield ctx.reply('Only works for Channnel');
                        return;
                    }
                    else {
                        yield this.mongo.editBotModel(this.botToken, String(isChatId), 'fileLog');
                        yield this.startEngine();
                    }
                }
                catch (error) {
                    console.log('error in set fileLOG::', error);
                }
            }));
            this.client.command('qr', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _c, _d;
                try {
                    const userID = (_c = ctx.message.from) === null || _c === void 0 ? void 0 : _c.id;
                    if (!this.admin.includes(String(userID))) {
                        return;
                    }
                    ;
                    const isRepied = ctx.message.replyToMessage;
                    if (!isRepied) {
                        yield ctx.reply('Send AN Image and Reply it with QR !');
                        return;
                    }
                    const fileId = ((_d = isRepied.photo) === null || _d === void 0 ? void 0 : _d.fileId) || undefined;
                    if (!fileId) {
                        yield ctx.reply('Cant file FILEID..');
                        console.log(fileId, 'missing fileeee iDDDD');
                        return;
                    }
                    const change = yield this.mongo.editBotModel(this.botToken, fileId, 'qrFileId');
                    if (!change) {
                        yield ctx.reply(`Failed to set QR ID !}`);
                        if (this.qrImage) {
                            yield ctx.replyPhoto(this.qrImage, {
                                caption: 'Your Current QR IMAGE..0'
                            });
                        }
                        return;
                    }
                    else {
                        yield ctx.reply(`QR ID SET!`);
                        yield this.startEngine();
                        yield ctx.replyPhoto(String(this.qrImage), {
                            caption: 'Your Current QR Image..'
                        });
                        return;
                    }
                }
                catch (error) {
                    console.log('error in set QR::', error);
                }
            }));
            this.client.command('upi', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _e;
                try {
                    const text = ctx.msg.text || undefined;
                    console.log(text);
                    if (this.admin.includes(String((_e = ctx.message.from) === null || _e === void 0 ? void 0 : _e.id)) && text) {
                        if (text == '/upi') {
                            yield ctx.reply('Send in This format /upi/yourUPIid@som');
                            return;
                        }
                        const data = text.split(' ');
                        const changeBotModel = yield this.mongo.editBotModel(this.botToken, data[1], 'upiId');
                        if (changeBotModel) {
                            this.upiId = data[1];
                            yield ctx.reply(`UPI ID SET!: ${this.upiId}`);
                            yield this.startEngine();
                            return;
                        }
                        else {
                            yield ctx.reply(`Failed to set UPI ID !: ${this.upiId}`);
                        }
                    }
                }
                catch (error) {
                    console.log('error in upi:::', error);
                }
            }));
            this.client.command('commands', (ctx) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const commandListAdmin = `<b><u>COMMAND LIST (ADMIN only) !!</u>\n\n\n<u>QR image:</u>\n  '/set_qr' Usage:(send an Image and Reply with /set_qr)\n\n<u>Premium Benefit Video:</u>\n  '/set_benefitvideo' Usage:(send an Video and Reply with /set_benefitvideo)\n\n<u>BroadCast:</u>\n  '/bcast' Usage:(send an Text and Reply with /bcast {Coming SOoon..})\n\n<u>ForceSUB:</u>\n  '/forceSub' Usage:(send an Message from any Channel with Bot Admin and Reply with /forceSub)\n\n<u>Default Tutorial Video:</u>\n  '/tutorial' Usage:(send an Video and Reply with /tutorial)\n\n<u>Ban / UBan User:</u>\n  '/ban/NuMeRiCuSeRiD' '/uban/NuMeRiCuSeRiD'' Usage:(/ban/1585451545)\n\n<u>Index Files:</u>\n  '/index' Usage:(Forward a File from The Channel and Reply with /index)\n\n<u>Premium An USER:</u>\n  '/prime' Usage:(/prime/NuMeRiCuSERiD)\n\n</b>`;
                    const commandListUser = `<b>COMMAND LIST !!\n\n<u>1) Set Shortner:</u>\n\n"<i>Create a Group and Add me Admin. and then use this Command in the Group"</i>\n\n<u>Command:</u> /set_shortner/yourShortner.com/yOuRsHoRtNeRTokeNHer651255241520\n\n<u>2) Set Tutorial:</u>\n\n"<i>Create a Group and Add me Admin. and send a Video for the Group Tutorial Video then use this Command by Replying to the Video in the Group"</i>\n\n<u>Command:</u> /set_tutorial\n\n<u>3) Plan:</u>\n\n"<i>come @${this.botUname} use this Command to <u>Check Available Plans</u>"</i>\n\n<u>Command:</u> /plan\n\n<u>4) My Plan:</u>\n\n"<i>come @${this.botUname} use this Command to <u>Check Your Current Plan</u></i>\n\n<u>Command:</u> /myPlan`;
                    /* if (this.admin.includes(String(ctx.message.from?.id))) {
                         await ctx.reply(commandListAdmin, {
                             parseMode: 'HTML'
                         });
                     }*/
                    yield ctx.reply(commandListUser, {
                        parseMode: "HTML",
                    });
                }
                catch (error) {
                    console.log(error);
                }
            }));
            this.client.command('set_qr', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _f, _g;
                try {
                    const userId = String((_f = ctx.message.from) === null || _f === void 0 ? void 0 : _f.id);
                    const chatType = String(ctx.message.chat.type);
                    const isReplied = ((_g = ctx.message.replyToMessage) === null || _g === void 0 ? void 0 : _g.photo) || undefined;
                    if (this.admin.includes(String(userId)) && isReplied) {
                        this.qrImage = isReplied.fileId;
                        yield ctx.replyPhoto(this.qrImage, {
                            caption: 'Your Current QRImage',
                        });
                        return;
                    }
                }
                catch (error) {
                    console.log('error in QR....', error);
                }
            }));
            this.client.command('set_benefitvideo', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _h, _j;
                try {
                    const userId = String((_h = ctx.message.from) === null || _h === void 0 ? void 0 : _h.id);
                    const chatType = String(ctx.message.chat.type);
                    const isReplied = ((_j = ctx.message.replyToMessage) === null || _j === void 0 ? void 0 : _j.video) || undefined;
                    if (this.admin.includes(String(userId)) && isReplied) {
                        this.premiumBenefitsVideo = isReplied.fileId;
                        yield ctx.replyVideo(this.premiumBenefitsVideo, {
                            caption: 'Your Current Video',
                        });
                    }
                }
                catch (error) {
                    console.log('error in benefit Video..', error);
                }
            }));
            this.client.command('admin', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _k;
                try {
                    const modify = yield ctx.reply('<i>Fetching Details</i>');
                    const data = yield this.mongo.adminReport(this.isAdsOn);
                    const chatId = String((_k = ctx.message.chat) === null || _k === void 0 ? void 0 : _k.id);
                    if (data) {
                        if (this.isAdsOn) {
                            const msg = yield ctx.editMessageText(modify.id, data, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [{ text: 'Switch ADS', callbackData: `ADS/${modify.id}/${chatId} ` }]
                                    ]
                                }
                            });
                            console.log(msg.id, 'og');
                            return;
                        }
                        else {
                            const msg = yield ctx.editMessageText(modify.id, data, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [{
                                                text: 'Switch ADS', callbackData: `ADS / ${modify.id}/${chatId}`
                                            }]
                                    ]
                                }
                            });
                            console.log(msg.id, 'og');
                        }
                    }
                }
                catch (error) {
                    console.log('error in Admin::;', error);
                }
            }));
            this.client.command('bcast', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _l;
                try {
                    const userId = String((_l = ctx.message.from) === null || _l === void 0 ? void 0 : _l.id);
                    const chatType = String(ctx.message.chat.type);
                    const isReplied = ctx.message.replyToMessage || undefined;
                    if (this.admin.includes(userId)) {
                        if (chatType !== 'private') {
                            return yield ctx.reply('Only used in PrivateChat');
                        }
                        if (!isReplied) {
                            return yield ctx.reply('Reply to Any Message with /bcast\n\nTO BROADCAST the MESSAGE to ALL USERS!');
                        }
                        yield ctx.reply('wait bro next update!!...');
                        return;
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
                }
                catch (error) {
                    console.log('error in BCAST:::: ', error);
                }
            }));
            this.client.command('forceSub', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _m, _o;
                try {
                    const userId = (_m = ctx.message.from) === null || _m === void 0 ? void 0 : _m.id;
                    const chatId = String(ctx.message.chat.id);
                    const isReplied = ctx.message.replyToMessage || undefined;
                    if (this.admin.includes(String(userId)) && isReplied && ((_o = isReplied.forwardFrom) === null || _o === void 0 ? void 0 : _o.type) == 'channel') {
                        const forceSubId = isReplied.forwardFrom.chat.id;
                        this.forceSubChatId = String(forceSubId);
                        const createInviteLink = yield this.client.createInviteLink(forceSubId);
                        console.log(createInviteLink);
                        this.forceSubUrl = createInviteLink.inviteLink;
                        return;
                    }
                    return;
                }
                catch (error) {
                    if (error.errorMessage === 'CHANNEL_PRIVATE') {
                        return ctx.reply('Add Bot as Admin With All Rights !\n\nAnd Try Again');
                    }
                    console.log('error in forceSub:::', error);
                }
            }));
            this.client.command('tutorial', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _p, _q;
                try {
                    const userId = (_p = ctx.message.from) === null || _p === void 0 ? void 0 : _p.id;
                    const chatId = String(ctx.message.chat.id);
                    if (this.admin.includes(String(userId))) {
                        const isRepliedVideo = ((_q = ctx.message.replyToMessage) === null || _q === void 0 ? void 0 : _q.video) || undefined;
                        if (!isRepliedVideo) {
                            yield ctx.reply('Send to Video File and reply it with \n\n/tutorial \n\nto set Universal tutorial');
                            return;
                        }
                        this.tutorialUrl = isRepliedVideo.fileId;
                        yield ctx.replyVideo(this.tutorialUrl);
                    }
                    const groupDetails = yield this.paramsGroupPool(chatId, 'userTutorial');
                    if (!groupDetails) {
                        if (!this.tutorialUrl) {
                            yield ctx.reply('No Tutorial Video From Admin');
                        }
                        else {
                            yield ctx.replyVideo(this.tutorialUrl, {
                                caption: '<b>This Group Doenst Have an Tutorial Video..\n\nSo Sent u an Default Tutorial Video From Bot Owner Side!</b>',
                                parseMode: 'HTML',
                            });
                        }
                        return;
                    }
                    console.log(groupDetails, '/////');
                    yield ctx.replyVideo(groupDetails);
                    return;
                }
                catch (error) {
                    console.log('error in tutorial;;;;', error);
                }
            }));
            this.client.command('set_shortner', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _r;
                try {
                    const senderId = (_r = ctx.message.from) === null || _r === void 0 ? void 0 : _r.id;
                    const chatId = ctx.message.chat.id;
                    const msgFrom = ctx.message.chat.type;
                    const msgId = ctx.message.id;
                    const text = ctx.message.text;
                    if (msgFrom == 'private') {
                        const del = yield ctx.reply('ADD Me to Your Group and Use the Command there');
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }));
                        return;
                    }
                    if (text == '/set_shortner') {
                        const del = yield ctx.reply(`<b>Command Incomplete :(\n\nGive me a shortener website link and api along with the command !\n\nFormat:</b> /set_shortner/website.com/1f1da5c9df9a58058672ac8d8134e203b03426a1`, {
                            parseMode: 'HTML',
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }), 10000);
                        return;
                    }
                    if ((msgFrom == 'group' || 'supergroup')) {
                        const groupDetails = yield ctx.getChatAdministrators();
                        console.log(groupDetails);
                        const ownerId = groupDetails.filter((m) => m.status == 'creator');
                        const ownerUserId = ownerId[0].user.id;
                        console.log(ownerUserId, '/', senderId);
                        if (ownerUserId !== senderId) {
                            const del = yield ctx.reply("unAuth only group owner can set!");
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                            return;
                        }
                        const data = text.split('/');
                        const isValidUrl = yield this.shortenUrlText(data[2], data[3], 'www.instagram.com');
                        if (isValidUrl.length < 1) {
                            yield ctx.deleteMessage(msgId);
                            yield ctx.reply('<b>Invalid Url or TOKEN / CONTACT ADMIN !!</b>', {
                                replyMarkup: {
                                    inlineKeyboard: markup_1.Markup.contactAdminReplyMarkup(this.contactAdmin),
                                },
                                parseMode: 'HTML',
                                protectContent: true,
                            });
                            return;
                        }
                        yield this.mongo.setShortner(String(ownerUserId), String(chatId), String(data[2]), String(data[3]));
                        yield this.generateGroupPool();
                        yield ctx.reply("Congrats Your API has been ADDED!\n\nFrom now On this Group will generate Links from Your Account\n\nHappy EARNING 💵 ");
                        yield ctx.deleteMessage(msgId);
                        return;
                    }
                    return;
                }
                catch (error) {
                    console.log('error in setShortner:::', error);
                }
            }));
            this.client.command('set_tutorial', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _s, _t;
                try {
                    const senderId = ctx.message.from.id;
                    const chatId = ctx.message.chat.id;
                    const msgFrom = ctx.message.chat.type;
                    const isRepied = ctx.message.replyToMessage || undefined;
                    const fileAvailable = ((_t = (_s = ctx.message.replyToMessage) === null || _s === void 0 ? void 0 : _s.video) === null || _t === void 0 ? void 0 : _t.fileId) || undefined;
                    console.log(ctx.message.replyToMessage, 'filleee');
                    if (msgFrom == 'private') {
                        yield ctx.reply('ADD Me to Your Group and Use the Command there \n\nBy Replying to Any Video');
                        return;
                    }
                    if ((msgFrom == 'supergroup' || 'group') && fileAvailable) {
                        const groupDetails = yield ctx.getChatAdministrators(ctx.message.chat.id);
                        const ownerId = groupDetails.filter((m) => m.status == 'creator');
                        const ownerUserId = String(ownerId[0].user.id);
                        if (parseInt(ownerUserId) !== parseInt(senderId)) {
                            let del = yield ctx.reply('UnAuth. Command only for Owner of the Group!');
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                            return;
                        }
                        ;
                        console.log(fileAvailable, 'filllllll');
                        yield this.mongo.setTutorial(String(ownerUserId), String(chatId), fileAvailable);
                        yield this.generateGroupPool();
                        let del = yield ctx.reply('Tutorial has Been Set!..\n\nUse /tutorial');
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }), 50000);
                        return;
                    }
                }
                catch (error) {
                    console.log('errror in setTutorial:::', error);
                }
            }));
            this.client.command('myPlan', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _u, _v, _w;
                try {
                    const isPremiumExpired = yield this.mongo.isVerified(String((_u = ctx.message.from) === null || _u === void 0 ? void 0 : _u.id));
                    if (!isPremiumExpired) {
                        yield ctx.reply(`Hey ${((_v = ctx.message.from) === null || _v === void 0 ? void 0 : _v.firstName) || 'user'},\n\nʏᴏᴜ ᴅᴏ ɴᴏᴛ ʜᴀᴠᴇ ᴀɴʏ ᴀᴄᴛɪᴠᴇ ᴘʀᴇᴍɪᴜᴍ ᴘʟᴀɴs, ɪꜰ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴛᴀᴋᴇ ᴘʀᴇᴍɪᴜᴍ ᴛʜᴇɴ ᴄʟɪᴄᴋ ᴏɴ ʙᴇʟᴏᴡ ʙᴜᴛᴛᴏɴ 👇`, {
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.myPlanReplyMarkup()
                            }
                        });
                        return;
                    }
                    const data = yield model_1.userModel.findOne({ userId: String((_w = ctx.message.from) === null || _w === void 0 ? void 0 : _w.id) });
                    console.log(data);
                    const del = yield ctx.reply(`You Have an Active PLAN..\n\nExpiring On: ${data.verifiedTill}`);
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(del.id);
                    }), 10000);
                    return;
                }
                catch (error) {
                    console.log('error in myPlan::::', error);
                }
            }));
            this.client.command('ban', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _x;
                try {
                    console.log('triggering ban');
                    const text = ctx.message.text;
                    if (this.admin.includes(String((_x = ctx.message.from) === null || _x === void 0 ? void 0 : _x.id))) {
                        if (text == '/ban') {
                            const d = yield ctx.reply('send in this format\n\n/ban/uSeRiD');
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(d.id);
                            }), 10000);
                            return;
                        }
                        const data = text.replace('/ban/', '');
                        yield this.mongo.changeValid(data, false);
                        yield ctx.reply(`!! Banned USER !!\n\nUserID: ${data}\n\nStaus: BANNED.`);
                    }
                    else {
                        const k = yield ctx.reply('unAuth');
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(k.id);
                        }));
                    }
                }
                catch (error) {
                    console.log('error in ban::::::', error);
                }
            }));
            this.client.command('uban', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _y;
                try {
                    const text = ctx.message.text;
                    if (this.admin.includes(String((_y = ctx.message.from) === null || _y === void 0 ? void 0 : _y.id))) {
                        if (text == '/unban') {
                            const d = yield ctx.reply('send in this format\n\n/uban/uSeRiD');
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(d.id);
                            }), 10000);
                            return;
                        }
                        const data = text.replace('/uban/', '');
                        yield this.mongo.changeValid(data, true);
                        yield ctx.reply(`!! UnBanned USER !!\n\nUserID: ${data}\n\nStaus: UNBANNED.`);
                    }
                    else {
                        const k = yield ctx.reply('unAuth');
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(k.id);
                        }));
                    }
                }
                catch (error) {
                    console.log('error in ban::::::', error);
                }
            }));
            this.client.command('send', (ctx) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = ctx.message.text;
                    const val = data.split(' ');
                    yield this.client.sendVideo(ctx.message.from.id, val[1]);
                }
                catch (error) {
                    console.log('in bug send::', error);
                }
            }));
            this.client.command('prime', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _z;
                try {
                    const userId = String((_z = ctx.message.from) === null || _z === void 0 ? void 0 : _z.id);
                    const vals = ctx.message.text;
                    if (this.admin.includes(userId)) {
                        if (vals == '/prime') {
                            const del = yield ctx.reply('Invalid FORMAT !! \n\nUse this Format\n\n/prime/uSeRiDoFtHeUsEr');
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                            return;
                        }
                        const data = vals.split('/');
                        console.log(data);
                        yield this.mongo.Unlock(userId, Number(data[2]));
                    }
                    const del = yield ctx.reply('unAuth');
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(del.id);
                    }));
                    return;
                }
                catch (error) {
                    console.log('error in making PRIME:::', error);
                }
            }));
            this.client.command('start', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                var _0, _1, _2, _3;
                try {
                    const userId = String((_0 = ctx.message.from) === null || _0 === void 0 ? void 0 : _0.id);
                    const chatId = String(ctx.message.chat.id);
                    const isExist = yield this.mongo.isExist(userId);
                    const vals = ctx.message.text;
                    console.log(ctx.message.text);
                    if (vals.startsWith(`/start@${this.botUname}`)) {
                        console.log("Added to Group");
                        next();
                    }
                    if (vals.startsWith('/start hash_')) {
                        let data = vals.split('_');
                        const hash = data[1];
                        const pool = this.poolExist(hash);
                        if (!pool) {
                            yield ctx.reply("DONT TRY TO SMART AND BYPASS !");
                            return;
                        }
                        yield this.mongo.Unlock(userId);
                        const del = yield ctx.reply('<b>You are Unlocked Till Today ENJOY</b>', {
                            parseMode: 'HTML',
                        });
                        const del1 = yield ctx.replyDocument(pool.fileId, {
                            caption: '<3'
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }), 4000);
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del1.id);
                        }), 59000);
                        return;
                    }
                    if (vals.startsWith('/start file_')) {
                        console.log('comes here');
                        const match = vals.match(/^\/start file_(.*)_(.*)$/);
                        if (match) {
                            console.log('matcbed');
                            const fileId = match[1]; // Contains the file ID part
                            const chatId = match[2]; // Contains the chat ID part
                            console.log('File ID:', fileId);
                            console.log('Chat ID:', chatId);
                            const uniqueId = fileId;
                            let fileData = yield this.mongo.sendFile(uniqueId);
                            const fileType = fileData.fileMimeType;
                            console.log(fileData, 'fillleleleleelel');
                            const user = yield this.mongo.isExist(userId);
                            const isVerified = yield this.mongo.isVerified(userId);
                            if (!user.valid) {
                                yield ctx.reply('YOU ARE BANNED BY OUR TEAM !!\n\nContact: Admin', {
                                    replyMarkup: {
                                        inlineKeyboard: markup_1.Markup.bannedReplyMarkup(this.paymentScreenshotId)
                                    }
                                });
                                return;
                            }
                            const hash = crypto.randomUUID();
                            const endPoint = `https://t.me/${this.botUname}?start=hash_${hash}`;
                            console.log('vals for:::', chatId);
                            const isPower = yield this.paramsGroupPool(String(chatId), 'userPowering', true);
                            const tutorial = (isPower.userTutorial) ? isPower.userTutorial : this.tutorialUrl || 'https://telegram.com/SingleMachiOffl';
                            console.log(isPower, 'issssssssssssspower');
                            let shortenedUrl;
                            if (!isPower) {
                            }
                            else {
                                const underTax = yield this.percentagePartition();
                                if (!underTax) {
                                    shortenedUrl = yield this.shortenUrlText(isPower.userApi, isPower.userApiToken, endPoint);
                                }
                                else {
                                    shortenedUrl = yield this.shortenUrlText(this.apiUrl, this.apiToken, endPoint);
                                }
                                console.log(shortenedUrl, 'shoertttt');
                                if (!user.verified && fileData && shortenedUrl.length > 0 && !isVerified && this.isAdsOn) {
                                    const shortUrl = String(shortenedUrl[0]);
                                    let pool = this.addPool(String((_1 = ctx.message.from) === null || _1 === void 0 ? void 0 : _1.id), hash, endPoint, shortUrl, fileData.fileId);
                                    console.log(pool, 'pool');
                                    yield ctx.reply(`🫂 ʜᴇʏ.. ${((_2 = ctx.message.from) === null || _2 === void 0 ? void 0 : _2.firstName) || 'user'}\n\n✅ ʏᴏᴜʀ ʟɪɴᴋ ɪꜱ ʀᴇᴀᴅʏ, ᴋɪɴᴅʟʏ ᴄʟɪᴄᴋ ᴏɴ ᴅᴏᴡɴʟᴏᴀᴅ ʙᴜᴛᴛᴏɴ.\n\n⚠️ ꜰɪʟᴇ ɴᴀᴍᴇ : ${fileData.fileName}\n\n📥 ꜰɪʟᴇ ꜱɪᴢᴇ : ${fileData.fileSize}`, {
                                        replyMarkup: {
                                            inlineKeyboard: [
                                                [{ text: 'Unlock Now & Download!', url: pool.shortUrl }],
                                                [{ text: 'Bypassed URL', url: pool.url }],
                                                [{ text: 'Tutorial Video!', url: tutorial }],
                                                [{ text: `Buy Subscription | Remove AD's`, callbackData: 'planIntro' }]
                                            ]
                                        }
                                    });
                                    return;
                                }
                                else if ((!this.isAdsOn || user.verified) && fileData && shortenedUrl.length > 0) {
                                    console.log(fileData);
                                    let del;
                                    del = (fileType == 'video/x-matroska') ? yield ctx.replyVideo(fileData.fileId, {
                                        caption: "<3\n\nThis File will be Automatically DELETED in 1 MIN, Forward the File To SOMEONE to keep it Permanent"
                                    }) : yield ctx.replyDocument(fileData.fileId, {
                                        caption: "<3\n\nThis File will be Automatically DELETED in 1 MIN, Forward the File To SOMEONE to keep it Permanent"
                                    });
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        if (del.id) {
                                            yield ctx.deleteMessage(del.id);
                                            return;
                                        }
                                        return;
                                    }), 59000);
                                    return;
                                }
                                console.log('enane therla user');
                            }
                        }
                        const name = ((_3 = ctx.message.from) === null || _3 === void 0 ? void 0 : _3.firstName) || 'User';
                        console.log('comes under start');
                        yield ctx.reply(this.startCaption(name), {
                            parseMode: 'HTML',
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.introReplyMarkup(String(this.botUname), this.publicChannelUname)
                            }
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
            this.client.command('plan', (ctx) => __awaiter(this, void 0, void 0, function* () {
                yield ctx.replyPhoto(this.planImage, {
                    caption: this.planDescription,
                    replyMarkup: {
                        inlineKeyboard: markup_1.Markup.planStartReplyMarkup()
                    }
                });
            }));
        });
    }
    fileSaver() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.on('message', (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const chatType = ctx.message.chat.type;
                    console.log(chatType);
                    console.log('getting');
                    if (this.fileLog.includes(String(ctx.message.chat.id))) {
                        if (ctx.message && ((ctx.message.document &&
                            (ctx.message.document.mimeType === 'video/x-matroska' || ctx.message.document.mimeType === 'video/mp4')) ||
                            (ctx.message.video &&
                                (ctx.message.video.mimeType === 'video/x-matroska' || ctx.message.video.mimeType === 'video/mp4')))) {
                            const data = ctx.message.document || ctx.message.video;
                            console.log(data, 'dataaaaa');
                            yield this.mongo.addFile(data);
                            return;
                        }
                    }
                    else if (ctx.message.chat.type == 'private') {
                        console.log('spamming private');
                        yield ctx.reply(this.startCaption(ctx.message.from.firstName || 'USER'), {
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.introReplyMarkup(String(this.botUname), this.publicChannelUname)
                            }
                        });
                        return;
                    }
                    console.log('some Query initiating next');
                    next();
                }
                catch (error) {
                    console.log('error in fileSave...', error);
                }
            }));
        });
    }
    groupManager() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.on('message:text', (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    console.log('msg comes');
                    const firstName = ((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.firstName) || 'user';
                    const msgId = ctx.message.id;
                    const userId = (_b = ctx.message.from) === null || _b === void 0 ? void 0 : _b.id;
                    const chatId = ctx.message.chat.id;
                    const typeMedium = ctx.message.chat.type;
                    const text = ctx.message.text;
                    if ((typeMedium == 'group' || typeMedium == 'supergroup') && !text.startsWith('/')) {
                        yield this.queryManager(ctx, Number(userId), text, chatId, firstName, ctx.message.chat.title);
                        return;
                    }
                    return;
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    queryManager(ctx, userId, query, chatId, firstName, chatTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let exist;
                if (this.forceSubChatId) {
                    exist = yield this.isForceSub(this.forceSubChatId, userId);
                }
                let editedMsg;
                if (exist && this.forceSubUrl) {
                    editedMsg = yield ctx.reply('<b>WoohooOooo You are So fast Naughtyy 😜\n\n Join My Channel to Use ME! and Type Again .</b>', {
                        parseMode: 'HTML',
                        replyMarkup: {
                            inlineKeyboard: markup_1.Markup.forceSubReplyMarkup(this.forceSubUrl),
                        }
                    });
                    return setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(editedMsg.id);
                    }), 59000);
                }
                editedMsg = yield ctx.reply(`<b>Searching for "${query}"... </b>`, {
                    parseMode: 'HTML',
                    protectContent: 'true',
                });
                const file = yield this.mongo.isFileExist(query);
                if (file.length > 0) {
                    const fileAsReplyMarkup = this.savingReplyMarkup(query, file, 5, String(chatId), editedMsg.id, userId);
                    editedMsg = yield ctx.editMessageText(editedMsg.id, `𝙏𝙝𝙚 𝙍𝙚𝙨𝙪𝙡𝙩 𝙛𝙤𝙧 >>${query}\n\nTotal: ${fileAsReplyMarkup.length}\n\n𝙍𝙚𝙦𝙪𝙚𝙨𝙩 𝘽𝙮: ${firstName}\n\n𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝘽𝙮: ${chatTitle}\n\n<b>!! This Message will be Deleted in 1 Min !!</b>`, {
                        parseMode: "HTML",
                        replyMarkup: {
                            inlineKeyboard: fileAsReplyMarkup[0],
                        }
                    });
                }
                else if (file.length == 0) {
                    editedMsg = yield ctx.editMessageText(editedMsg.id, `𝙎𝙤𝙧𝙧𝙮 𝙉𝙤 𝙁𝙞𝙡𝙚𝙨 𝙒𝙚𝙧𝙚 𝙁𝙤𝙪𝙣𝙙 : ${query}\n\n𝘾𝙝𝙚𝙘𝙠 𝙔𝙤𝙪𝙧 𝙎𝙥𝙚𝙡𝙡𝙞𝙣𝙜 𝙞𝙣 𝙂𝙤𝙤𝙜𝙡𝙚 𝙖𝙣𝙙 𝙏𝙧𝙮 𝘼𝙜𝙖𝙞𝙣 !!`, {
                        replyMarkup: {
                            inlineKeyboard: [
                                [{ text: '🔎 𝗤𝘂𝗶𝗰𝗸 𝗚𝗼𝗼𝗴𝗹𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 🔍', url: `https://www.google.com/search?q=${encodeURIComponent(query)}` }]
                            ]
                        }
                    });
                }
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield ctx.deleteMessage(editedMsg.id);
                    this.deleteResponse(String(chatId), userId, editedMsg.id);
                }), 59000 + 59000);
            }
            catch (error) {
                console.log('errorr in query manager:::::::::::::', error);
            }
        });
    }
    isForceSub(chatId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!chatId) {
                    return;
                }
                return yield this.client.getChatMember(chatId, userId);
            }
            catch (error) {
                if (error.message === '400: CHANNEL_INVALID (channels.getChannels)') {
                    throw new Error("ADd button to Force SUb channel... reason: channel private");
                }
                console.log('errror on isForceSub:::', error.message);
            }
        });
    }
    // private userplanCaption(name: string,)
    startCaption(name) {
        return `👋 Hey ${name} , <b>GOOD DAY</b>  ⚡️\n🤗 Welcome to  Open Source Advance Filter bot.\n🤖 I Can Send you Direct Files by searching OpenLy Available Datas. \n📁 Type & Send Me Any File Name`;
    }
    paymentCaption(ammount) {
        return `Wow!!🤯\nYou Have Choosen Weekly Bot Membership Of Price ₹${ammount}\nChoose Payment Method 👇`;
    }
    groupAddCaption(name) {
        return `<b>Thankyou For Adding Me In ${name} ❣️\n\nCheck My Commands using /Commands\n\nIf you have any questions & doubts about using me contact support.</b>`;
    }
    captureCtx(ctx, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ctxJson = JSON.stringify(ctx, (key, value) => {
                    // Handle circular references and functions if needed
                    if (typeof value === 'function')
                        return undefined;
                    return value;
                }, 2); // Pretty-print with 2 spaces
                // Write the JSON string to a file
                fs.writeFileSync(`${name}.json`, ctxJson, 'utf8'); // Corrected quote here
                console.log('Context saved to', `${name}.json`);
            }
            catch (error) {
                console.log('Error in captureCtx', error);
            }
        });
    }
}
exports.Bot = Bot;
