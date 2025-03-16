import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipeByType,
  updateRecipe,
} from "../controllers/recipeControllers.js";

const recipeRouter = express.Router();

recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:type", getRecipeByType); 
recipeRouter.post("/", createRecipe);
recipeRouter.put("/:id", updateRecipe);
recipeRouter.delete("/:id", deleteRecipe);

export default recipeRouter;
