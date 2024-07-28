import { Router } from "express";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "./comment.controller.js";

const commentRouter = Router();

//create comments:
commentRouter.post("/comment", addComment);
//read comments:
commentRouter.get("/comment", getComment);
//update comment:
commentRouter.put("/comment/:id", updateComment);
//delete comment:
commentRouter.delete("/comment/:id", deleteComment);

export default commentRouter;
