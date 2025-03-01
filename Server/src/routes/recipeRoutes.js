import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  updateRecipe,
} from "../controllers/recipeControllers.js";

const recipeRouter = express.Router();

recipeRouter.get("/all-recipes", getAllRecipes);
recipeRouter.post("/create-recipe", createRecipe);
recipeRouter.put("/update-recipe/:id", updateRecipe);
recipeRouter.delete("/delete-recipe/:id", deleteRecipe);

export default recipeRouter;
