import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        // 409 Conflict
        success: false,
        message: "User already exists",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        // 400 Bad Request
        success: false,
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        // 400 Bad Request
        success: false,
        message: "Keep the password length minimum 6 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const display_picture = req.file ? req.file.path : null;

    const userId = await createUser(
      name,
      email,
      hashedPassword,
      display_picture
    );
    const token = createToken(userId);

    return res.status(201).json({
      // 201 Created
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      // 500 Internal Server Error
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // "email": "sami96@gmail.com",
  // "password":"sami12345"

  try {
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res.status(404).json({
        // 404 Not Found
        success: false,
        message: "User doesn't exist",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        // 400 Bad Request
        success: false,
        message: "Please provide a valid email address",
      });
    }

    const isMatched = await bcrypt.compare(password, existingUser.password);

    if (!isMatched) {
      return res.status(401).json({
        // 401 Unauthorized
        success: false,
        message: "Password is incorrect",
      });
    }

    const token = createToken(existingUser.id);

    return res.status(200).json({
      // 200 OK
      success: true,
      message: "Login successful",
      token,
      // user: { email, token },
    });
  } catch (error) {
    return res.status(500).json({
      // 500 Internal Server Error
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const info = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Req: ", req.user);

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export { userRegister, login, info };
