import { Router } from "express";
import { UserRouter } from "../modules/users/users.routes";
import { PostRouter } from "../modules/posts/posts.routes";

export const router = Router();

const RoutesModel = [
  {
    path: "/users",
    route: UserRouter,
  },
  {
    path: "/posts",
    route: PostRouter,
  },
];

RoutesModel.forEach((route) => {
  router.use(route.path, route.route);
});
