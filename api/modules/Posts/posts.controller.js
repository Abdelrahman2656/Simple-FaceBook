import { commentModel } from "../Comments/comment.model.js";
import { userModel } from "../Users/users.model.js";
import { postModel } from "./posts.model.js";

//creating posts:
const addPost = async (req, res) => {
  // let user = await userModel.findOne({where:{
  //     id:req.body.userId
  // }})
  // if (!user){
  //     res.status(401).json({message:"User Logged Out",success:false})
  // }
  let posts = await postModel.create(req.body);
  res
    .status(201)
    .json({ message: "Posts Added Successfully", success: true, posts });
};
//read posts:
const getPosts = async (req, res) => {
  try {
    const { count, rows } = await postModel.findAndCountAll({
      include: [
        {
          model: userModel,

          attributes: { exclude: ["password"] },
        },
        {
          model: commentModel,
        },
      ],
    });

    res.status(200).json({
      message: "Success",
      success: true,
      allPosts: count,
      posts: rows,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//update posts:
const updatePost = async (req, res) => {
  const postID = req.params.id;
  const { title, content } = req.body;
  try {
    const checkID = await postModel.findByPk(postID);
    if (!checkID) {
      return res
        .status(404)
        .json({ message: "Post Not Found", success: false });
    }

    let [created] = await postModel.update(
      {
        title,
        content,
      },
      {
        where: {
          id: postID,
        },
      }
    );
    if (created > 0) {
      return res.status(200).json({
        message: "Account Updated Successfully",
        created,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Error creating user." });
    }
  }
};
//
const deletePost = async (req, res) => {
  const postID = req.params.id;
  const { title, content } = req.body;
  try {
    const checkID = await postModel.findByPk(postID);
    if (!checkID) {
      return res
        .status(404)
        .json({ message: "Post Not Found", success: false });
    }

    let created = await postModel.destroy({
      where: {
        id: postID,
      },
    });
    if (created > 0) {
      return res.status(200).json({
        message: "Account Deleted Successfully",
        created,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error creating user:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Error creating user." });
    }
  }
};
export { addPost, getPosts, updatePost, deletePost };
