import express from "express";
import {
  getAllRecipes,
  getRecipeByType,
} from "../controllers/recipeControllers.js";

const recipeRouter = express.Router();

recipeRouter.get("/", getAllRecipes);
recipeRouter.get("/:type", getRecipeByType);

export default recipeRouter;
