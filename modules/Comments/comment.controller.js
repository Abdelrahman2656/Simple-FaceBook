import { postModel } from "../Posts/posts.model.js"; // Importing the post model
import { userModel } from "../Users/users.model.js"; // Importing the user model
import { commentModel } from "./comment.model.js"; // Importing the comment model

// Function to create a new comment
const addComment = async (req, res) => {
  let comment = await commentModel.create(req.body); // Creating a new comment with the data from the request body
  res.status(201).json({ 
    message: "Comment Added Successfully", 
    success: true, 
    comment 
  }); // Returning a success response with the newly created comment
};

// Function to read all comments
const getComment = async (req, res) => {
  try {
    // Finding and counting all comments, including associated posts and users
    const { count, rows } = await commentModel.findAndCountAll({
      include: [
        {
          model: postModel,
          attributes: { exclude: ["password"] }, // Excluding the password field from the post model
        },
        {
          model: userModel,
          attributes: { exclude: ["password"] }, // Excluding the password field from the user model
        },
      ],
    });

    // Returning a success response with the count and comment data
    res.status(200).json({
      message: "Success",
      success: true,
      allComments: count,
      comments: rows,
    });
  } catch (error) {
    console.error("Error fetching comments:", error); // Logging any errors
    res.status(500).json({ success: false, message: "Internal server error" }); // Returning an error response
  }
};

// Function to update a comment
const updateComment = async (req, res) => {
  const commentID = req.params.id; // Extracting the comment ID from the request parameters
  const { comment, postId, userId } = req.body; // Extracting the comment, postId, and userId from the request body
  try {
    let checkID = await commentModel.findByPk(commentID); // Finding the comment by its primary key (ID)
    if (!checkID) {
      return res
        .status(404)
        .json({ message: "Comment Not Found", success: false }); // Returning a 404 response if the comment is not found
    }

    // Updating the comment with the new data
    let [created] = await commentModel.update(
      {
        comment,
        postId,
        userId,
      },
      {
        where: {
          id: commentID,
        },
      }
    );

    // Returning a success response if the comment was updated
    if (created > 0) {
      return res.status(200).json({
        message: "Comment Updated Successfully",
        created,
        success: true,
      });
    }
  } catch (error) {
    console.error("Error updating comment:", error); // Logging any errors
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Error updating comment." }); // Returning an error response
    }
  }
};

// Function to delete a comment
const deleteComment = async (req, res) => {
  const commentID = req.params.id; // Extracting the comment ID from the request parameters

  try {
    let checkID = await commentModel.findByPk(commentID); // Finding the comment by its primary key (ID)
    if (!checkID) {
      return res
        .status(404)
        .json({ message: "Comment Not Found", success: false }); // Returning a 404 response if the comment is not found
    }

    // Deleting the comment
    let created = await commentModel.destroy({
      where: {
        id: commentID,
      },
    });

    // Returning a success response if the comment was deleted
    if (created > 0) {
      return res.status(200).json({
        message: "Comment Deleted Successfully",
        success: true,
      });
    }
  } catch (error) {
    console.error("Error deleting comment:", error); // Logging any errors
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Error deleting comment." }); // Returning an error response
    }
  }
};

// Exporting the functions to be used in other modules
export { addComment, getComment, updateComment, deleteComment };
