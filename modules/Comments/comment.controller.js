import { postModel } from "../Posts/posts.model.js";
import { userModel } from "../Users/users.model.js";
import { commentModel } from "./comment.model.js";

//create comments:
const addComment = async (req, res) => {
  let comment = await commentModel.create(req.body);
  res
    .status(201)
    .json({ message: "Comment Added Successfully", success: true, comment });
};
//read comments:
const getComment = async (req, res) => {
  try {
    const { count, rows } = await commentModel.findAndCountAll({
      include: [
        {
          model: postModel,
          attributes: { exclude: ["password"] },
        },
        {
          model: userModel,
          attributes: { exclude: ["password"] },
        },
      ],
    });

    res.status(200).json({
      message: "Success",
      success: true,
      allComments: count,
      comments: rows,
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
//update comment:
const updateComment = async (req, res) => {
  const commentID = req.params.id;
  const { comment, postId, userId } = req.body;
  try {
    let checkID = await commentModel.findByPk(commentID);
    if (!checkID) {
      return res
        .status(404)
        .json({ message: "Comment Not Found", success: false });
    }

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
    if (created > 0) {
      return res.status(200).json({
        message: "Comment Updated Successfully",
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
//delete comment:
const deleteComment = async (req, res) => {
  const commentID = req.params.id;

  try {
    let checkID = await commentModel.findByPk(commentID);
    if (!checkID) {
      return res
        .status(404)
        .json({ message: "Comment Not Found", success: false });
    }

    let created = await commentModel.destroy({
      where: {
        id: commentID,
      },
    });
    if (created > 0) {
      return res.status(200).json({
        message: "Comment Deleted Successfully",

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
export { addComment, getComment, updateComment, deleteComment };
