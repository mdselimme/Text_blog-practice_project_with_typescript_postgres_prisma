import { Router } from "express";
import { PostController } from "./posts.controller";

const router = Router();

router.post("/create", PostController.createPost);

export const PostRouter = router;
