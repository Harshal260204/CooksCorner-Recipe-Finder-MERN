import express from "express";
import {
  createTopRecipe,
  deleteTopRecipe,
  editTopRecipes,
  getTopRecipes,
} from "../controllers/topRecipeControllers.js";

const topRecipeRouter = express.Router();

topRecipeRouter.get("/", getTopRecipes);
topRecipeRouter.post("/", createTopRecipe);
topRecipeRouter.delete("/:id", deleteTopRecipe);
topRecipeRouter.put("/:id", editTopRecipes);

export default topRecipeRouter;
