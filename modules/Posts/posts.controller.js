import { commentModel } from "../Comments/comment.model.js"; // Importing the comment model
import { userModel } from "../Users/users.model.js"; // Importing the user model
import { postModel } from "./posts.model.js"; // Importing the post model

// Function to create a new post
const addPost = async (req, res) => {

  // Creating a new post with the data from the request body
  let posts = await postModel.create(req.body);

  // Returning a success response with the newly created post
  res
    .status(201)
    .json({ message: "Posts Added Successfully", success: true, posts });
};

// Function to read all posts
const getPosts = async (req, res) => {
  try {
    // Finding and counting all posts, including associated users and comments
    const { count, rows } = await postModel.findAndCountAll({
      include: [
        {
          model: userModel,
          attributes: { exclude: ["password"] }, // Excluding the password field from the user model
        },
        {
          model: commentModel, // Including associated comments
        },
      ],
    });

    // Returning a success response with the count and post data
    res.status(200).json({
      message: "Success",
      success: true,
      allPosts: count,
      posts: rows,
    });
  } catch (error) {
    console.error("Error fetching posts:", error); // Logging any errors
    res.status(500).json({ success: false, message: "Internal server error" }); // Returning an error response
  }
};

// Function to update a post
const updatePost = async (req, res) => {
  const postID = req.params.id; // Extracting the post ID from the request parameters
  const { title, content } = req.body; // Extracting the title and content from the request body
  try {
    // Finding the post by its primary key (ID)
    const checkID = await postModel.findByPk(postID);
    if (!checkID) {
      return res
        .status(404)
        .json({ message: "Post Not Found", success: false }); // Returning a 404 response if the post is not found
    }

    // Updating the post with the new title and content
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

    // Returning a success response if the post was updated
    if (created > 0) {
      return res.status(200).json({
        message: "Post Updated Successfully",
        created,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error updating post:", error); // Logging any errors
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Error updating post." }); // Returning an error response
    }
  }
};

// Function to delete a post
const deletePost = async (req, res) => {
  const postID = req.params.id; // Extracting the post ID from the request parameters
  try {
    // Finding the post by its primary key (ID)
    const checkID = await postModel.findByPk(postID);
    if (!checkID) {
      return res
        .status(404)
        .json({ message: "Post Not Found", success: false }); // Returning a 404 response if the post is not found
    }

    // Deleting the post
    let created = await postModel.destroy({
      where: {
        id: postID,
      },
    });

    // Returning a success response if the post was deleted
    if (created > 0) {
      return res.status(200).json({
        message: "Post Deleted Successfully",
        created,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error deleting post:", error); // Logging any errors
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Error deleting post." }); // Returning an error response
    }
  }
};

// Exporting the functions to be used in other modules
export { addPost, getPosts, updatePost, deletePost };
