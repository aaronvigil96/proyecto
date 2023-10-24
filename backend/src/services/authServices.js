import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authService = {
    getEmail: async (email) => {
        try{
            const user = await prisma.user.findUnique({where: {email},select: {email: true}});
            if(!user){
                return null
            }else {
                return user;
            }
        }catch(err){
            console.log(err);
        }
    },
    create: async (email, password) => {
        try{
            let user = await prisma.user.create({data:{email,password}})
            return user;
        }catch(err){
            console.log(err);
        }
    },
    getUser: async (email) => {
        try{
            const user = await prisma.user.findUnique({where:{email}});
            return user;
        }catch(err){
            console.log(err);
        }
    }
}