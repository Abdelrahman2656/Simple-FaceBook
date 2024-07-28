import { Router } from "express";
import { addUser, getUser, userLogin } from "./user.controller.js";

const userRouter = Router();
//create user:
userRouter.post("/user", addUser);
//read user:
userRouter.get("/user", getUser);
//Login:
userRouter.post("/login", userLogin);

export default userRouter;
