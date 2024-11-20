import { Bot } from "./bot";
import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express();

app.listen(4000, '0.0.0.0', () => console.log('port opned 4000'));
app.use(cors());


const apiId = 23383641;
const apiHash = 'bc082e6638c170d35479798f8c8eaa6f'
const botToken = '7910305056:AAHCSyoS9lMMoxgfYaBqMBJVEWWCNWbpif0';
//'6843349739:AAF6Ymf-7_WsyNQ7uAgOSeN9E50Dk6lfHnE'

const mongoUri = 'mongodb+srv://admin:admiAn@cluster0.8xj6euc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


export let bot = new Bot({
    apiId,
    apiHash,
    mongoUri,
    botToken
});

(async () => {
    try {
        // await bot.getCurrentISTTime()
        await bot.start();
        await setUpServer()
        await bot.generateGroupPool()
        await bot.listener();
        await bot.commands();
        await bot.indexEngine()
        await bot.fileSaver();
        await bot.groupManager();


    } catch (error) {
        console.log('error in server.ts', error)

        throw new Error('Initialization Failed..!!');
    }
}

)()

let localCache: { [key: string]: string } = {};  // Type definition for the cache

export async function setupCaches(hash: string, url: string) {
    try {
        // Correctly assigning the url value to the cache object
        localCache[hash] = url;
        console.log(localCache);
    } catch (error) {
        console.log('error in setupCache::', error);
    }
}

async function setUpServer() {
    try {
        app.post('/api/query/:filename/:offset', async (req: Request, res: Response) => {
            try {

                let { filename } = req.params;
                let offset = Number(req.params.offset);

                console.log(filename, 'fill')
                await bot.ApiRequest(filename, req, res, 5, offset);

            } catch (error) {
                console.log('error in query Server::: ', error)
            }
        })

        app.get("/stream/public/:hashValue",async(req,res)=>{
            try{
                const hash = req.params.hashValue
                if(localCache[hash]){
                    console.log('cache availavle')
                    console.log(localCache)
                }else{
                    console.log('no cache found')
                }
            }catch(error){
                console.log('error in streamServer')
            }
        })

        app.post('/api/uniqueHash/:uniqueId', async (req: Request, res: Response) => {
            try {
                let { uniqueId } = req.params;

                await bot.ApiStream(uniqueId, req, res)


            } catch (error) {
                console.log('error in uniqueHash Server:::', error)
            }
        })
    } catch (error) {
        console.log('error in setUp server..', error)
    }
}


