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
const movier_1 = require("movier");
const date_fns_tz_1 = require("date-fns-tz");
const localStore_1 = require("./localStore");
const axios_1 = __importDefault(require("axios"));
const model_1 = require("./model");
const markup_1 = require("./markup");
const server_1 = require("./server");
const sendFile_1 = require("./plugins/sendFile");
class Bot extends localStore_1.localStore {
    constructor(data) {
        super();
        this.dumpChannelId = "-1002380108081";
        this.supportMessage = `<b>This Bot is Under C0pyR1ght and Can be Deleted </b>Join Backups @SingleMachiOffll\n\nOther Channels (files):\n\nTamil -> @SingleMachiCinemas\nMalayalam -> @SingleMachiMallu\nTelugu -> @SingleMachiTelugu\nWebSeries -> @SingleMachiSerie\nHindi -> @SingleMachiBollyWood\nHollywood -> @SingleXMachi\nAnime -> @SingleMachiAnime\n\n<pre>Click This Below Link to JOIN ALL..</pre>`;
        this.supportChatLink = "https://t.me/addlist/vrbL9O0lkGlmNTg0";
        this.postingChannel = "-1001897524951";
        this.posterChannelId = "-1001897524951";
        this.inlineBot = `Machi_x_bot`;
        this.sendLogs = "-1002280370011";
        this.botUrl = "https://t.me/";
        this.percentageAds = 20;
        this.publicChannelUname = "MachiXupdates";
        this.publicChannelUserName = `@${this.publicChannelUname}`;
        this.contactAdmin = `${this.botUrl}MachiXsupportBot`;
        this.upiId = "sooon";
        this.paymentScreenshotId = `${this.botUrl}MachiXsupportBot`;
        this.admin = ["1767901454", "7822087230"];
        this.supportLog = "-1002404917291";
        this.indexLog = "-1002395054296"; // - 1002279938392';
        this.poweringGroupLog = "-1002363091043"; //channel id of groupChat !
        this.fileLog = ["-1002280370011"];
        this.botUserName = "@";
        this.botUname = undefined;
        this.tutorialUrl = undefined;
        this.forceSubUrl = undefined;
        this.forceSubChatId = undefined;
        this.premiumBenefitsVideo = undefined;
        this.qrImage = undefined;
        this.upiImage = "https://ibb.co/xm65Ghx";
        this.planImage = "https://ibb.co/3RynpHB";
        this.isAdsOn = true;
        this.apiUrl = "modijiurl.com";
        this.apiToken = "3290c714693dbd3a812f47289ef8585a802b214c"; //'a80541b1e03491a66635e6b2a1942b5a2af15906';
        this.premiumBenefits = `<b>ᴘʀᴇᴍɪᴜᴍ ғᴇᴀᴛᴜʀᴇs ✅\n\n📌 ɴᴏ ɴᴇᴇᴅ ᴛᴏ ᴠᴇʀɪғʏ\n📌 ᴅɪʀᴇᴄᴛ ғɪʟᴇs\n📌 ғᴀsᴛ ᴅᴏᴡɴʟᴏᴀᴅ ᴏᴘᴛɪᴏɴ\n📌 ᴡᴀᴛᴄʜ ᴏɴʟɪɴᴇ ᴏᴘᴛɪᴏɴ\n📌 ᴜɴʟɪᴍɪᴛᴇᴅ ᴍᴏᴠɪᴇs & sᴇʀɪᴇs\n\nThese Benefit You Will Get If You Purchase The Premium Membership 😉</b>${this.publicChannelUserName}\n\n`;
        this.apiId = data.apiId;
        this.apiHash = data.apiHash;
        this.botToken = data.botToken;
        this.mongoUri = data.mongoUri;
        this.client = new node_1.Client({
            storage: new node_1.StorageLocalStorage("Session"),
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
        this.client.invoke.use((_a, next_1) => __awaiter(this, [_a, next_1], void 0, function* ({ error }, next) {
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
    /*
      public async ApiRequest(query: string, req: Request, res: Response, limit: number, offset: number) {
          try {
              const resArr: number[] = [];
              const response: { fileName: string, link?: string }[] = [];
  
              const getFile: any = await this.mongo.isFileExist(query, limit, offset);
  
              if (getFile.length < 1) {
                  return res.status(404).json({ message: "No Files FOUND" });
              }
  
              // Send documents concurrently
              const sendPromises = getFile.map(async (file: any) => {
                  try {
                      const temp = await this.client.sendDocument(streamWebHook, file.fileId);
                      resArr.push(temp.id);
                      response.push({ fileName: file.fileName });
                  } catch (error) {
                      const temp = await this.client.sendVideo(streamWebHook, file.file); // Presuming this was intended
                      resArr.push(temp.id);
                      response.push({ fileName: file.fileName });
                  }
              });
  
              // Wait for all send operations to complete
              await Promise.all(sendPromises);
  
              // Collect message IDs that aren't included in resArr
              const totalMsgId = resArr[0] + 10;
              const responseArr = Array.from({ length: totalMsgId - resArr[0] + 1 }, (_, i) => resArr[0] + i).filter(i => !resArr.includes(i));
  
              // Fetch links based on the generated message IDs
              setTimeout(async () => {
                  const fetchLinks: any = await this.client.getMessages(streamWebHook, responseArr);
  
                  // Map fetched links to response array
                  fetchLinks.forEach((link: any, index: number) => {
                      if (response[index]) {
                          response[index].link = link.text; // Assign the fetched link to the corresponding fileName
                      }
                  });
  
                  // Send the final structured response
                  return res.status(200).json(response);
              }, 1000)
  
  
          } catch (error) {
              console.log('error on apiRequest:::', error);
              return res.status(500).json({ message: "Internal Server Error" });
          }
      }*/
    ApiStream(uniqueHash, req, res, forBot) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const streamWebHook = "-1001838739662";
                if (req && res) {
                    const fileData = yield model_1.fileModel.findOne({ fileUniqueId: uniqueHash });
                    if (!fileData) {
                        return res.status(500).send("Internal Server Error");
                    }
                    let temp;
                    try {
                        temp = yield this.client.sendDocument(streamWebHook, fileData.fileId);
                    }
                    catch (error) {
                        temp = yield this.client.sendVideo(streamWebHook, fileData.fileId);
                    }
                    finally {
                        console.log("sent file...");
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            console.log("catching file...");
                            temp = yield this.client.getMessage(streamWebHook, Number(temp.id) + 1);
                            console.log(temp.text);
                            if (!temp.text) {
                                return res.status(500).send("try again later");
                            }
                            else {
                                return res.status(201).json({ data: temp.text });
                            }
                        }), 1500);
                    }
                }
            }
            catch (error) {
                console.log("error in APISTREAM:::", error);
            }
        });
    }
    ApiRequest(query, req, res, limit, offset) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                /* const streamWebHook = '-1001838739662'
                       const resArr: number[] = [];
                       const responseArr: number[] = [];
                       const response: any[] = []*/
                const getFile = yield this.mongo.isFileExist(query, limit, offset);
                console.log(getFile);
                const response = getFile.map((m) => ({
                    fileName: m.fileName,
                    fileSize: m.fileSize,
                    uniqueId: m.fileUniqueId,
                }));
                if (getFile.length < 1) {
                    return res.status(404).json({ message: "No Files FOUND" });
                }
                else {
                    return res.status(201).json(response);
                }
            }
            catch (error) {
                console.log("error on apiRequest:::", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    imdbInlineUrl(FileName, CollectionNum) {
        return ` https://t.me/${this.inlineBot}?start=poster_${CollectionNum}_${FileName}`;
    }
    /* public async switchUserIds() {
           try {
               const docs = await groupModel.find({});
   
               console.log(docs, '//////', docs.length)
   
   
               for (const doc of docs) {
                   if (doc.userId.startsWith('-')) {
                       // Convert to a plain object to avoid modifying the Mongoose document directly
                       const temp = doc.toObject();
                       console.log(temp, 'teeeempppp')
   
                       // Delete the old document
                       await groupModel.findOneAndDelete({ userId: temp.userId });
   
                       // Swap userId and userGroupId
                       const tempGroupId = temp.userId;
                       temp.userId = temp.userGroupId;
                       temp.userGroupId = tempGroupId;
   
                       console.log('creating...')
                       // Create the new document
                       await groupModel.create(temp);
   
                       console.log(`Created new document with userId: ${temp.userId} and userGroupId: ${temp.userGroupId}`);
                   }
               }
   
   
               console.log('User IDs processed successfully!');
           } catch (error) {
               console.error('Error switching user IDs:', error);
           }
       }
   */
    fileLogs(client, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let caption = `USER: ${data.userName}\n\nUSERID: ${data.userId}\n\nFILENAME: ${data.fileName}\n\nFILESIZE: ${data.fileSize}`;
                yield this.client.sendMessage(this.sendLogs, caption);
            }
            catch (error) {
                console.log("error in fileLogs:::", error);
            }
        });
    }
    /*
       private async sendFile(data: any) {
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
       }
           */
    upiInformation(upiId) {
        return `Pay On This Upi Id 👇\nUPI Handle - <code>${upiId}</code>\n\nIMPORTANT - After Payment Send Screenshot Here👇`;
    }
    percentagePartition() {
        // Generate a random number between 0 and 100
        const randomValue = Math.random() * 100;
        // Return true if the random value is less than or equal to the percentage chance
        return randomValue <= this.percentageAds;
    }
    gcast(client, text, photo, caption, captionEntities) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const groupsData = yield this.mongo.poweringGroups();
                console.log(groupsData, "groupsssssssssssdata");
                if (!groupsData || groupsData.length === 0) {
                    yield client.sendMessage(this.admin[0], "NO GROUPS DATA FOUND!");
                    return;
                }
                for (const data of groupsData) {
                    const groupId = data.userGroupId;
                    // Wait 10 seconds before sending the next message
                    try {
                        if (photo && caption && captionEntities) {
                            yield client.sendPhoto(groupId, photo, {
                                caption,
                                captionEntities,
                            });
                        }
                        else if (photo && caption) {
                            yield client.sendPhoto(groupId, photo, {
                                caption,
                            });
                        }
                        else if (text && captionEntities) {
                            yield client.sendMessage(groupId, text, {
                                entities: captionEntities,
                            });
                        }
                        else if (text) {
                            yield client.sendMessage(groupId, text);
                        }
                        yield new Promise((resolve) => setTimeout(resolve, 10000));
                    }
                    catch (error) {
                        console.log(`Error sending message to group ${groupId}:`, error);
                    }
                }
                yield client.sendMessage(this.admin[0], "GCAST FINISHED !!");
            }
            catch (error) {
                console.log("Error in gcast:::", error);
            }
        });
    }
    indexEngine() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.client.command("index", (ctx) => __awaiter(this, void 0, void 0, function* () {
                    var _a, _b, _c, _d, _e, _f;
                    try {
                        let editedMsg;
                        const chatId = ctx.message.chat.id;
                        const channelId = ((_c = (_b = (_a = ctx.message.replyToMessage) === null || _a === void 0 ? void 0 : _a.forwardFrom) === null || _b === void 0 ? void 0 : _b.chat) === null || _c === void 0 ? void 0 : _c.id) || undefined;
                        const userId = String((_d = ctx.message.from) === null || _d === void 0 ? void 0 : _d.id);
                        //console.log(ctx.message.replyToMessage)
                        const channelName = ((_f = (_e = ctx.message.replyToMessage) === null || _e === void 0 ? void 0 : _e.forwardFrom) === null || _f === void 0 ? void 0 : _f.chat.title) || undefined;
                        const indexMsgId = ctx.message.replyToMessage || undefined;
                        const INDEXmsgId = indexMsgId.forwardFrom.messageId;
                        //console.log(INDEXmsgId, 'chaattt');
                        if (!this.admin.includes(userId)) {
                            console.log("non admin invoking index");
                            return;
                        }
                        if (!userId || !channelId || !channelName || !indexMsgId) {
                            return yield ctx.reply("<b>INVALID FORMAT !! \n\nSend a File and Reply it With /Index..</b>", {
                                parseMode: "HTML",
                            });
                        }
                        const isAccessible = yield this.client.getMessage(channelId, INDEXmsgId);
                        //   console.log(isAccessible);
                        editedMsg = yield ctx.reply(`<b>Indexing Started!!\n\nChannel: <u>${channelName}</u></b>`, {
                            parseMode: "HTML",
                        });
                        let Datas = {
                            done: 0,
                            skip: 0,
                            round: 1,
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
                        console.log("error in index::::::::", error);
                        console.log("error in index::::::::", error.errorMessage);
                        if (error.errorMessage == "CHANNEL_PRIVATE") {
                            return yield ctx.reply("<b>Bot Has NO RIGHTS !!\n\nPlease ADD bot as Admin with All RIghts !</b>", {
                                parseMode: "HTML",
                            });
                        }
                    }
                }));
            }
            catch (error) {
                console.log("error in index engine:::", error);
            }
        });
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.mongo.connectDB();
                console.log(yield this.mongo.adminReport(this.isAdsOn));
                console.log("trying to connect to bot.....");
                yield this.client.start({ botToken: this.botToken });
                console.log(" connected to bot..... getting details:");
                const data = (this.botDetails = yield this.client.getMe());
                this.botUname = data.username;
                this.botUserName = this.botUserName + data.username;
                console.log(this.botDetails);
                const conclude = yield this.startEngine();
            }
            catch (error) {
                console.log('error in bot "start":', error);
                throw new Error("crashing..");
            }
        });
    }
    startEngine() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let botData = yield this.mongo.botModel(this.botToken);
                // console.log(botData, 'botDataaaaaaaa');
                if (!botData) {
                    throw new Error("cant find Your BotModel or Datas..!");
                }
                botData = botData[0];
                if (botData.poweringGroupLog) {
                    this.poweringGroupLog = botData.poweringGroupLog;
                    console.log("refreshed poweingLog: ", this.poweringGroupLog);
                }
                if (botData.fileLog) {
                    this.fileLog = botData.fileLog;
                    console.log("refreshed fileLog: ", this.fileLog);
                }
                if (botData.upiId) {
                    this.upiId = botData.upiId;
                    console.log("refreshed upiId: ", this.upiId);
                }
                if (botData.contactAdmin) {
                    this.contactAdmin = `${this.botUrl}${botData.contactAdmin}`;
                    console.log("refreshed contactAdmin: ", this.contactAdmin);
                }
                if (botData.publicChannelUName) {
                    this.publicChannelUname = `${this.botUrl}${botData.publicChannelUName}`;
                    console.log("refreshed publicChannelName: ", this.publicChannelUname);
                }
                if (botData.qrFileId) {
                    this.qrImage = botData.qrFileId;
                    console.log("refreshed qr IDD: ", this.qrImage);
                }
                if (botData.tutorialVideo) {
                    this.tutorialUrl = botData.tutorialVideo;
                    console.log("refreshed tutorialVideo: ", this.tutorialUrl);
                }
                if (botData.forceSubUrl) {
                    this.forceSubUrl = botData.forceSubUrl;
                }
                if (botData.forceSubChatId) {
                    this.forceSubChatId = botData.forceSubChatId;
                }
                console.log("setupped everything");
                console.log("botURl:   ", this.botUrl);
                console.log("publicchannelname:   ", this.publicChannelUname);
                console.log("contact:   ", this.contactAdmin);
                console.log("powering group:   ", this.poweringGroupLog);
                console.log("fileLOG:   ", this.fileLog);
                console.log("upiId:   ", this.upiId);
                console.log("DONEEEEEEEEEEEEEEEEEE");
                console.log(botData);
            }
            catch (error) {
                console.log("error in startEngine..");
                throw new Error("crashing due to error in startENGINE");
            }
        });
    }
    getCurrentISTTime() {
        return __awaiter(this, void 0, void 0, function* () {
            const timeZone = "Asia/Kolkata"; // IST timezone
            const zonedTime = (0, date_fns_tz_1.toZonedTime)(new Date(), timeZone); // Convert UTC time to IST
            const currentISTTime = (0, date_fns_1.format)(zonedTime, "yyyy-MM-dd HH:mm:ss");
            return currentISTTime;
        });
    }
    listener() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.on("callbackQuery:data", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                const userId = ctx.callbackQuery.from.id;
                const callBackData = ctx.callbackQuery.data;
                const callBackDataId = ctx.callbackQuery.id;
                const msgId = Number((_a = ctx.callbackQuery.message) === null || _a === void 0 ? void 0 : _a.id);
                const chatId = Number((_b = ctx.callbackQuery.message) === null || _b === void 0 ? void 0 : _b.chat.id);
                const chatTitle = ctx.callbackQuery.message.chat.title;
                console.log(callBackData);
                if (callBackData.startsWith("STREAM")) {
                    try {
                        console.log("coes under callstr");
                        const file = ctx.msg.document || ctx.msg.video || undefined;
                        if (!file) {
                            yield ctx.answerCallbackQuery("NOT a PROPER FILE", {
                                alert: true,
                            });
                            return;
                        }
                        const streamWebHook = "-1001838739662";
                        let temp;
                        try {
                            temp = yield this.client.sendDocument(streamWebHook, file.fileId);
                        }
                        catch (error) {
                            temp = yield this.client.sendVideo(streamWebHook, file.fileId);
                            console.log("Sending error whem sending file for stream:::", error);
                        }
                        finally {
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                let url = yield this.client.getMessage(streamWebHook, Number(temp.id) + 1);
                                if (!url.text) {
                                    url = yield this.client.getMessage(streamWebHook, Number(temp.id) + 2);
                                }
                                const hash = String(crypto.randomUUID().replace(/-/g, "_"));
                                console.log(hash);
                                yield (0, server_1.setupCaches)(hash, url.text);
                                yield ctx.reply("YOUR STREAMING LINK:::", {
                                    replyMarkup: {
                                        inlineKeyboard: [
                                            [
                                                {
                                                    text: "Watch ONLINE",
                                                    url: `http://109.123.237.36:4000/stream/public/${hash}`,
                                                },
                                            ],
                                        ],
                                    },
                                });
                                return;
                            }), 1000);
                        }
                    }
                    catch (error) {
                        console.log("error in callbackSTREAN:::", error);
                    }
                }
                if (callBackData.startsWith("POST")) {
                    try {
                        const data = callBackData.split("-");
                        console.log(ctx);
                        const url = data[1];
                        const msgId = Number(data[2]);
                        const Data = yield this.client.getMessage(chatId, msgId);
                        // const num: string = data[2]
                        console.log(Data);
                        const aud = (_c = Data.text) !== null && _c !== void 0 ? _c : undefined;
                        const audio = aud.split("/")[3];
                        const imdbDetails = yield (0, movier_1.getTitleDetailsByIMDBId)(url);
                        const genre = imdbDetails.genres
                            .map((g) => g.charAt(0).toUpperCase() + g.slice(1).toLowerCase())
                            .join(" - ") || "NA";
                        //  console.log(genre)
                        //  console.log(ctx)
                        // console.log(imdbDetails)
                        const dataNameLink = imdbDetails.name
                            .replace(/\s+/g, "_") // Replace spaces with underscores
                            .replace(/[^a-zA-Z0-9_]/g, "");
                        let temp;
                        if (!imdbDetails.posterImage.url) {
                            temp = yield this.client.sendPhoto(this.postingChannel, this.upiImage, {
                                caption: `🎬 <b>Title :</b>  ${imdbDetails.name}\n\n🌟 <b>Ratings :</b>  ${imdbDetails.allRates[0].rate}\n\n🎭 <b>Genre :</b>  ${genre}\n\n📆 <b>Release :</b>${imdbDetails.titleYear}\n\n🔘 <b>Bot : @${this.botUname}</b> \n\n🎙️ <b>Language : ${audio}</b>\n\n ★ 𝓟𝓸𝔀𝓮𝓻𝓮𝓭 𝓫𝔂 : <a href="https://t.me/+0CIJvlEC4YQwODg0">MachiX Networks</a> \n\n👉 <b>Button Unlock 🔓: </b><a href="https://t.me/HowToUseMachiXbot">Tutorial</a>`,
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [
                                            {
                                                text: "Download",
                                                url: `${this.botUrl}${this.botUname}?start=send-${dataNameLink}`,
                                            },
                                        ],
                                    ],
                                },
                            });
                        }
                        else {
                            temp = yield this.client.sendPhoto(this.postingChannel, imdbDetails.posterImage.url, {
                                caption: `🎬 <b>Title :</b>  ${imdbDetails.name}\n\n🌟 <b>Ratings :</b>  ${imdbDetails.allRates[0].rate}\n\n🎭 <b>Genre :</b>  ${genre}\n\n📆 <b>Release :</b>${imdbDetails.titleYear}\n\n🔘 <b>Bot : @${this.botUname}</b> \n\n🎙️ <b>Language : ${audio}</b>\n\n ★ 𝓟𝓸𝔀𝓮𝓻𝓮𝓭 𝓫𝔂 : <a href="https://t.me/+0CIJvlEC4YQwODg0">MachiX Networks</a> \n\n👉 <b>Button Unlock 🔓: </b><a href="https://t.me/HowToUseMachiXbot">Tutorial</a>`,
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [
                                            {
                                                text: "Download",
                                                url: `${this.botUrl}${this.botUname}?start=send-${dataNameLink}`,
                                            },
                                        ],
                                    ],
                                },
                            });
                        }
                        yield this.client.deleteMessage(chatId, msgId);
                        yield this.client.deleteMessage(chatId, msgId + 1);
                        if (!temp.link) {
                            yield this.client.sendMessage(chatId, "POSTED...");
                        }
                        else {
                            yield this.client.sendMessage(chatId, "POSTED...", {
                                replyMarkup: {
                                    inlineKeyboard: [[{ text: "LINK..", url: temp.link }]],
                                },
                            });
                        }
                    }
                    catch (error) {
                        console.log("error in callbackPOST:::", error);
                    }
                }
                if (callBackData.startsWith("imdb")) {
                    try {
                        const data = callBackData.split("-");
                        const url = data[1];
                        const num = data[2];
                        const imdbDetails = yield (0, movier_1.getTitleDetailsByIMDBId)(url);
                        const genre = imdbDetails.genres
                            .map((g) => g.charAt(0).toUpperCase() + g.slice(1).toLowerCase())
                            .join(" - ") || "NA";
                        const collectionNumber = {
                            "0": "Exclusive",
                            "1": "Kollywood",
                            "2": "Hollywood",
                            "3": "Mollywood",
                            "4": "Webseries",
                            "5": "Tollywood",
                            "6": "Bollywood",
                        };
                        // Access the collection based on the num value
                        const collection = collectionNumber[num] || undefined;
                        if (!collection) {
                            yield ctx.answerCallbackQuery("No Valid CollectionNumber", {
                                alert: true,
                            });
                            return;
                        }
                        const dataNameLink = imdbDetails.name
                            .replace(/\s+/g, "_") // Replace spaces with underscores
                            .replace(/[^a-zA-Z0-9_]/g, ""); // Remove non-alphanumeric characters (except underscores)
                        yield ctx.replyPhoto(imdbDetails.posterImage.url, {
                            caption: `🎬 <b>Title :</b>  ${imdbDetails.name}\n\n🌟 <b>Ratings :</b>  ${imdbDetails.allRates[0].rate}\n\n🎭 <b>Genre :</b>  ${genre}\n\n📆 <b>Release :</b>${imdbDetails.titleYear}\n\n🔘 <b>Button : ${collection}</b> \n\n🎙️ <b>Language :</b>\n\n ★ 𝓟𝓸𝔀𝓮𝓻𝓮𝓭 𝓫𝔂 : <a href="https://t.me/+0CIJvlEC4YQwODg0">MachiX Networks</a> \n\n👉 <b>Button Unlock 🔓: </b><a href="https://t.me/HowToUseMachiXbot">Tutorial</a>`,
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: [
                                    [
                                        {
                                            text: "Download",
                                            url: `https://t.me/${this.inlineBot}?start=poster_${num}_${dataNameLink}`,
                                        },
                                    ],
                                    [
                                        {
                                            text: "Confirm ?",
                                            callbackData: `-poster/${num}/${imdbDetails.name}`,
                                        },
                                    ],
                                ],
                            },
                        });
                    }
                    catch (error) {
                        console.log("error in callBAck IMDB::", error);
                    }
                }
                if (callBackData.startsWith("-poster/")) {
                    try {
                        console.log("invoking poster");
                        const data = callBackData.split("/");
                        const number = data[1];
                        const fileName = data[2];
                        const file = fileName.split("_").join(" ");
                        const url = ctx.callbackQuery.message.replyMarkup.inlineKeyboard[0][0].url;
                        yield this.client.sendPhoto(this.posterChannelId, ctx.callbackQuery.message.photo.fileId, {
                            caption: ctx.callbackQuery.message.caption,
                            captionEntities: ctx.callbackQuery.message.captionEntities,
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: [
                                    [{ text: "Download 📁", url }],
                                    [{ text: `Type @${this.inlineBot} ${number} ${file}`, url }],
                                ],
                            },
                        });
                    }
                    catch (error) {
                        console.log("error in poster::", error);
                    }
                }
                if (callBackData.startsWith("freePlan")) {
                    try {
                        yield ctx.deleteMessage(msgId);
                        const isIt = yield this.mongo.isFreeTrialUsed(String(userId));
                        if (!isIt) {
                            yield this.mongo.Unlock(String(userId), this.client, undefined, true);
                            const del = yield ctx.reply("<b>Your Premium Plan Has been Activated !\n\nTill TONIGHT!</b>", {
                                parseMode: "HTML",
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                        }
                        else {
                            const del = yield ctx.reply("<b>🤣 you already used free now no more free trail. please buy subscription here are our 👉 /plan </b>", {
                                parseMode: "HTML",
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                        }
                    }
                    catch (error) {
                        console.log("error in free plan callBack:::: ", error);
                    }
                }
                if (callBackData.startsWith("Series")) {
                    try {
                        let query = callBackData.split("/");
                        query = query[1];
                        const msgId = ((_d = ctx.msg) === null || _d === void 0 ? void 0 : _d.id) || undefined;
                        //  console.log(query, msgId)
                        if (query && msgId) {
                            const msgID = yield ctx.editMessageText(msgId, "Choose The Season You Need !", {
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [
                                            {
                                                text: "Season 1",
                                                callbackData: `reQuery/${query}/S01`,
                                            },
                                            {
                                                text: "Season 6",
                                                callbackData: `reQuery/${query}/S06`,
                                            },
                                        ],
                                        [
                                            {
                                                text: "Season 2",
                                                callbackData: `reQuery/${query}/S02`,
                                            },
                                            {
                                                text: "Season 7",
                                                callbackData: `reQuery/${query}/S07`,
                                            },
                                        ],
                                        [
                                            {
                                                text: "Season 3",
                                                callbackData: `reQuery/${query}/S03`,
                                            },
                                            {
                                                text: "Season 8",
                                                callbackData: `reQuery/${query}/S08`,
                                            },
                                        ],
                                        [
                                            {
                                                text: "Season 4",
                                                callbackData: `reQuery/${query}/S04`,
                                            },
                                            {
                                                text: "Season 9",
                                                callbackData: `reQuery/${query}/S09`,
                                            },
                                        ],
                                        [
                                            {
                                                text: "Season 5",
                                                callbackData: `reQuery/${query}/S05`,
                                            },
                                            {
                                                text: "Season 10",
                                                callbackData: `reQuery/${query}/S10`,
                                            },
                                        ],
                                    ],
                                },
                            });
                            //console.log(msgID.id, 'msgID')
                            return;
                        }
                    }
                    catch (error) {
                        console.log("error in SERIES FILTER::::", error);
                    }
                }
                if (callBackData.startsWith("file")) {
                    try {
                        let data = callBackData.split("/");
                        data = yield this.mongo.sendFile(data[1]);
                        //console.log(data)
                    }
                    catch (error) {
                        console.log("eror in sending callback file:::::::", error);
                    }
                }
                if (callBackData.startsWith("reQuery/")) {
                    try {
                        const data = callBackData.split("/");
                        //console.log(data, 'datataaaaaaaa')
                        if (data.length > 2) {
                            yield ctx.deleteMessage(ctx.msg.id);
                            const queryData = {
                                query: data[1],
                                addOn: data[2],
                            };
                            yield this.queryManager(ctx, ctx.callbackQuery.from.id, queryData, ctx.msg.chat.id, ctx.callbackQuery.from.firstName, chatTitle);
                        }
                        return;
                    }
                    catch (error) {
                        console.log("error in reQuery::::::::", error);
                    }
                }
                if (callBackData.startsWith("Quality")) {
                    try {
                        const msgId = ((_e = ctx.msg) === null || _e === void 0 ? void 0 : _e.id) || undefined;
                        const data = callBackData.split("/");
                        if (!msgId) {
                            yield ctx.answerCallbackQuery({
                                text: "Some ERROR CONTACT ADMIN",
                                alert: true,
                            });
                            return;
                        }
                        const modif = yield ctx.editMessageText(Number(msgId), `< b > The Results for : ${data[1]} \n\nRequested by: ${ctx.callbackQuery.from.firstName} \n\nPowered By: ${ctx.chat.title} </b>`, {
                            replyMarkup: {
                                inlineKeyboard: [
                                    [
                                        { text: "360p", callbackData: `reQuery/${data[1]}/360p` },
                                        { text: "480p", callbackData: `reQuery/${data[1]}/480p` },
                                    ],
                                    [
                                        { text: "720p", callbackData: `reQuery/${data[1]}/720p` },
                                        { text: "1080p", callbackData: `reQuery/${data[1]}/1080p` },
                                    ],
                                    [
                                        { text: "1440p", callbackData: `reQuery/${data[1]}/1440p` },
                                        { text: "2160p", callbackData: `reQuery/${data[1]}/2160p` },
                                    ],
                                ],
                            },
                            parseMode: "HTML",
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(modif.id);
                        }), 59000);
                    }
                    catch (error) {
                        console.log("errror in Quality::::", error);
                    }
                }
                if (callBackData.startsWith("page")) {
                    try {
                        //const senderId = ctx.callbackQuery.from.id;
                        const data = callBackData.split("/");
                        if (Number(data[3]) === 0) {
                            yield ctx.answerCallbackQuery({
                                text: `You ARE IN THE FIRST PAGE !!`,
                                alert: true,
                            });
                            return;
                        }
                        console.log(data[3], "dataaaaaaaaaa");
                        if ((_h = (_g = (_f = ctx === null || ctx === void 0 ? void 0 : ctx.msg) === null || _f === void 0 ? void 0 : _f.replyToMessage) === null || _g === void 0 ? void 0 : _g.from) === null || _h === void 0 ? void 0 : _h.id) {
                            if (ctx.callbackQuery.from.id !== ctx.msg.replyToMessage.from.id) {
                                yield ctx.answerCallbackQuery({
                                    text: "Search for YOUrself Dont Distrub others Chat",
                                    alert: true,
                                });
                                return;
                            }
                        }
                        console.log(ctx.callbackQuery.from, "/", ctx.msg);
                        let markup = this.getResult(data[1], Number(data[2]), userId);
                        if (data[3] > markup.length) {
                            yield ctx.answerCallbackQuery({
                                text: `You ARE IN THE LAST PAGE!!`,
                                alert: true,
                            });
                            return;
                        }
                        // console.log(await ctx.getMessage(Number(data[2])), 'msgREFF');
                        const del = yield this.client.editMessageText(data[1], Number(data[2]), `< b > RESULTS: \n\nCurrent Page: ${Number(data[3]) + 1}\n\nThis Message Will be Deleted Automatically in 1 Minute </b>`, {
                            replyMarkup: {
                                inlineKeyboard: markup[Number(data[3])],
                            },
                            parseMode: "HTML",
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }), 59000);
                        markup[1];
                    }
                    catch (error) {
                        console.log("eror in callback pagination;;;;;;;;", error);
                    }
                }
                if (callBackData.startsWith("planIntro")) {
                    try {
                        yield this.client.deleteMessage(chatId, msgId);
                        yield ctx.replyPhoto(this.planImage, {
                            caption: this.planDescription,
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.planStartReplyMarkup(),
                            },
                        });
                    }
                    catch (error) {
                        console.log("error in callback planIntro::", error);
                    }
                }
                if (callBackData.startsWith("ADS")) {
                    try {
                        const destructure = callBackData.split("/");
                        const data = yield this.mongo.adminReport(this.isAdsOn);
                        const msgId = Number(destructure[1]);
                        const chatId = destructure[2];
                        //console.log(chatId, '/', msgId)
                        if (this.isAdsOn) {
                            console.log("turning off ads");
                            this.isAdsOn = false;
                            yield this.client.editMessageText(`${chatId}`, Number(msgId), data, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [
                                            {
                                                text: "Turn ON ADS",
                                                callbackData: `ADS/${msgId}/${chatId}`,
                                            },
                                        ],
                                    ],
                                },
                            });
                        }
                        else {
                            this.isAdsOn = true;
                            console.log("turning on ads");
                            yield this.client.editMessageText(`${chatId}`, Number(msgId), data, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [{ text: "Turn ON ADS", callbackData: `ADS/${msgId}` }],
                                    ],
                                },
                            });
                        }
                    }
                    catch (error) {
                        console.log("error in admin callback::", error);
                    }
                }
                if (callBackData.startsWith("tutorial")) {
                    try {
                        const data = callBackData.split("_");
                        const tempPool = yield this.paramsGroupPool(data[1], "tutorial", true);
                        if (tempPool) {
                            yield ctx.replyVideo(tempPool.tutorial);
                            return;
                        }
                        else {
                            if (!this.tutorialUrl) {
                                const temp = yield ctx.reply("No Tutorial Video exist");
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    yield ctx.deleteMessage(temp.id);
                                }), 5000);
                                return;
                            }
                            yield ctx.replyVideo(this.tutorialUrl, {
                                caption: "<b>This is a Default Video set FROM OWNER SIDE</b>",
                                parseMode: "HTML",
                            });
                            return;
                        }
                    }
                    catch (error) {
                        console.log("error in callback show tutorial::", error);
                    }
                }
                if (callBackData.startsWith("showBenefits")) {
                    try {
                        yield this.client.deleteMessage(chatId, msgId);
                        if (this.premiumBenefitsVideo) {
                            const send = yield ctx.replyVideo(this.premiumBenefitsVideo, {
                                caption: this.premiumBenefits,
                                parseMode: "HTML",
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield this.client.deleteMessage(chatId, send.id);
                            }), 59000);
                            return;
                        }
                        yield ctx.reply("No Premium Benefits Video set By Admin...");
                        return;
                    }
                    catch (error) {
                        console.log("error in callback show BEnefits::", error);
                    }
                }
                if (callBackData.startsWith("qr")) {
                    try {
                        console.log("invloking qr");
                        if (this.qrImage) {
                            yield this.client.deleteMessage(chatId, msgId);
                            const sentMsg = yield ctx.replyPhoto(this.qrImage, {
                                caption: this.qrCaption,
                                replyMarkup: {
                                    inlineKeyboard: markup_1.Markup.qrReplyMarkup(this.paymentScreenshotId),
                                },
                            });
                        }
                        yield ctx.answerCallbackQuery({
                            text: "No QR has Been Set By ADMIN !",
                            alert: true,
                        });
                        return;
                    }
                    catch (error) {
                        console.log("error in callback qr::", error);
                    }
                }
                if (callBackData.startsWith("upi")) {
                    try {
                        const cap = this.upiInformation(this.upiId);
                        yield this.client.deleteMessage(chatId, msgId);
                        console.log("invloking upi");
                        yield ctx.replyPhoto(this.upiImage, {
                            caption: cap,
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.upiReplyMarkup(this.paymentScreenshotId),
                            },
                        });
                    }
                    catch (error) {
                        console.log("error in callback upi::", error);
                    }
                }
                if (callBackData.startsWith("delete")) {
                    try {
                        console.log("invloking deletes");
                        yield this.client.deleteMessage(chatId, msgId);
                    }
                    catch (error) {
                        console.log("error in callback delte::", error);
                    }
                }
                if (callBackData.startsWith("plans")) {
                    try {
                        yield this.client.deleteMessage(chatId, msgId);
                        const data = callBackData.split("/");
                        // console.log(data);
                        yield ctx.replyPhoto(this.planImage, {
                            caption: this.paymentCaption(data[2]),
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.paymentMethodReplyMarkup(),
                            },
                        });
                    }
                    catch (error) {
                        console.log("error in plans:::", error);
                    }
                }
                if (callBackData.startsWith("showPlans")) {
                    yield ctx.editMessageText(msgId, this.planDescription, {
                        replyMarkup: {
                            inlineKeyboard: markup_1.Markup.planPriceReplyMarkup(this.paymentScreenshotId),
                        },
                    });
                }
            }));
            this.client.on(":newChatMembers", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                try {
                    const chatId = ctx.message.chat.id;
                    const userName = ctx.message.from.firstName || ctx.message.from.userName;
                    let channelName = ((_b = (_a = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _a === void 0 ? void 0 : _a.chat) === null || _b === void 0 ? void 0 : _b.title)
                        ? ctx.message.chat.title
                        : "Channel";
                    const newMember = ctx.message.newChatMembers[0].username;
                    //  console.log(ctx, 'newwwwwwwwwww')
                    if (newMember == this.botDetails.username) {
                        let channelName = ((_d = (_c = ctx === null || ctx === void 0 ? void 0 : ctx.message) === null || _c === void 0 ? void 0 : _c.chat) === null || _d === void 0 ? void 0 : _d.title)
                            ? ctx.message.chat.title
                            : "Channel";
                        const d = yield this.client.sendMessage(ctx.message.chat.id, this.groupAddCaption(channelName), {
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.newMemberReplyMarkup(this.publicChannelUname, this.paymentScreenshotId),
                            },
                            parseMode: "HTML",
                        });
                        console.log("added bot");
                        const chatDetails = yield ctx.getChatAdministrators(ctx.message.chat.id);
                        const ownerdata = chatDetails.filter((d) => d.status == "creator");
                        const ownerUserId = ownerdata[0].user.id;
                        // console.log(chatDetails, '////');
                        //console.log(ownerUserId)
                        yield this.mongo.newGroup(String(chatId), String(ownerUserId));
                        yield this.generateGroupPool();
                        yield this.client.sendMessage(this.poweringGroupLog, `Bot ADDED to NEW Group !!\n\nUser: ${userName}\n\nGroupName: ${channelName}\n\nGroupId: ${chatId}`);
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(d.id);
                        }), 10000);
                        return;
                    }
                    const d = yield ctx.reply(`<b>Hᴇʟʟᴏ ${userName} 😍, Aɴᴅ Wᴇʟᴄᴏᴍᴇ Tᴏ ${channelName} ❤️</b>\n\n<b>Just Send Any File Name ill SERCH Open Sourced Available files and <u>List YOU</u>.</b>`, {
                        parseMode: "HTML",
                        replyMarkup: {
                            inlineKeyboard: markup_1.Markup.groupJoinerReplyMarkup(this.paymentScreenshotId),
                        },
                    });
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(d.id);
                    }), 10000);
                    return;
                }
                catch (error) {
                    console.log("error in listener: ", error);
                }
            }));
        });
    }
    indexRounds(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("indexing invoked");
                const batchSize = 100;
                console.log("givenMssgId:", params.msgId);
                let currentTasks = params.msgId - batchSize;
                console.log("tillNeedTO: ", currentTasks);
                if (currentTasks < 0) {
                    console.log("about to finsih:::", currentTasks);
                    currentTasks = 0;
                }
                let fileArr = [];
                for (let i = params.msgId; i > currentTasks; i--) {
                    fileArr.push(i);
                }
                const messages = yield this.client.getMessages(params.channelId, fileArr);
                let finalSaved;
                const lastBatchTime = yield this.getCurrentISTTime();
                for (const message of messages) {
                    if (message.document &&
                        message.document.fileId
                    /* &&
                               (message.document.mimeType === 'video/x-matroska' || message.document.mimeType === 'video/mp4' || message.document.mimeType == 'video/x-msvideo')*/
                    ) {
                        finalSaved = message.id;
                        yield this.mongo.addFile(message.document, params.datas, params.channelId, params.channelName);
                        //await db.addFile(message.document, buttonNum, Datas);
                    }
                    else if (message.video &&
                        message.video.fileId
                    /*&&
                              (message.video.mimeType === 'video/x-matroska' || message.video.mimeType === 'video/mp4' || message.video.mimeType == 'video/x-msvideo')*/
                    ) {
                        finalSaved = message.id;
                        yield this.mongo.addFile(message.video, params.datas, params.channelId, params.channelName);
                        //await db.addFile(message.video, buttonNum, Datas);
                    }
                    else {
                        try {
                            params.datas.skip++;
                            console.log("Ignoring non-file messages...", message, "ingoreeeeeeeeeeeeeeee");
                            console.log(message, "meessafe");
                            yield this.client.forwardMessage(params.channelId, this.supportLog, message.id);
                        }
                        catch (error) {
                            if (error.errorMessage == "MESSAGE_ID_INVALID") {
                                if (finalSaved) {
                                    yield this.client.forwardMessage(params.channelId, this.indexLog, finalSaved);
                                }
                                const modified = yield params.ctx.editMessageText(params.msgToModify, `<b>Total Rounds: ${params.datas.round}\n\nSaved: ${params.datas.done}\n\nSkipped: ${params.datas.skip}\n\nLast Indexed Batch Time: ${lastBatchTime}\n<spoiler>If You Believe Your Current Time is Past Than this Atleast 5 Mins Send the Last File From the Index Log and /Index Again<spoiler></b>`, {
                                    parseMode: "HTML",
                                });
                                if (currentTasks > 0) {
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        yield this.indexRounds({
                                            datas: {
                                                done: params.datas.done,
                                                skip: params.datas.skip,
                                                round: params.datas.round++,
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
                                        parseMode: "HTML",
                                    });
                                }
                            }
                        }
                    }
                }
                console.log("going again for", params.datas.round++);
                console.log(finalSaved, "finalsabeeed");
                if (finalSaved) {
                    yield this.client.forwardMessage(params.channelId, this.indexLog, finalSaved);
                }
                const modified = yield params.ctx.editMessageText(params.msgToModify, `<b>Total Rounds: ${params.datas.round}\n\nSaved: ${params.datas.done}\n\nSkipped: ${params.datas.skip}\n\nBalance Msg Left: ${currentTasks}\n\nLast Indexed Batch Time: ${lastBatchTime}\n<spoiler>If You Believe Your Current Time is Past Than this Atleast 5 Mins Send the Last File From the Index Log and /Index Again<spoiler></b>`, {
                    parseMode: "HTML",
                });
                if (currentTasks > 0) {
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield this.indexRounds({
                            datas: {
                                done: params.datas.done,
                                skip: params.datas.skip,
                                round: params.datas.round++,
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
                        parseMode: "HTML",
                    });
                }
            }
            catch (error) {
                console.log("errorr in indexRounds::::", error);
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
                    console.error("Error:", `Status code: ${response.status}`);
                    console.log(response.headers);
                    console.log(response.statusText);
                    return [];
                }
                const data = response.data;
                console.log(data);
                if (data.status !== "success") {
                    console.error("Error:", data.message); // Access error message from JSON response
                    return [];
                }
                console.log("Shortened URL:", data.shortenedUrl);
                return [data.shortenedUrl];
            }
            catch (error) {
                console.error("Error:", error.message);
                return [];
            }
        });
    }
    commands() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.command("post", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const userID = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    console.log("25k");
                    if (!this.admin.includes(String(userID))) {
                        return;
                    }
                    const data = ctx.message.text.split("/");
                    console.log(data);
                    if (data.length !== 4) {
                        return yield ctx.reply("invalid Format");
                    }
                    let imdb = yield (0, movier_1.searchTitleByName)(data[2]);
                    if (!imdb) {
                        return yield ctx.reply("NO RESULTS FOUND !!");
                    }
                    imdb = imdb.splice(0, 7);
                    console.log("2k");
                    console.log(imdb);
                    let format = imdb.map((c, index) => {
                        // If item directly contains link, fileName, and fileSizen
                        return [
                            {
                                text: `${c.name} ${c.titleYear}`,
                                callbackData: `POST-${c.url}-${ctx.message.id}`,
                            },
                        ];
                    });
                    console.log(format);
                    yield ctx.reply(`Your Results for ${data[2]}`, {
                        replyMarkup: {
                            inlineKeyboard: format,
                        },
                    });
                }
                catch (error) {
                    console.log("error", error);
                }
            }));
            this.client.command("imdb", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const userID = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!this.admin.includes(String(userID))) {
                        return;
                    }
                    const data = ctx.message.text.split("/");
                    console.log(data, "dataaaaaa");
                    if (data.length == 4) {
                        const fileName = data[2];
                        const Number = data[3];
                        let imdb = yield (0, movier_1.searchTitleByName)(fileName);
                        console.log(imdb);
                        if (!imdb) {
                            yield ctx.reply("<b>No RESULTS FOUND !!!</b>");
                            return;
                        }
                        imdb = imdb.splice(0, 7);
                        let format = imdb.map((c, index) => {
                            // If item directly contains link, fileName, and fileSizen
                            return [
                                {
                                    text: `${c.name} ${c.titleYear}`,
                                    callbackData: `imdb-${c.url}-${Number}`,
                                },
                            ];
                        });
                        yield ctx.reply(`Your Results for ${fileName}`, {
                            replyMarkup: {
                                inlineKeyboard: format,
                            },
                        });
                    }
                    else {
                        return yield ctx.reply("Send In this Format\n\n/imdb/fileName/0");
                    }
                }
                catch (error) {
                    console.log("ERROR in IMDB:::", error);
                }
            }));
            this.client.command("bcast", (ctx) => __awaiter(this, void 0, void 0, function* () {
                try {
                }
                catch (error) { }
            }));
            this.client.command("gcast", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    const userID = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (this.admin.includes(String(userID))) {
                        const isReplied = ctx.message.replyToMessage;
                        if (!isReplied) {
                            yield ctx.reply("reply to an MSG and use COMMAND");
                            return;
                        }
                        console.log(isReplied, "isReepppp");
                        const text = isReplied.text || undefined;
                        const picture = ((_b = isReplied.photo) === null || _b === void 0 ? void 0 : _b.fileId) || undefined;
                        const caption = isReplied.caption || undefined;
                        const captionEntites = isReplied.captionEntities || undefined;
                        const entities = isReplied.entities || undefined;
                        console.log(text, "text");
                        console.log(picture, "piccture");
                        console.log(caption, "caption");
                        console.log(captionEntites, "captionEntities");
                        console.log(entities, "entities");
                        if (picture && caption && captionEntites) {
                            yield this.gcast(this.client, undefined, picture, caption, captionEntites);
                            return;
                        }
                        else if (picture && caption) {
                            yield this.gcast(this.client, undefined, picture, caption);
                            return;
                        }
                        else if (text && entities) {
                            yield this.gcast(this.client, text, undefined, undefined, entities);
                            return;
                        }
                        else if (text) {
                            yield this.gcast(this.client, text);
                            return;
                        }
                    }
                    return;
                }
                catch (error) {
                    console.log("error in gcastt:::", error);
                }
            }));
            this.client.command("set_admin", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const text = ctx.message.text;
                    const userID = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!this.admin.includes(String(userID))) {
                        return;
                    }
                    if (text == "/set_admin") {
                        yield ctx.reply("INVALID FORMAT \n\nSend in this Format: /set_admin aDMinPubLicUsErNaMe");
                    }
                    const split = text.split(" ");
                    if (split.length == 2) {
                        yield this.mongo.editBotModel(this.botToken, split[1], "contactAdmin");
                        yield this.startEngine();
                        return;
                    }
                }
                catch (error) {
                    console.log("error in set fileLOG::", error);
                }
            }));
            this.client.command("filelog", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                try {
                    const userID = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!this.admin.includes(String(userID))) {
                        return;
                    }
                    const isRepied = ctx.message.replyToMessage;
                    if (!isRepied) {
                        yield ctx.reply("forward A message from fileLog channel and Reply it with fileLog !");
                        return;
                    }
                    const isChatId = ((_c = (_b = isRepied.forwardFrom) === null || _b === void 0 ? void 0 : _b.chat) === null || _c === void 0 ? void 0 : _c.id) || undefined;
                    if (!isChatId) {
                        yield ctx.reply("no Chat id found on forward from");
                        return;
                    }
                    else {
                        yield this.mongo.editBotModel(this.botToken, String(isChatId), "fileLog");
                        yield this.startEngine();
                        let temp = yield ctx.reply("Addded");
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(temp.id);
                        }), 5000);
                        return;
                    }
                }
                catch (error) {
                    console.log("error in set fileLOG::", error);
                }
            }));
            this.client.command("qr", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    const userID = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    if (!this.admin.includes(String(userID))) {
                        return;
                    }
                    const isRepied = ctx.message.replyToMessage;
                    if (!isRepied) {
                        yield ctx.reply("Send AN Image and Reply it with QR !");
                        return;
                    }
                    const fileId = ((_b = isRepied.photo) === null || _b === void 0 ? void 0 : _b.fileId) || undefined;
                    if (!fileId) {
                        yield ctx.reply("Cant find FILEID..");
                        // console.log(fileId, 'missing fileeee iDDDD');
                        return;
                    }
                    const change = yield this.mongo.editBotModel(this.botToken, fileId, "qrFileId");
                    if (!change) {
                        yield ctx.reply(`Failed to set QR ID !}`);
                        if (this.qrImage) {
                            yield ctx.replyPhoto(this.qrImage, {
                                caption: "Your Current QR IMAGE..0",
                            });
                        }
                        return;
                    }
                    else {
                        yield ctx.reply(`QR ID SET!`);
                        yield ctx.reply(`${this.qrImage}`);
                        yield this.startEngine();
                        yield ctx.replyPhoto(String(this.qrImage), {
                            caption: "Your Current QR Image..",
                        });
                        return;
                    }
                }
                catch (error) {
                    console.log("error in set QR::", error);
                }
            }));
            this.client.command("upi", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const text = ctx.msg.text || undefined;
                    // console.log(text)
                    if (this.admin.includes(String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id)) && text) {
                        if (text == "/upi") {
                            yield ctx.reply("Send in This format /upi/yourUPIid@som");
                            return;
                        }
                        const data = text.split(" ");
                        const changeBotModel = yield this.mongo.editBotModel(this.botToken, data[1], "upiId");
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
                    console.log("error in upi:::", error);
                }
            }));
            this.client.command("commands", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const chatType = ctx.message.chat.type;
                    const commandListAdmin = `<b><u>COMMAND LIST (ADMIN only) !!</u>\n\n\n<u>QR image:</u>\n  '/set_qr' Usage:(send an Image and Reply with /set_qr)\n\n<u>Premium Benefit Video:</u>\n  '/set_benefitvideo' Usage:(send an Video and Reply with /set_benefitvideo)\n\n<u>BroadCast:</u>\n  '/bcast' Usage:(send an Text and Reply with /bcast {Coming SOoon..})\n\n<u>ForceSUB:</u>\n  '/forceSub' Usage:(send an Message from any Channel with Bot Admin and Reply with /forceSub)\n\n<u>Default Tutorial Video:</u>\n  '/tutorial' Usage:(send an Video and Reply with /tutorial)\n\n<u>Ban / UBan User:</u>\n  '/ban/NuMeRiCuSeRiD' '/uban/NuMeRiCuSeRiD'' Usage:(/ban/1585451545)\n\n<u>Index Files:</u>\n  '/index' Usage:(Forward a File from The Channel and Reply with /index)\n\n<u>Premium An USER:</u>\n  '/prime' Usage:(/prime/NuMeRiCuSERiD)\n\n</b>`;
                    const commandListUserGroup = `<b>COMMAND LIST !!\n\n<u>1) Set Shortner:</u>\n\n"<i>Create a Group and Add me Admin. and then use this Command in the Group (Owner ONlY Command)"</i>\n\n<u>Command:</u> /set_shortner/yourShortner.com/yOuRsHoRtNeRTokeNHer651255241520\n\n<u>2) Set Tutorial:</u>\n\n"<i>Create a Group and Add me Admin. and send a Video for the Group Tutorial Video then use this Command by Replying to the Video in the Group<u>(Owner ONlY Command)</u>"</i>\n\n<u>Command:</u> /set_tutorial\n\n<u>3) Plan:</u>\n\n"<i>come @${this.botUname} use this Command to <u>Check Available Plans</u>"</i>\n\n<u>Command:</u> /plan\n\n<u>4) My Plan:</u>\n\n"<i>come @${this.botUname} use this Command to <u>Check Your Current Plan</u></i>\n\n<u>Command:</u> /myPlan`;
                    if (this.admin.includes(String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id))) {
                        yield ctx.reply(commandListAdmin, {
                            parseMode: "HTML",
                        });
                        return;
                    }
                    else if (chatType == "group" ||
                        chatType == "supergroup" ||
                        chatType == "private") {
                        yield ctx.reply(commandListUserGroup, {
                            parseMode: "HTML",
                        });
                        return;
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
            this.client.command("set_qr", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    const userId = String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id);
                    const chatType = String(ctx.message.chat.type);
                    const isReplied = ((_b = ctx.message.replyToMessage) === null || _b === void 0 ? void 0 : _b.photo) || undefined;
                    if (this.admin.includes(String(userId)) && isReplied) {
                        this.qrImage = isReplied.fileId;
                        yield ctx.replyPhoto(this.qrImage, {
                            caption: "Your Current QRImage",
                        });
                        return;
                    }
                }
                catch (error) {
                    console.log("error in QR....", error);
                }
            }));
            this.client.command("set_benefitvideo", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    const userId = String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id);
                    const chatType = String(ctx.message.chat.type);
                    const isReplied = ((_b = ctx.message.replyToMessage) === null || _b === void 0 ? void 0 : _b.video) || undefined;
                    if (this.admin.includes(String(userId)) && isReplied) {
                        this.premiumBenefitsVideo = isReplied.fileId;
                        yield ctx.replyVideo(this.premiumBenefitsVideo, {
                            caption: "Your Current Video",
                        });
                    }
                }
                catch (error) {
                    console.log("error in benefit Video..", error);
                }
            }));
            this.client.command("admin", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const modify = yield ctx.reply("<i>Fetching Details</i>");
                    const data = yield this.mongo.adminReport(this.isAdsOn);
                    const chatId = String((_a = ctx.message.chat) === null || _a === void 0 ? void 0 : _a.id);
                    if (data) {
                        if (this.isAdsOn) {
                            const msg = yield ctx.editMessageText(modify.id, data, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [
                                            {
                                                text: "Switch ADS",
                                                callbackData: `ADS/${modify.id}/${chatId} `,
                                            },
                                        ],
                                    ],
                                },
                            });
                            // console.log(msg.id, 'og')
                            return;
                        }
                        else {
                            const msg = yield ctx.editMessageText(modify.id, data, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [
                                            {
                                                text: "Switch ADS",
                                                callbackData: `ADS / ${modify.id}/${chatId}`,
                                            },
                                        ],
                                    ],
                                },
                            });
                            // console.log(msg.id, 'og')
                        }
                    }
                }
                catch (error) {
                    console.log("error in Admin::;", error);
                }
            }));
            this.client.command("bcast", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const userId = String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id);
                    const chatType = String(ctx.message.chat.type);
                    const isReplied = ctx.message.replyToMessage || undefined;
                    if (this.admin.includes(userId)) {
                        if (chatType !== "private") {
                            return yield ctx.reply("Only used in PrivateChat");
                        }
                        if (!isReplied) {
                            return yield ctx.reply("Reply to Any Message with /bcast\n\nTO BROADCAST the MESSAGE to ALL USERS!");
                        }
                        yield ctx.reply("wait bro next update!!...");
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
                    console.log("error in BCAST:::: ", error);
                }
            }));
            this.client.command("forceSub", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    const userId = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    const chatId = String(ctx.message.chat.id);
                    const isReplied = ctx.message.replyToMessage || undefined;
                    if (this.admin.includes(String(userId)) &&
                        isReplied &&
                        ((_b = isReplied.forwardFrom) === null || _b === void 0 ? void 0 : _b.type) == "channel") {
                        const forceSubId = isReplied.forwardFrom.chat.id;
                        this.forceSubChatId = String(forceSubId);
                        const createInviteLink = yield this.client.createInviteLink(forceSubId);
                        console.log(createInviteLink);
                        this.forceSubUrl = createInviteLink.inviteLink;
                        if (isReplied.forwardFrom.chat.id) {
                            yield this.mongo.editBotModel(this.botToken, this.forceSubUrl, "forceSubUrl");
                            yield this.mongo.editBotModel(this.botToken, String(isReplied.forwardFrom.chat.id), "forceSubChatId");
                            yield ctx.reply("DONE");
                            yield this.startEngine();
                            return;
                        }
                        else {
                            yield ctx.reply("no chat id found");
                            return;
                        }
                    }
                    return;
                }
                catch (error) {
                    if (error.errorMessage === "CHANNEL_PRIVATE") {
                        return ctx.reply("Add Bot as Admin With All Rights !\n\nAnd Try Again");
                    }
                    console.log("error in forceSub:::", error);
                }
            }));
            this.client.command("tutorial", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    const userId = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    const chatId = String(ctx.message.chat.id);
                    const chatType = ctx.message.chat.type;
                    if (this.admin.includes(String(userId))) {
                        const isRepliedVideo = ((_b = ctx.message.replyToMessage) === null || _b === void 0 ? void 0 : _b.video) || undefined;
                        if (!isRepliedVideo) {
                            yield ctx.reply("Send to Video File and reply it with \n\n/tutorial \n\nto set Universal tutorial");
                            return;
                        }
                        this.tutorialUrl = isRepliedVideo.fileId;
                        if (!this.tutorialUrl) {
                            yield ctx.reply("cant find fileid");
                            return;
                        }
                        yield ctx.replyVideo(this.tutorialUrl);
                        const edited = yield this.mongo.editBotModel(this.botToken, this.tutorialUrl, "tutorialVideo");
                        if (!edited) {
                            yield ctx.reply("error in saving gile in botmodel");
                            return;
                        }
                        else {
                            yield this.startEngine();
                            const temp = yield ctx.reply("<b>Saved Sucess in MODEL</b>", {
                                parseMode: "HTML",
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(temp.id);
                            }), 5000);
                            return;
                        }
                    }
                    if (chatType == "private") {
                        //console.log(this.tutorialUrl, 'tutooo')
                        yield ctx.replyVideo(this.tutorialUrl);
                    }
                    else if (chatType == "supergroup" || "group") {
                        const groupDetails = yield this.paramsGroupPool(chatId, "userTutorial");
                        if (!groupDetails) {
                            if (!this.tutorialUrl) {
                                yield ctx.reply("No Tutorial Video From Admin");
                                return;
                            }
                            else {
                                yield ctx.replyVideo(this.tutorialUrl, {
                                    caption: "<b>This Group Doenst Have an Tutorial Video..\n\nSo Sent u an Default Tutorial Video From Bot Owner Side!</b>",
                                    parseMode: "HTML",
                                });
                                return;
                            }
                        }
                        yield ctx.replyVideo(groupDetails, {
                            caption: "<b>Tutorial Video of this GROUP <3</b>",
                            parseMode: "HTML",
                        });
                        return;
                    }
                    return;
                }
                catch (error) {
                    console.log("error in tutorial;;;;", error);
                }
            }));
            this.client.command("set_shortner", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const senderId = (_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id;
                    const chatId = ctx.message.chat.id;
                    const msgFrom = ctx.message.chat.type;
                    const msgId = ctx.message.id;
                    const text = ctx.message.text;
                    if (msgFrom == "private") {
                        const del = yield ctx.reply("ADD Me to Your Group and Use the Command there");
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }));
                        return;
                    }
                    if (text == "/set_shortner") {
                        const del = yield ctx.reply(`<b>Command Incomplete :(\n\nGive me a shortener website link and api along with the command !\n\nFormat:</b> /set_shortner/website.com/1f1da5c9df9a58058672ac8d8134e203b03426a1`, {
                            parseMode: "HTML",
                        });
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }), 10000);
                        return;
                    }
                    if (msgFrom == "group" || "supergroup") {
                        const groupDetails = yield ctx.getChatAdministrators();
                        console.log(groupDetails);
                        const ownerId = groupDetails.filter((m) => m.status == "creator");
                        const ownerUserId = ownerId[0].user.id;
                        //console.log(ownerUserId, '/', senderId)
                        if (ownerUserId !== senderId) {
                            const del = yield ctx.reply("unAuth only group owner can set!");
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                            return;
                        }
                        const data = text.split("/");
                        const isValidUrl = yield this.shortenUrlText(data[2], data[3], "www.instagram.com");
                        if (isValidUrl.length < 1) {
                            yield ctx.deleteMessage(msgId);
                            yield ctx.reply("<b>Invalid Url or TOKEN / CONTACT ADMIN !!</b>", {
                                replyMarkup: {
                                    inlineKeyboard: markup_1.Markup.contactAdminReplyMarkup(this.contactAdmin),
                                },
                                parseMode: "HTML",
                                protectContent: true,
                            });
                            return;
                        }
                        yield this.mongo.setShortner(String(ownerUserId), String(chatId), String(data[2]), String(data[3]));
                        yield this.generateGroupPool();
                        yield ctx.reply("<b>Congrats Your API has been ADDED!\n\nFrom now On this Group will generate Links from Your Account and Keep in Mind that a 5% ADS will be From our Side as a Part of <u>Hosting FEE of Bot</u> and As a Contribution to Open Source Application\n\n</u>Happy EARNING 💵 </u></b>\n\nuse /commands to check ur Commands (in Group)", {
                            parseMode: "HTML",
                        });
                        yield ctx.deleteMessage(msgId);
                        return;
                    }
                    return;
                }
                catch (error) {
                    console.log("error in setShortner:::", error);
                }
            }));
            this.client.command("set_tutorial", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                try {
                    const senderId = ctx.message.from.id;
                    const chatId = ctx.message.chat.id;
                    const msgFrom = ctx.message.chat.type;
                    const isRepied = ctx.message.replyToMessage || undefined;
                    const fileAvailable = ((_b = (_a = ctx.message.replyToMessage) === null || _a === void 0 ? void 0 : _a.video) === null || _b === void 0 ? void 0 : _b.fileId) || undefined;
                    //  console.log(ctx.message.replyToMessage, 'filleee')
                    if (msgFrom == "private") {
                        yield ctx.reply("ADD Me to Your Group and Use the Command there \n\nBy Replying to Any Video");
                        return;
                    }
                    if ((msgFrom == "supergroup" || "group") && fileAvailable) {
                        const groupDetails = yield ctx.getChatAdministrators(ctx.message.chat.id);
                        const ownerId = groupDetails.filter((m) => m.status == "creator");
                        const ownerUserId = String(ownerId[0].user.id);
                        if (parseInt(ownerUserId) !== parseInt(senderId)) {
                            let del = yield ctx.reply("UnAuth. Command only for Owner of the Group!");
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                            return;
                        }
                        //console.log(fileAvailable, 'filllllll')
                        yield this.mongo.setTutorial(String(ownerUserId), String(chatId), fileAvailable);
                        yield this.generateGroupPool();
                        let del = yield ctx.reply("Tutorial has Been Set!..\n\nUse /tutorial");
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(del.id);
                        }), 50000);
                        return;
                    }
                }
                catch (error) {
                    console.log("errror in setTutorial:::", error);
                }
            }));
            this.client.command("myPlan", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d;
                try {
                    yield this.mongo.isExist(String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id));
                    const isPremiumExpired = yield this.mongo.isVerified(String((_b = ctx.message.from) === null || _b === void 0 ? void 0 : _b.id));
                    if (isPremiumExpired == "notVerified") {
                        yield ctx.reply(`Hey ${((_c = ctx.message.from) === null || _c === void 0 ? void 0 : _c.firstName) || "user"},\n\nʏᴏᴜ ᴅᴏ ɴᴏᴛ ʜᴀᴠᴇ ᴀɴʏ ᴀᴄᴛɪᴠᴇ ᴘʀᴇᴍɪᴜᴍ ᴘʟᴀɴs, ɪꜰ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴛᴀᴋᴇ ᴘʀᴇᴍɪᴜᴍ ᴛʜᴇɴ ᴄʟɪᴄᴋ ᴏɴ ʙᴇʟᴏᴡ ʙᴜᴛᴛᴏɴ 👇`, {
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.myPlanReplyMarkup(),
                            },
                        });
                        return;
                    }
                    const data = yield model_1.userModel.findOne({
                        userId: String((_d = ctx.message.from) === null || _d === void 0 ? void 0 : _d.id),
                    });
                    console.log(data);
                    const del = yield ctx.reply(`You Have an Active PLAN..\n\nExpiring On: ${data.verifiedTill}`);
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(del.id);
                    }), 10000);
                    return;
                }
                catch (error) {
                    console.log("error in myPlan::::", error);
                }
            }));
            this.client.command("ban", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    console.log("triggering ban");
                    const text = ctx.message.text;
                    if (this.admin.includes(String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id))) {
                        if (text == "/ban") {
                            const d = yield ctx.reply("send in this format\n\n/ban/uSeRiD");
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(d.id);
                            }), 10000);
                            return;
                        }
                        const data = text.replace("/ban/", "");
                        yield this.mongo.changeValid(data, false);
                        yield ctx.reply(`!! Banned USER !!\n\nUserID: ${data}\n\nStaus: BANNED.`);
                    }
                    else {
                        const k = yield ctx.reply("unAuth");
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(k.id);
                        }));
                    }
                }
                catch (error) {
                    console.log("error in ban::::::", error);
                }
            }));
            this.client.command("uban", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const text = ctx.message.text;
                    if (this.admin.includes(String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id))) {
                        if (text == "/unban") {
                            const d = yield ctx.reply("send in this format\n\n/uban/uSeRiD");
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(d.id);
                            }), 10000);
                            return;
                        }
                        const data = text.replace("/uban/", "");
                        yield this.mongo.changeValid(data, true);
                        yield ctx.reply(`!! UnBanned USER !!\n\nUserID: ${data}\n\nStaus: UNBANNED.`);
                    }
                    else {
                        const k = yield ctx.reply("unAuth");
                        setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                            yield ctx.deleteMessage(k.id);
                        }));
                    }
                }
                catch (error) {
                    console.log("error in ban::::::", error);
                }
            }));
            this.client.command("send", (ctx) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = ctx.message.text;
                    const val = data.split(" ");
                    yield this.client.sendVideo(ctx.message.from.id, val[1]);
                }
                catch (error) {
                    console.log("in bug send::", error);
                }
            }));
            this.client.command("prime", (ctx) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                try {
                    const userId = String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id);
                    const vals = ctx.message.text;
                    if (this.admin.includes(userId)) {
                        if (vals == "/prime") {
                            const del = yield ctx.reply("Invalid FORMAT !! \n\nUse this Format\n\n/prime/uSeRiDoFtHeUsEr");
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 5000);
                            return;
                        }
                        const data = vals.split("/");
                        console.log(data, "prime data");
                        yield this.mongo.Unlock(data[2], this.client, Number(data[3]));
                        yield ctx.reply("ADDED PREMIUM");
                        return;
                    }
                    const del = yield ctx.reply("unAuth");
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(del.id);
                    }));
                    return;
                }
                catch (error) {
                    console.log("error in making PRIME:::", error);
                }
            }));
            this.client.command("start", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
                try {
                    const userId = String((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.id);
                    const chatId = String(ctx.message.chat.id);
                    const isExist = yield this.mongo.isExist(userId);
                    const vals = ctx.message.text;
                    console.log(ctx.message.text);
                    if (vals.startsWith(`/start@${this.botUname}`)) {
                        console.log("Added to Group");
                        next();
                    }
                    if (vals.startsWith("/start send")) {
                        try {
                            const fileName = vals.split("-")[1];
                            console.log(fileName);
                            const destructureFileName = fileName.split("_").join(" ");
                            yield this.queryManager(ctx, Number((_b = ctx.message.from) === null || _b === void 0 ? void 0 : _b.id), { query: destructureFileName }, ctx.message.chat.id, ((_c = ctx.message.from) === null || _c === void 0 ? void 0 : _c.firstName) || "USER", "SINGLE X MACHI");
                            console.log(destructureFileName);
                        }
                        catch (error) {
                            console.log("error in startSend:::", error);
                        }
                    }
                    if (vals.startsWith("/start hash_")) {
                        let data = vals.split("_");
                        const hash = data[1];
                        const pool = this.poolExist(hash);
                        if (!pool) {
                            yield ctx.reply("DONT TRY TO SMART AND BYPASS !");
                            return;
                        }
                        yield this.mongo.Unlock(userId);
                        const del = yield ctx.reply("<b>You are Unlocked Till Today ENJOY</b>", {
                            parseMode: "HTML",
                        });
                        let del1;
                        try {
                            let capt = "💬   🗨️   ➤   💬\n\nThis File WIll be Deleted in 1 Min to keep it permanent forward the file to Other Chat";
                            yield (0, sendFile_1.sendContent)(ctx, this.client, this.isAdsOn, pool.fileId, capt);
                        }
                        catch (error) {
                            console.log("error in startHash::", error);
                        }
                        finally {
                            yield ctx.reply(this.supportMessage, {
                                parseMode: "HTML",
                                replyMarkup: {
                                    inlineKeyboard: [
                                        [{ text: "JOIN ALL 🥺", url: this.supportChatLink }],
                                    ],
                                },
                            });
                            yield this.fileLogs(this.client, {
                                userId,
                                userName: ((_d = ctx.message.from) === null || _d === void 0 ? void 0 : _d.firstName) || "USER",
                                fileName: pool.fileName,
                                fileSize: del1.document.fileSize || del1.video.fileSize,
                            });
                            setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                yield ctx.deleteMessage(del.id);
                            }), 4000);
                            if (!del1) {
                                return;
                            }
                            else {
                                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                    yield ctx.deleteMessage(del1.id);
                                }), 59000);
                                return;
                            }
                        }
                    }
                    if (vals.startsWith("/start file_")) {
                        console.log("comes here");
                        const match = vals.match(/^\/start file_(.*)_(.*)$/);
                        if (match) {
                            const fileId = match[1]; // Contains the file ID part
                            const chatId = match[2]; // Contains the chat ID part
                            const uniqueId = fileId;
                            let fileData = yield this.mongo.sendFile(uniqueId);
                            //  const fileType = fileData.fileMimeType]
                            const user = yield this.mongo.isExist(userId);
                            const isVerified = yield this.mongo.isVerified(userId);
                            if (isVerified == "ban") {
                                yield ctx.reply("YOU ARE BANNED BY OUR TEAM !!\n\nContact: Admin", {
                                    replyMarkup: {
                                        inlineKeyboard: markup_1.Markup.bannedReplyMarkup(this.paymentScreenshotId),
                                    },
                                });
                                return;
                            }
                            const hash = crypto.randomUUID();
                            const endPoint = `https://t.me/${this.botUname}?start=hash_${hash}`;
                            const isPower = yield this.paramsGroupPool(String(chatId), "userPowering", true);
                            console.log(isPower, "isPowerrrrrrrrrrrrrrr");
                            let shortenedUrl;
                            let tutorialUrl;
                            if (!isPower) {
                                shortenedUrl = yield this.shortenUrlText(this.apiUrl, this.apiToken, endPoint);
                                tutorialUrl = this.tutorialUrl;
                            }
                            else {
                                const underTax = this.percentagePartition();
                                if (!underTax) {
                                    tutorialUrl = isPower.tutorial
                                        ? isPower.tutorial
                                        : this.tutorialUrl;
                                    shortenedUrl = yield this.shortenUrlText(isPower.userApi, isPower.userApiToken, endPoint);
                                }
                                else {
                                    tutorialUrl = this.tutorialUrl;
                                    shortenedUrl = yield this.shortenUrlText(this.apiUrl, this.apiToken, endPoint);
                                }
                            }
                            console.log(isVerified, "/", fileData, "/", shortenedUrl.length, "/////////");
                            if (isVerified == "notVerified" &&
                                fileData &&
                                shortenedUrl.length > 0 &&
                                this.isAdsOn) {
                                const shortUrl = String(shortenedUrl[0]);
                                if (tutorialUrl) {
                                    let pool = this.addPool(String((_e = ctx.message.from) === null || _e === void 0 ? void 0 : _e.id), hash, endPoint, shortUrl, fileData.fileId, tutorialUrl, fileData.fileName);
                                    console.log(pool, "pool");
                                    if (this.admin.includes(userId)) {
                                        yield ctx.reply(`🫂 ʜᴇʏ.. ${((_f = ctx.message.from) === null || _f === void 0 ? void 0 : _f.firstName) || "user"}\n\n✅ ʏᴏᴜʀ ʟɪɴᴋ ɪꜱ ʀᴇᴀᴅʏ, ᴋɪɴᴅʟʏ ᴄʟɪᴄᴋ ᴏɴ ᴅᴏᴡɴʟᴏᴀᴅ ʙᴜᴛᴛᴏɴ.\n\n⚠️ ꜰɪʟᴇ ɴᴀᴍᴇ : ${fileData.fileName}\n\n📥 ꜰɪʟᴇ ꜱɪᴢᴇ : ${fileData.fileSize}\n\n\n<pre>This is a One Day Unlock Link. Once Unlocked 1 Day Unlimited Files Can be Taken For FREE!</pre>`, {
                                            replyMarkup: {
                                                inlineKeyboard: [
                                                    [
                                                        {
                                                            text: "Unlock Now & Download!",
                                                            url: pool.shortUrl,
                                                        },
                                                    ],
                                                    [{ text: "Bypassed URL", url: pool.url }],
                                                    [
                                                        {
                                                            text: "Tutorial Video!",
                                                            callbackData: `tutorial_${chatId}`,
                                                        },
                                                    ],
                                                    [
                                                        {
                                                            text: `Buy Subscription | Remove AD's`,
                                                            callbackData: "planIntro",
                                                        },
                                                    ],
                                                ],
                                            },
                                            parseMode: "HTML", // Specify HTML mode
                                        });
                                    }
                                    else {
                                        yield ctx.reply(`🫂 ʜᴇʏ.. ${((_g = ctx.message.from) === null || _g === void 0 ? void 0 : _g.firstName) || "user"}\n\n✅ ʏᴏᴜʀ ʟɪɴᴋ ɪꜱ ʀᴇᴀᴅʏ, ᴋɪɴᴅʟʏ ᴄʟɪᴄᴋ ᴏɴ ᴅᴏᴡɴʟᴏᴀᴅ ʙᴜᴛᴛᴏɴ.\n\n⚠️ ꜰɪʟᴇ ɴᴀᴍᴇ : ${fileData.fileName}\n\n📥 ꜰɪʟᴇ ꜱɪᴢᴇ : ${fileData.fileSize}`, {
                                            replyMarkup: {
                                                inlineKeyboard: [
                                                    [
                                                        {
                                                            text: "Unlock Now & Download!",
                                                            url: pool.shortUrl,
                                                        },
                                                    ],
                                                    //    [{ text: 'Bypassed URL', url: pool.url }],
                                                    [
                                                        {
                                                            text: "Tutorial Video!",
                                                            callbackData: `tutorial_${chatId}`,
                                                        },
                                                    ],
                                                    [
                                                        {
                                                            text: `Buy Subscription | Remove AD's`,
                                                            callbackData: "planIntro",
                                                        },
                                                    ],
                                                ],
                                            },
                                        });
                                    }
                                    return;
                                }
                                else {
                                    let pool = this.addPool(String((_h = ctx.message.from) === null || _h === void 0 ? void 0 : _h.id), hash, endPoint, shortUrl, fileData.fileId, tutorialUrl, fileData.fileName);
                                    if (this.admin.includes(userId)) {
                                        yield ctx.reply(`🫂 ʜᴇʏ.. ${((_j = ctx.message.from) === null || _j === void 0 ? void 0 : _j.firstName) || "user"}\n\n✅ ʏᴏᴜʀ ʟɪɴᴋ ɪꜱ ʀᴇᴀᴅʏ, ᴋɪɴᴅʟʏ ᴄʟɪᴄᴋ ᴏɴ ᴅᴏᴡɴʟᴏᴀᴅ ʙᴜᴛᴛᴏɴ.\n\n⚠️ ꜰɪʟᴇ ɴᴀᴍᴇ : ${fileData.fileName}\n\n📥 ꜰɪʟᴇ ꜱɪᴢᴇ : ${fileData.fileSize}`, {
                                            replyMarkup: {
                                                inlineKeyboard: [
                                                    [
                                                        {
                                                            text: "Unlock Now & Download!",
                                                            url: pool.shortUrl,
                                                        },
                                                    ],
                                                    [{ text: "Bypassed URL", url: pool.url }],
                                                    ///[{ text: 'Tutorial Video!', callbackData: `tutorial_${chatId}` }],
                                                    [
                                                        {
                                                            text: `Buy Subscription | Remove AD's`,
                                                            callbackData: "planIntro",
                                                        },
                                                    ],
                                                ],
                                            },
                                        });
                                    }
                                    else {
                                        yield ctx.reply(`🫂 ʜᴇʏ.. ${((_k = ctx.message.from) === null || _k === void 0 ? void 0 : _k.firstName) || "user"}\n\n✅ ʏᴏᴜʀ ʟɪɴᴋ ɪꜱ ʀᴇᴀᴅʏ, ᴋɪɴᴅʟʏ ᴄʟɪᴄᴋ ᴏɴ ᴅᴏᴡɴʟᴏᴀᴅ ʙᴜᴛᴛᴏɴ.\n\n⚠️ ꜰɪʟᴇ ɴᴀᴍᴇ : ${fileData.fileName}\n\n📥 ꜰɪʟᴇ ꜱɪᴢᴇ : ${fileData.fileSize}`, {
                                            replyMarkup: {
                                                inlineKeyboard: [
                                                    [
                                                        {
                                                            text: "Unlock Now & Download!",
                                                            url: pool.shortUrl,
                                                        },
                                                    ],
                                                    //    [{ text: 'Bypassed URL', url: pool.url }],
                                                    ///[{ text: 'Tutorial Video!', callbackData: `tutorial_${chatId}` }],
                                                    [
                                                        {
                                                            text: `Buy Subscription | Remove AD's`,
                                                            callbackData: "planIntro",
                                                        },
                                                    ],
                                                ],
                                            },
                                        });
                                    }
                                    return;
                                }
                                return;
                            }
                            else if ((!this.isAdsOn || isVerified) &&
                                fileData &&
                                shortenedUrl.length > 0) {
                                let data = vals.split("_");
                                const hash = data[1];
                                const caption = markup_1.Markup.FileCaption(fileData);
                                let del;
                                try {
                                    yield (0, sendFile_1.sendContent)(ctx, this.client, this.isAdsOn, fileData.fileId, caption);
                                    return;
                                }
                                catch (error) {
                                    console.log("error when sendinf as video", error);
                                }
                                finally {
                                    console.log(del, "deeeeeellllll");
                                    yield this.fileLogs(this.client, {
                                        userId,
                                        userName: ((_l = ctx.message.from) === null || _l === void 0 ? void 0 : _l.firstName) || "USER",
                                        fileName: del.document.fileName || del.video.fileName,
                                        fileSize: del.document.fileSize || del.document.fileSize,
                                    });
                                }
                                if (!del) {
                                    return;
                                }
                                else {
                                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                                        yield ctx.deleteMessage(del.id);
                                    }), 59000);
                                    del;
                                    return;
                                }
                            }
                        }
                        else {
                            console.log("un behabioured user....");
                        }
                    }
                    if (vals == "/start") {
                        const name = ((_m = ctx.message.from) === null || _m === void 0 ? void 0 : _m.firstName) || "User";
                        console.log("comes under start");
                        yield ctx.reply(this.startCaption(name), {
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.introReplyMarkup(String(this.botUname), this.publicChannelUname),
                            },
                        });
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
            this.client.command("plan", (ctx) => __awaiter(this, void 0, void 0, function* () {
                yield ctx.replyPhoto(this.planImage, {
                    caption: this.planDescription,
                    replyMarkup: {
                        inlineKeyboard: markup_1.Markup.planStartReplyMarkup(),
                    },
                });
            }));
        });
    }
    fileCloner(client, fileId, DumpId, caption) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield client.sendDocument(DumpId, fileId, {
                    caption,
                });
            }
            catch (error) {
                console.log("error in file cloner::: ", error);
                yield client.sendVideo(DumpId, fileId, {
                    caption,
                });
            }
        });
    }
    fileSaver() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.on("message", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    if (ctx.message.chat.id == "-1001838739662") {
                        return;
                    }
                    const chatType = ctx.message.chat.type;
                    console.log(chatType);
                    console.log("getting");
                    console.log(this.fileLog, "/", ctx.message.chat.id);
                    if (this.fileLog.includes(String(ctx.message.chat.id))) {
                        console.log("from filelog");
                        if (ctx.message &&
                            ((ctx.message.document && ctx.message.document.fileId) ||
                                (ctx.message.video && ctx.message.video.fileId))) {
                            const data = ctx.message.document || ctx.message.video;
                            console.log(data, "dataaaaa");
                            //     console.log(ctx)
                            yield this.mongo.addFile(data, undefined, ctx.message.chat.id, ctx.message.chat.title);
                            // await this.fileCloner(this.client, data.fileId, this.dumpChannelId, data.caption)
                            return;
                        }
                    }
                    else if (ctx.message.chat.type == "private" &&
                        ctx.message.chat.isBot) {
                        console.log("spamming private");
                        yield ctx.reply(this.startCaption(ctx.message.from.firstName || "USER"), {
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.introReplyMarkup(String(this.botUname), this.publicChannelUname),
                            },
                        });
                        return;
                    }
                    else {
                        console.log("some Query initiating next");
                        next();
                    }
                }
                catch (error) {
                    console.log("error in fileSave...", error);
                }
            }));
        });
    }
    groupManager() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client.on("message:text", (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                try {
                    console.log("msg comes under groupManager");
                    const firstName = ((_a = ctx.message.from) === null || _a === void 0 ? void 0 : _a.firstName) || "user";
                    const msgId = ctx.message.id;
                    const userId = (_b = ctx.message.from) === null || _b === void 0 ? void 0 : _b.id;
                    const chatId = ctx.message.chat.id;
                    if (String(chatId) === "-1001838739662") {
                        return;
                    }
                    const typeMedium = ctx.message.chat.type;
                    const text = ctx.message.text;
                    if ((typeMedium == "group" || typeMedium == "supergroup") &&
                        !text.startsWith("/")) {
                        const query = {
                            query: text,
                            addOn: "",
                        };
                        yield this.queryManager(ctx, Number(userId), query, chatId, firstName, ctx.message.chat.title);
                    }
                    else if (typeMedium == "private") {
                        yield ctx.reply(this.startCaption(((_c = ctx.message.from) === null || _c === void 0 ? void 0 : _c.firstName) || "USER"), {
                            parseMode: "HTML",
                            replyMarkup: {
                                inlineKeyboard: markup_1.Markup.introReplyMarkup(String(this.botUname), this.publicChannelUname),
                            },
                        });
                        return;
                    }
                }
                catch (error) {
                    console.log(error);
                }
            }));
        });
    }
    queryManager(ctx, userId, Query, chatId, firstName, chatTitle) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let query = Query.addOn ? `${Query.query} ${Query.addOn}` : Query.query;
                let exist;
                if (this.forceSubChatId) {
                    exist = yield this.isForceSub(this.forceSubChatId, userId);
                }
                let editedMsg;
                console.log(exist, "/", this.forceSubUrl, "existtttttttttttttt");
                if (!exist && this.forceSubUrl) {
                    editedMsg = yield ctx.reply("<b>Hey Hey Heyyy..\n\nYou Need to JOIN my Channel to USE ME!😜\n\n Join My Channel to Use ME! and Type Again .</b>", {
                        parseMode: "HTML",
                        replyMarkup: {
                            inlineKeyboard: markup_1.Markup.forceSubReplyMarkup(this.forceSubUrl),
                        },
                    });
                    return setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(editedMsg.id);
                    }), 59000);
                }
                editedMsg = yield ctx.reply(`<b>Searching for "${query}"... </b>`, {
                    parseMode: "HTML",
                    protectContent: "true",
                });
                const file = yield this.mongo.isFileExist(query);
                if (file.length > 0) {
                    const fileAsReplyMarkup = this.savingReplyMarkup(Query.query, file, 8, String(chatId), editedMsg.id, userId);
                    editedMsg = yield ctx.editMessageText(editedMsg.id, `𝙏𝙝𝙚 𝙍𝙚𝙨𝙪𝙡𝙩 𝙛𝙤𝙧: ${query}\n\nTotal: ${fileAsReplyMarkup.length}\n\n𝙍𝙚𝙦𝙪𝙚𝙨𝙩 𝘽𝙮: ${firstName}\n\n𝙋𝙤𝙬𝙚𝙧𝙚𝙙 𝘽𝙮: ${chatTitle}\n\n<b>!! This Message will be Deleted in 1 Min !!</b>`, {
                        parseMode: "HTML",
                        replyMarkup: {
                            inlineKeyboard: fileAsReplyMarkup[0],
                        },
                    });
                }
                else if (file.length == 0) {
                    editedMsg = yield ctx.editMessageText(editedMsg.id, `𝙎𝙤𝙧𝙧𝙮 𝙉𝙤 𝙁𝙞𝙡𝙚𝙨 𝙒𝙚𝙧𝙚 𝙁𝙤𝙪𝙣𝙙 : ${query}\n\n𝘾𝙝𝙚𝙘𝙠 𝙔𝙤𝙪𝙧 𝙎𝙥𝙚𝙡𝙡𝙞𝙣𝙜 𝙞𝙣 𝙂𝙤𝙤𝙜𝙡𝙚 𝙖𝙣𝙙 𝙏𝙧𝙮 𝘼𝙜𝙖𝙞𝙣 !!`, {
                        replyMarkup: {
                            inlineKeyboard: [
                                [
                                    {
                                        text: "🔎 𝗤𝘂𝗶𝗰𝗸 𝗚𝗼𝗼𝗴𝗹𝗲 𝗦𝗲𝗮𝗿𝗰𝗵 🔍",
                                        url: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
                                    },
                                ],
                            ],
                        },
                    });
                }
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield ctx.deleteMessage(editedMsg.id);
                    this.deleteResponse(String(chatId), userId, editedMsg.id);
                }), 59000 + 59000);
            }
            catch (error) {
                console.log("errorr in query manager:::::::::::::", error);
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
                if (error.message === "400: CHANNEL_INVALID (channels.getChannels)") {
                    throw new Error("ADd button to Force SUb channel... reason: channel private");
                }
                console.log("errror on isForceSub:::", error.message);
            }
        });
    }
    // private userplanCaption(name: string,)
    startCaption(name) {
        return `👋 Hey ${name} , <b>GOOD DAY</b>  ⚡️\n\n🤗 Welcome to  Open Source Advance Filter bot.\n\n🤖 I Can Send you Direct Files by searching OpenLy Available Datas. \n\n📁 Add Me to a Group First and Send Me Any File Name on the <b><u>GROUP</u></b>`;
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
                    if (typeof value === "function")
                        return undefined;
                    return value;
                }, 2); // Pretty-print with 2 spaces
                // Write the JSON string to a file
                fs.writeFileSync(`${name}.json`, ctxJson, "utf8"); // Corrected quote here
                console.log("Context saved to", `${name}.json`);
            }
            catch (error) {
                console.log("Error in captureCtx", error);
            }
        });
    }
}
exports.Bot = Bot;
