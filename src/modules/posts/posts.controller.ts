import { Request, Response } from "express";
import { sendResponse } from "../../utils/sendResponse";
import { PostService } from "./posts.services";

const createPost = async (req: Request, res: Response) => {
  const body = req.body;

  const result = await PostService.createAPost(body);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Post created successfully.",
    data: result
  })
};

const getAllPost = async (req: Request, res: Response) => {

  const { page, limit, search, sort, isFeatured, tags } = req.query;

  const pageNumber = page ? Number(page) : 1;
  const postLimit = limit ? Number(limit) : 5;
  const searchData = search ? search : "";
  const sortData = sort === "asc" ? "asc" : "desc";
  const featured = isFeatured === "true" ? true : false;
  const tagsData = tags ? (tags as string).split(",") : []
  const result = await PostService.getAllPost(pageNumber, postLimit, searchData as string, sortData, featured as boolean, tagsData as string[]);



  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "All Post Retrieved successfully.",
    data: result
  })
};

const getAPostById = async (req: Request, res: Response) => {

  const id = req.params.id;

  const result = await PostService.getAPostById(Number(id));

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "Post retrieved by id successfully.",
    data: result
  })
};

export const PostController = {
  createPost,
  getAllPost,
  getAPostById
};
