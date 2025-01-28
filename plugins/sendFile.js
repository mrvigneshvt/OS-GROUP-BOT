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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendContent = sendContent;
function sendContent(ctx, client, ads, fileId, cap) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!ads) {
                let temp;
                try {
                    temp = yield ctx.replyDocument(String(fileId), {
                        caption: cap,
                        parseMode: 'HTML',
                    });
                    return;
                }
                catch (err) {
                    temp = yield ctx.replyVideo(fileId, {
                        caption: cap,
                        parseMode: 'HTML',
                    });
                    return;
                }
                finally {
                    console.log(temp);
                    setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                        yield ctx.deleteMessage(temp1.id);
                    }), 59000); // await client.deleteMessage()
                    return;
                }
            }
            let temp1;
            try {
                temp1 = yield ctx.replyDocument(fileId, {
                    caption: cap,
                    parseMode: 'HTML',
                    replyMarkup: {
                        inlineKeyboard: [
                            [{ text: "Watch Online :)", callbackData: 'STREAM' }]
                        ]
                    }
                });
            }
            catch (error) {
                temp1 = yield ctx.replyVideo(fileId, {
                    caption: cap,
                    parseMode: 'HTML',
                    replyMarkup: {
                        inlineKeyboard: [
                            [{ text: "Watch Online :)", callbackData: 'STREAM' }]
                        ]
                    }
                });
            }
            finally {
                console.log(temp1);
                setTimeout(() => __awaiter(this, void 0, void 0, function* () {
                    yield ctx.deleteMessage(temp1.id);
                }), 59000);
                // await client.deleteMessage()
            }
        }
        catch (error) {
            console.log('error in sendFile:::: ', error);
        }
    });
}
