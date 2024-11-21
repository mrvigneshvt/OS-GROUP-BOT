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

const mongoUri = 'mongodb+srv://admin:admin@cluster0.8xj6euc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


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
                console.log('gettimg get req')
                if(localCache[hash]){
                    console.log('cache availavle')
                    console.log(localCache)

                    const streamUrl = localCache[hash]

                    const htmlContent = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Streaming Landing Page</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            text-align: center;
                            padding: 20px;
                        }
                        button {
                            padding: 10px 20px;
                            margin: 10px;
                            font-size: 16px;
                            cursor: pointer;
                        }
                        #copyMessage {
                            margin-top: 10px;
                            color: green;
                            font-size: 14px;
                        }
                    </style>
                </head>
                <body>
                    <h1>Streaming Landing Page</h1>
                    <p>Click below to either play the stream in VLC or copy the stream URL.</p>
                    
                    <!-- Button to play in VLC -->
                    <button onclick="playInVLC()">Play in VLC</button>
                    
                    <!-- Button to copy stream URL -->
                    <button onclick="copyStreamURL()">Copy Stream URL</button>
                    
                    <p id="copyMessage"></p>

                    <script>
                        function playInVLC() {
                            // Open the stream URL in VLC (assuming VLC is installed)
                            const streamUrl = "${streamUrl}";
                            window.open("vlc://" + streamUrl);
                        }

                        function copyStreamURL() {
                            const streamUrl = "${streamUrl}";
                            const textarea = document.createElement('textarea');
                            textarea.value = streamUrl;
                            document.body.appendChild(textarea);
                            textarea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textarea);
                            document.getElementById('copyMessage').textContent = 'Stream URL copied to clipboard!';
                        }
                    </script>
                </body>
                </html>
            `;

            // Send the HTML response
            res.send(htmlContent);


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


