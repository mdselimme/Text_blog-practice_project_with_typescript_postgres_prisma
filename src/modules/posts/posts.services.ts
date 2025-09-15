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

    const total = await prisma.post.count({ where });

    return {
        meta: {
            total,
            page: pageNumber,
            limit: postLimit,
            totalPages: Math.round(total / postLimit)
        },
        data: result
    };

};

const getAPostById = async (id: number) => {

    return prisma.$transaction(async (tx) => {

        await tx.post.update({
            where: { id },
            data: {
                views: {
                    increment: 1
                }
            }
        })

        return await tx.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    }
                }
            }
        });
    })
};


const getStatsOfPosts = async () => {
    return await prisma.$transaction(async (tx) => {
        const postAggregation = await tx.post.aggregate({
            _count: true,
            _sum: { views: true },
            _avg: { views: true },
            _max: { views: true },
            _min: { views: true }
        });

        const featuredCount = await tx.post.count({
            where: {
                isFeatured: true
            }
        });

        const topFeatured = await tx.post.findFirst({
            where: {
                isFeatured: true
            },
            orderBy: { views: "desc" }
        });

        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);

        const lastWeekPostCount = await tx.post.count({
            where: {
                createdAt: {
                    gte: lastWeek
                }
            }
        })


        return {
            postStats: {
                totalPost: postAggregation._count,
                totalViews: postAggregation._sum.views ?? 0,
                totalAverageViews: postAggregation._avg.views ?? 0,
                minViews: postAggregation._min.views ?? 0,
                maxViews: postAggregation._max.views ?? 0,
            },
            featuredPost: {
                count: featuredCount,
                topPost: topFeatured
            },
            lastWeekPostCount
        }

    })
}

export const PostService = {
    createAPost,
    getAllPost,
    getAPostById,
    getStatsOfPosts
}