import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const postServices = {
    getAll: async () => {
        const posts = await prisma.post.findMany({where:{}});
        if(!posts){
            return null
        }else {
            return posts;
        }
    },
    get: async id => {
        const post = await prisma.post.findUnique({where:{id}});
        if(!post){
            return null
        }else{
            return post;
        }
    },
    create: async (id, title, body) => {
        const post = await prisma.post.create({data:{userId: id,title,body}});
        return post;
    },
    update: async (id, title, body) => {
        const post = await prisma.post.update({where:{id},data:{title, body}});
        return post;
    }
}