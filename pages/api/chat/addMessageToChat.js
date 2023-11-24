import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(req, res){
    try{
       const {user} = await getSession(req, res);
      

       const { chatId, role, content } = req.body;


      const chat = await prisma.chats.update({
         where: {
           
           id: chatId, 
           userId: user.sub, 
         },
         data: {
           messages: {
             push: {
               role: role, 
               content: content 
             },
           },
         },
       });
       
       console.log("ADD MESSAGE TO CHAT:---", chat);
       
       
       res.status(200).json({
         chat: {
            ...chat.value, 
            id: chat.value.id.toString(),
         }, 
       }); 

    } catch(e) {
        res
          .status(500)
          .json({message: "An error occured when adding a message to a chat "});

    }
}



































