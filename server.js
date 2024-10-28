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
const bot_1 = require("./bot");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.listen(4000, '0.0.0.0', () => console.log('port opned 4000'));
app.use((0, cors_1.default)());
const apiId = 23383641;
const apiHash = 'bc082e6638c170d35479798f8c8eaa6f';
const botToken = '7503916985:AAG9h6PjaiVVDj2Gl7sZI-OhfG_Gpa0poXA';
//'6843349739:AAF6Ymf-7_WsyNQ7uAgOSeN9E50Dk6lfHnE'
const mongoUri = 'mongodb+srv://admin:admin@cluster0.8xj6euc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
let bot = new bot_1.Bot({
    apiId,
    apiHash,
    mongoUri,
    botToken
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // await bot.getCurrentISTTime()
        yield bot.start();
        yield bot.generateGroupPool();
        yield bot.listener();
        yield bot.commands();
        yield setUpServer();
        yield bot.indexEngine();
        yield bot.fileSaver();
        yield bot.groupManager();
    }
    catch (error) {
        console.log('error in server.ts', error);
        throw new Error('Initialization Failed..!!');
    }
}))();
function setUpServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.post('/api/query/:filename/:offset', (req, res) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let { filename } = req.params;
                    let offset = Number(req.params.offset);
                    console.log(filename, 'fill');
                    yield bot.ApiRequest(filename, req, res, 5, offset);
                }
                catch (error) {
                    console.log('error in setUP Server::: ', error);
                }
            }));
        }
        catch (error) {
            console.log('error in setUp server..', error);
        }
    });
}
exports.default = bot;
