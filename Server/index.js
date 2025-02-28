import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/config/Database.js";
import userRouter from "./src/routes/userRoutes.js";
import cors from "cors";
import recipeRouter from "./src/routes/recipeRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// User Related Routes
app.use("/user", userRouter);

// Recipes Related Routes
app.use("/recipes", recipeRouter);

const PORT = process.env.PORT;

// DB CONNECTION
dbConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App Is Running On PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
