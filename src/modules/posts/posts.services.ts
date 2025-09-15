import { Post, Prisma } from "@prisma/client";
import { prisma } from "../../config/db";



const createAPost = async (payload: Prisma.PostCreateInput): Promise<Post> => {

    const result = await prisma.post.create({
        data: payload,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })

    return result;

};

const getAllPost = async (pageNumber: number, postLimit: number, searchData: string, sortData: string, featured: boolean, tags?: string[]
) => {

    console.log(tags)

    const skip = (pageNumber - 1) * postLimit

    const where: any = {
        AND: [
            searchData && {
                OR: [
                    { title: { contains: searchData, mode: "insensitive" } },
                    { content: { contains: searchData, mode: "insensitive" } },
                ]
            },
            typeof featured === "boolean" ? { isFeatured: featured } : undefined,
            (tags && tags.length > 0) && { tags: { hasSome: tags } }
        ].filter(Boolean)
    }

    const result = await prisma.post.findMany({
        skip,
        take: postLimit,
        where,
        include: {
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return result;

};

export const PostService = {
    createAPost,
    getAllPost
}