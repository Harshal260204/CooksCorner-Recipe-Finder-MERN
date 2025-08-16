import express from "express";
import {
  loginUser,
  registerUser,
  sampleRoute,
  getUserProfile,
  updateUserProfile,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
} from "../controllers/userControllers.js";
import { protect } from "../middlewere/authMiddlewere.js";

const userRouter = express.Router();

// Public routes
userRouter.get("/sample", sampleRoute);
userRouter.post("/user-register", registerUser);
userRouter.post("/user-login", loginUser);
userRouter.get("/verify-email/:token", verifyEmail);
userRouter.post("/request-password-reset", requestPasswordReset);
userRouter.post("/reset-password/:token", resetPassword);

// Protected routes
userRouter.get("/profile", protect, getUserProfile);
userRouter.put("/profile", protect, updateUserProfile);
  
export default userRouter;
