import express from "express";
import dotenv from "dotenv";
import dbConnection from "./src/config/Database.js";
import userRouter from "./src/routes/userRoutes.js";
import cors from "cors";
import recipeRouter from "./src/routes/recipeRoutes.js";
import topRecipeRouter from "./src/routes/topRecipesRoutes.js";
import adminRouter from "./src/routes/adminRoutes.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// User Related Routes
app.use("/users", userRouter);

// Recipes Related Routes
app.use("/recipes", recipeRouter);

// Admin Routes : 
app.use("/admin",adminRouter)

// Top Recipes Related Routes
app.use("/top-recipes", topRecipeRouter);

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
