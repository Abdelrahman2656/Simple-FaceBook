import express from "express";
import userRouter from "./modules/Users/users.routes.js";
import PostsRouter from "./modules/Posts/posts.routes.js";
import commentRouter from "./modules/Comments/comment.routes.js";
import sequelize from "./Database/dbconnection.js"
const app = express();
const port = process.env.port||3000;

app.use(express.json());
app.use(userRouter);
app.use(PostsRouter);
app.use(commentRouter);

await sequelize.sync({});
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
