import { Request, Response } from "express";

const createPost = (req: Request, res: Response) => {
  const body = req.body;
  console.log(body);
};

export const PostController = {
  createPost,
};
