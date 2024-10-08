import { Router } from "express"; // Importing Router from Express
import {
  addPost, // Importing the function to add a post
  deletePost, // Importing the function to delete a post
  getPosts, // Importing the function to get posts
  updatePost, // Importing the function to update a post
} from "./posts.controller.js"; // Importing controller functions from posts.controller.js

const PostsRouter = Router(); // Creating a new Router instance

// Route to create a post
PostsRouter.post("/posts", addPost); 
// When a POST request is made to /posts, the addPost function is called

// Route to get all posts
PostsRouter.get("/posts", getPosts); 
// When a GET request is made to /posts, the getPosts function is called

// Route to update a post by ID
PostsRouter.put("/posts/:id", updatePost); 
// When a PUT request is made to /posts/:id, the updatePost function is called
// :id is a route parameter that will be replaced with the actual post ID

// Route to delete a post by ID
PostsRouter.delete("/posts/:id", deletePost); 
// When a DELETE request is made to /posts/:id, the deletePost function is called
// :id is a route parameter that will be replaced with the actual post ID

export default PostsRouter; // Exporting the router to be used in other parts of the application
