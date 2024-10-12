import { Bot } from "./bot";


const apiId = 23383641;
const apiHash = 'bc082e6638c170d35479798f8c8eaa6f'
const botToken = '7503916985:AAG9h6PjaiVVDj2Gl7sZI-OhfG_Gpa0poXA';
//'6843349739:AAF6Ymf-7_WsyNQ7uAgOSeN9E50Dk6lfHnE'

const mongoUri = 'mongodb+srv://admin:admin@cluster0.8xj6euc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

let bot = new Bot({
    apiId,
    apiHash,
    mongoUri,
    botToken
});

(async () => {
    try {
        // await bot.getCurrentISTTime()
        await bot.start();
        await bot.generateGroupPool()
        await bot.listener();
        await bot.groupManager();
        await bot.commands();
        await bot.indexEngine()
        await bot.fileSaver();

    } catch (error) {
        console.log('error in server.ts', error)

        throw new Error('Initialization Failed..!!');
    }
}

)()


export default bot

