import express from "express";
import {
  deleteUser,
  getAllUsers,
  loginUser,
  registerUser,
  sampleRoute,
  updateUser,
} from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.get("/sample", sampleRoute);
userRouter.post("/user-register", registerUser);
userRouter.post("/user-login", loginUser);
userRouter.get("/all-users", getAllUsers);
userRouter.put("/update-user/:id", updateUser);
userRouter.delete("/delete-user/:id", deleteUser);

export default userRouter;
