import {
  createUser,
  getUserByEmail,
  getUserById,
  updatePwd,
  // updatePwd,
} from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import noadmaoler from "nodemailer";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const createResetToken = (id) => {
  return jwt.sign({ id }, process.env.RESET_JWT_SECRET, { expiresIn: "10m" });
};

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required fields.",
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
    const normalizedEmail = email.toLowerCase();

    const userId = await createUser(
      name,
      normalizedEmail,
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

  try {
    // ✅ Check for missing fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all the required fields.",
      });
    }

    // ✅ Validate email format first
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address",
      });
    }

    // ✅ Normalize email only after ensuring it's present
    const normalizedEmail = email.toLowerCase();
    const existingUser = await getUserByEmail(normalizedEmail);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist",
      });
    }

    // ✅ Compare hashed password
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // ✅ Create and return token
    const token = createToken(existingUser.id);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const forgetPwd = async (req, res) => {
  const email = req.body.email;
  console.log(email);

  try {
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide email to change password.",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email address.",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const existingUser = await getUserByEmail(normalizedEmail);
    // console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist.",
      });
    }

    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // ✅ Update password in database
    // await updatePwd(normalizedEmail, hashedPassword);

    const token = createResetToken(existingUser.id); // optional
    

    const transporter = noadmaoler.createTransport({
      service: "Gmail",
      auth: {
        user: "samiudeen96amm@gmail.com",
        pass: process.env.GAPPPWD,
      },
    });

    const clientUrl = process.env.CLIENT_URL;
    const resetLink = `${clientUrl}/reset-password?token=${token}`;
    const mailOptions = {
      from:"Expense Tracker",
      to: existingUser.email,
      subject: "Reset Password",
      text: `Click the link to reset your password: ${resetLink}`
    }

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Link sent to you email successful.",
      resetLink,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
      error: error.message,
    });
  }
};

// forgetPwd();

// const ResetPwd = async (req, res) => {
//   const { token, password } = req.body;

//   try {
//     if (!token || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Token and password are required.",
//       });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // ✅ Update password in database
//     await updatePwd(normalizedEmail, hashedPassword);

//     const token = createResetToken(decoded.id);

//     return res.status(200).json({
//       success: true,
//       message: "Link sent to you email successful.",
//       resetLink,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Server error.",
//       error: error.message,
//     });
//   }
// };

const ResetPwd = async (req, res) => {
  const { token, password } = req.body;

  try {
    if (!token || !password) {
      return res.status(400).json({
        success: false,
        message: "Token and password are required.",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.RESET_JWT_SECRET);

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update password in database
    await updatePwd(hashedPassword, decoded.id); // Assuming decoded token contains user id

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error.",
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

export { userRegister, login, info, forgetPwd, ResetPwd };
