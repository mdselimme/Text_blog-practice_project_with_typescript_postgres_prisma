import { Request, Response } from "express";
import { UsersService } from "./users.service";

const createUserController = async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const result = await UsersService.createUserService(body);
    res.status(200).json({
      success: true,
      statuscode: 201,
      message: "User created successfully.",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statuscode: 500,
      message: error.message,
      data: null,
    });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UsersService.getAllUsers();
    res.status(200).json({
      success: true,
      message: "All Users retrieved successfully.",
      statuscode: 200,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statuscode: 500,
      message: error.message,
      data: null,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await UsersService.getSingleUser(Number(req.params.id));
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully.",
      statuscode: 200,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      statuscode: 500,
      message: error.message,
      data: null,
    });
  }
};

export const UserController = {
  createUserController,
  getAllUsers,
  getSingleUser,
};
