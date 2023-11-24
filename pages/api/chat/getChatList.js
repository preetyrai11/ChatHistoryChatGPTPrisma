import { getSession } from "@auth0/nextjs-auth0";
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(req,res){
    try{
      

      const { user } = await getSession(req, res);
      

      const chats = await prisma.chats.findMany({
        where: {
          userId: user.sub,
        },
        select: {
          id: false,
          title: true,
          createdAt: false,
          // Include other fields you want to retrieve, except 'userId' and 'messages'
        },
        orderBy: {
          id: 'desc',
        },
      });
      
      console.log("GET CHAT LIST, GET CHAT LIST:--", chats);

      res.status(200).json({ chats }); 
      
    } catch(e){
        res
          .status(500)
          .json({message: "An error occured when getting the chat list" });
    }
}








































