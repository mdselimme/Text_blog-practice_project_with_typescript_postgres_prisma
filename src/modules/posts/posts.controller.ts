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

  const { page, limit, search, sort } = req.query;

  const pageNumber = page ? Number(page) : 1;
  const postLimit = limit ? Number(limit) : 5;
  const searchData = search ? search : "";
  const sortData = sort === "asc" ? "asc" : "desc"

  const result = await PostService.getAllPost(pageNumber, postLimit, searchData as string, sortData);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "All Post Retrieved successfully.",
    data: result
  })
};

export const PostController = {
  createPost,
  getAllPost
};
