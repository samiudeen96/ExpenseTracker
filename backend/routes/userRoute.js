import express from "express";
import {
  forgetPwd,
  info,
  login,
  ResetPwd,
  userRegister,
} from "../controllers/userController.js";
import upload from "../middleware/multer.js";
import requireAuth from "../middleware/auth.js";
const userRouter = express.Router();

userRouter.post("/register", upload.single("display_picture"), userRegister);
userRouter.post("/login", login);
userRouter.get("/profile", requireAuth, info);
userRouter.post("/forgot-password", forgetPwd);
userRouter.post("/reset-password", ResetPwd);

export default userRouter;
