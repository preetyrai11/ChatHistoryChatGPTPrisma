import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(req, res) {
    try{
      

        
            const {user} = await getSession(req, res);
            const { message } = req.body;
    
            console.log("USER USER USER:--", user);
    
            console.log("MESSAGE MESSAGE:--", message);
            
            
    
            const newUserMessage = {
                role: "user",
                content: message, 
            }; 
    
    
            console.log("NEW USER MESSAGE:---", newUserMessage);
    
              
              const chat = await prisma.chats.create({
                data: {
                  userId: user.sub,
                  messages: newUserMessage,
                  title: message,
                  
                },
              });
    
    
            console.log("CREATE NEW CHAT WORKING:--", chat);
    
            res.status(200).json({
                id: chat.id,
                message: newUserMessage,
                title: message,  
            }); 
    

    } catch(e){
        res
          .status(500)
          .json({message: "An error occured when creating a new chat" });
        console.log("ERROR OCCURED IN CREATE NEW CHAT: ", e);
    }
}












































