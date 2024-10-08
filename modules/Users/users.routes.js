
import { Router } from "express"; // Importing Router from Express
import { addUser, getUser, userLogin } from "./user.controller.js"; // Importing controller functions

const userRouter = Router(); // Creating a new Router instance

// Route to create a user
userRouter.post("/user", addUser); 
// When a POST request is made to /user, the addUser function is called

// Route to get user data
userRouter.get("/user", getUser); 
// When a GET request is made to /user, the getUser function is called

// Route for user login
userRouter.post("/login", userLogin); 
// When a POST request is made to /login, the userLogin function is called

export default userRouter; // Exporting the router to be used in other parts of the application
