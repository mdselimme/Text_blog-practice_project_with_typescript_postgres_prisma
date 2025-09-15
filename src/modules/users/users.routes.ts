import { Router } from "express";
import { UserController } from "./users.controller";

export const router = Router();

router.post("/create", UserController.createUserController);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getSingleUser);
router.delete("/:id", UserController.deleteUser);

export const UserRouter = router;
