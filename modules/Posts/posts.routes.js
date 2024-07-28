import { Router } from "express";
import {
  addPost,
  deletePost,
  getPosts,
  updatePost,
} from "./posts.controller.js";

const PostsRouter = Router();

//creating posts:
PostsRouter.post("/posts", addPost);
//read posts:
PostsRouter.get("/posts", getPosts);
//update posts:
PostsRouter.put("/posts/:id", updatePost);
//delete posts:
PostsRouter.delete("/posts/:id", deletePost);

export default PostsRouter;
