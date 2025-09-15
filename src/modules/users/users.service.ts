import { Prisma, User } from "@prisma/client";
import { prisma } from "../../config/db";
import { error } from "console";

const createUserService = async (
  payload: Prisma.UserCreateInput
): Promise<User> => {
  console.log(payload);
  const result = await prisma.user.create({
    data: payload,
  });
  return result;
  // Implementation of user service
};

const getAllUsers = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      picture: true,
      isVerified: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return result;
  // Implementation of user service
};

const getSingleUser = async (id: number) => {
  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      picture: true,
      isVerified: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
  // Implementation of user service
};

const deleteUser = async (id: number) => {

  const user = await prisma.user.findUnique({
    where: {
      id: id
    }
  });

  if (!user) {
    throw new Error("User Not found.")
  }

  await prisma.user.delete({
    where: {
      id: id,
    }
  });

};

export const UsersService = {
  createUserService,
  getAllUsers,
  getSingleUser,
  deleteUser
};
