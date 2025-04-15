import express from "express";
import {
  createTopRecipe,
  deleteTopRecipe,
  editTopRecipes,
  getTopRecipes,
} from "../controllers/topRecipeControllers.js";
import { isAdmin } from "../middlewere/authMiddlewere.js";

const topRecipeRouter = express.Router();

topRecipeRouter.get("/", getTopRecipes);
topRecipeRouter.post("/", isAdmin, createTopRecipe);
topRecipeRouter.delete("/:id", isAdmin, deleteTopRecipe);
topRecipeRouter.put("/:id", isAdmin, editTopRecipes);

export default topRecipeRouter;
