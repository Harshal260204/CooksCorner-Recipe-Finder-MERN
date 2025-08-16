import express from "express";
import {
  getAllRecipes,
  getRecipeByType,
  getRecipeByCategory,
  searchRecipes,
  addRating,
} from "../controllers/recipeControllers.js";
import { protect } from "../middlewere/authMiddlewere.js";

const recipeRouter = express.Router();

recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/search", searchRecipes);
recipeRouter.get("/type/:type", getRecipeByType);
recipeRouter.get("/category/:category", getRecipeByCategory);
recipeRouter.post("/:id/rating", protect, addRating);

export default recipeRouter;
