import { Router } from "express";
import { PostController } from "./posts.controller";

const router = Router();

router.post("/create", PostController.createPost);
router.get("/", PostController.getAllPost);
router.get("/:id", PostController.getAPostById);

export const PostRouter = router;
