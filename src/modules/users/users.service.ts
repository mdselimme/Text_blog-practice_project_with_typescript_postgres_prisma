import { Prisma } from "@prisma/client";
import { prisma } from "../../config/db";

const createUserService = async (payload: Prisma.UserCreateInput) => {
  console.log(payload);
  const result = await prisma.user.create({
    data: payload,
  });
  return result;
  // Implementation of user service
};
export const UsersService = {
  createUserService,
};
