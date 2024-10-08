import { commentModel } from "../Comments/comment.model.js"; // Importing the comment model
import { postModel } from "../Posts/posts.model.js"; // Importing the post model
import { userModel } from "./users.model.js"; // Importing the user model
import bcrypt from "bcrypt"; // Importing bcrypt for password hashing

// Function to create a new user
const addUser = async (req, res) => {
  const { username, email, password } = req.body; // Extracting username, email, and password from request body
  const hashPassword = bcrypt.hashSync(password, 8); // Hashing the password with a salt round of 8
  try {
    // Checking if the email already exists in the database
    const checkEmail = await userModel.findOne({
      where: { email: email }, // Finding user by email
    });
    if (checkEmail) {
      // If email exists, return a conflict status
      return res
        .status(409)
        .json({ message: "Email Already Exists", success: false });
    }
    // Creating a new user with the hashed password
    const newUser = await userModel.create({
      username,
      email,
      password: hashPassword,
    });
    // Returning a success response with the new user's data
    return res.status(201).json({
      message: "User Added Successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error); // Logging any errors
    if (!res.headersSent) {
      // Returning an error response if headers are not sent
      return res
        .status(500)
        .json({ success: false, message: "Error creating user." });
    }
  }
};

// Function to read user data
const getUser = async (req, res) => {
  // Finding and counting all users, including their posts and comments, excluding the password field
  let { rows, count } = await userModel.findAndCountAll({
    include: [
      {
        model: postModel, // Including posts associated with the user
      },
      {
        model: commentModel, // Including comments associated with the user
      },
    ],
    attributes: { exclude: ["password"] }, // Excluding the password field from the result
  });

  // Returning a success response with the count and user data
  res
    .status(200)
    .json({ message: "Success", allUsers: count, users: rows, success: true });
};

// Function to handle user login
const userLogin = async (req, res) => {
  const { email, password } = req.body; // Extracting email and password from request body
  // Finding user by email
  let user = await userModel.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    // If user not found, return an unauthorized status
    res.status(401).json({ message: "USER NOT FOUND", success: false });
  }
  // Comparing the provided password with the stored hashed password
  let match = bcrypt.compareSync(password, user.password);
  if (match) {
    // If password matches, return a success response with the user data
    res
      .status(200)
      .json({ message: "Login......Token", success: true, loginUser: user });
  } else {
    // If password does not match, return an unauthorized status
    res
      .status(401)
      .json({ message: "Incorrect In Email Or password", success: false });
  }
};

// Exporting the functions to be used in other modules
export { addUser, getUser, userLogin };
