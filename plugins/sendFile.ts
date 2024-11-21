import { Client , Context} from "@mtkruto/node"

export async function sendContent(ctx: any,client:Client , ads: boolean, fileId: String,cap:String){
    try {
        if(!ads){
            let temp:any 
            try{
                temp = await ctx.replyDocument(String(fileId),{
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

                setTimeout(async()=>{
                    await ctx.deleteMessage(temp1.id)
                },59000)               // await client.deleteMessage()
               return
            }
           
        }

        let temp1:any

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
            setTimeout(async()=>{
                await ctx.deleteMessage(temp1.id)
            },59000)

           // await client.deleteMessage()
        }





    } catch (error) {
        console.log('error in sendFile:::: ', error)
    }
}