import express from "express";
import {
  createRecipe,
  updateRecipe,
} from "../controllers/recipeControllers.js";

const recipeRouter = express.Router();

recipeRouter.post("/create-recipe", createRecipe);
recipeRouter.put("/update-recipe/:id", updateRecipe);

export default recipeRouter;
