import { commentModel } from "../Comments/comment.model.js";
import { postModel } from "../Posts/posts.model.js";
import { userModel } from "./users.model.js";
import bcrypt from "bcrypt";

//create user:
const addUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 8);
  try {
    const checkEmail = await userModel.findOne({
      where: { email: email },
    });
    if (checkEmail) {
      return res
        .status(409)
        .json({ message: "Email Already Exists", success: false });
    }
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    return res.status(201).json({
      message: "User Added Successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ success: false, message: "Error creating user." });
    }
  }
};

//read user:
const getUser = async (req, res) => {
  let { rows, count } = await userModel.findAndCountAll({
    include: [
      {
        model: postModel,
      },
      {
        model: commentModel,
      },
    ],
    attributes: { exclude: ["password"] },
  });

  res
    .status(200)
    .json({ message: "Success", allUsers: count, users: rows, success: true });
};

//Login:
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    res.status(401).json({ message: "USER NOT FOUND", success: false });
  }
  let match = bcrypt.compareSync(password, user.password);
  if (match) {
    res
      .status(200)
      .json({ message: "Login......Token", success: true, loginUser: user });
  } else {
    res
      .status(401)
      .json({ message: "Incorrect In Email Or password", success: false });
  }
};

export { addUser, getUser, userLogin };
