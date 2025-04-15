import express from "express";
import {
  loginUser,
  registerUser,
  sampleRoute,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/sample", sampleRoute);
userRouter.post("/user-register", registerUser);
userRouter.post("/user-login", loginUser);
  
export default userRouter;
