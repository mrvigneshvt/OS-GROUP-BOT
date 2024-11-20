import { Client , Context} from "@mtkruto/node"

export async function sendFile(ctx: any,client:Client , ads: boolean, fileId: String,cap:String){
    try {
        if(!ads){
            let temp ;
            try{
                temp = await ctx.replyDocument(fileId,{
                    caption: cap,
                    parseMode: 'HTML',
                })
    
                return
            }catch(err){
                temp = await ctx.replyVideo(fileId,{
                    caption:cap,
                    parseMode: 'HTML',

                })

                return
            }finally{
                console.log(temp);

                await ctx.deleteMessage(temp.id)
               // await client.deleteMessage()
               return
            }
           
        }

        let temp1;

        try {

           temp1 =  await ctx.replyDocument(fileId,{
                caption: cap,
                parseMode: 'HTML',
                replyMarkup: {
                    inlineKeyboard: [
                        [{text: "Watch Online :)",callbackData: 'STREAM'}]
                    ]
                }
            })
            
        } catch (error) {
            
            temp1 = await ctx.replyVideo(fileId,{
                caption: cap,
                parseMode: 'HTML',
                replyMarkup: {
                    inlineKeyboard: [
                        [{text: "Watch Online :)",callbackData: 'STREAM'}]
                    ]
                }
            })
        }finally{
            console.log(temp1)
            await ctx.deleteMessage(temp1.id)

           // await client.deleteMessage()
        }





    } catch (error) {
        console.log('error in sendFile:::: ', error)
    }
}