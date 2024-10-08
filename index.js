// import express from "express";
// import userRouter from "./modules/Users/users.routes.js";
// import PostsRouter from "./modules/Posts/posts.routes.js";
// import commentRouter from "./modules/Comments/comment.routes.js";
// import sequelize from "./Database/dbconnection.js"
// const app = express();
// const port = process.env.port||3000;

// app.use(express.json());
// app.use(userRouter);
// app.use(PostsRouter);
// app.use(commentRouter);

// await sequelize.sync({});
// app.get("/", (req, res) => res.send("Hello World!"));
// app.listen(port, () => console.log(`Example app listening on port ${port}!`));














// Import the Express library for building the web server
import express from "express";

// Import route modules for handling different parts of the application
import userRouter from "./modules/Users/users.routes.js";
import PostsRouter from "./modules/Posts/posts.routes.js";
import commentRouter from "./modules/Comments/comment.routes.js";

// Import the Sequelize instance for connecting to the database
import sequelize from "./Database/dbconnection.js";

// Create an instance of an Express application
const app = express();

// Set the port for the server to listen on, defaulting to 3000 if not specified in environment variables
const port = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
// This allows the application to handle JSON payloads in request bodies
app.use(express.json());

// Use imported route modules for handling requests to different routes
// Each router module handles a specific part of the application
app.use(userRouter); // Routes for user-related requests
app.use(PostsRouter); // Routes for post-related requests
app.use(commentRouter); // Routes for comment-related requests

// Synchronize the database models with the database
// This ensures that the database schema is updated according to the defined models
await sequelize.sync({});

// Define a route for the root URL ("/")
// When this route is accessed, it responds with "Hello World!"
app.get("/", (req, res) => res.send("Hello World!"));

// Start the server and listen for incoming requests on the specified port
// Log a message to the console when the server is successfully running
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
