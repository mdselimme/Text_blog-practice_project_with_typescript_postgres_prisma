import { Request, Response } from "express";
import { UsersService } from "./users.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await UsersService.createUserService(body);
    res.status(200).json({
      success: true,
      statuscode: 200,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const UserController = {
  createUserController,
};
