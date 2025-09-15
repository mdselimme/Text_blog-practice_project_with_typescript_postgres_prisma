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
  // const body = req.body;

  const result = await PostService.getAllPost();

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
