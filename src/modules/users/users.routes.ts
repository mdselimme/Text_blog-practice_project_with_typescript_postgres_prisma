import { Router } from "express";
import { UserController } from "./users.controller";

export const router = Router();

router.post("/create", UserController.createUserController);
router.get("/", UserController.getAllUsers);

export const UserRouter = router;
