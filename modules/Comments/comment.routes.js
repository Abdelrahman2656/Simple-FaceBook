
import { Router } from "express"; // Importing the Router class from the Express framework
import {
  addComment, // Importing the addComment function from the comment controller
  deleteComment, // Importing the deleteComment function from the comment controller
  getComment, // Importing the getComment function from the comment controller
  updateComment, // Importing the updateComment function from the comment controller
} from "./comment.controller.js"; // Specifying the path to the comment controller

const commentRouter = Router(); // Creating a new router instance

// Route to create a new comment
commentRouter.post("/comment", addComment); 
// When a POST request is made to "/comment", the addComment function will be called

// Route to read all comments
commentRouter.get("/comment", getComment); 
// When a GET request is made to "/comment", the getComment function will be called

// Route to update a comment
commentRouter.put("/comment/:id", updateComment); 
// When a PUT request is made to "/comment/:id", the updateComment function will be called
// The ":id" part is a route parameter that represents the ID of the comment to be updated

// Route to delete a comment
commentRouter.delete("/comment/:id", deleteComment); 
// When a DELETE request is made to "/comment/:id", the deleteComment function will be called
// The ":id" part is a route parameter that represents the ID of the comment to be deleted

export default commentRouter; // Exporting the router to be used in other parts of the application
