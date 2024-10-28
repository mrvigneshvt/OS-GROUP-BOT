import { Bot } from "./bot";
import express, { Request, Response } from 'express'

const app = express();

app.listen(4000, () => console.log('port opned 4000'))


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
        await bot.commands();
        await setUpServer()
        await bot.indexEngine()
        await bot.fileSaver();
        await bot.groupManager();


    } catch (error) {
        console.log('error in server.ts', error)

        throw new Error('Initialization Failed..!!');
    }
}

)()

async function setUpServer() {
    try {
        app.post('/api/query/:filename/:offset', async (req: Request, res: Response) => {
            try {

                let { filename } = req.params;
                let offset = Number(req.params.offset);

                console.log(filename, 'fill')
                await bot.ApiRequest(filename, req, res, 5, offset)


            } catch (error) {
                console.log('error in setUP Server::: ', error)
            }
        })
    } catch (error) {
        console.log('error in setUp server..', error)
    }
}


export default bot

