import recipe from "../models/recipeModel.js";
import user from "../models/userModel.js";

// Get All Recipes :
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipe.find();
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};

// Get Recipes By Veg / Non Veg ()
export const getRecipeByType = async (req, res) => {
  try {
    // Your code to get recipes
    const recipes = await recipe.find({ type: req.params.type });

    if (!recipes) {
      return res.status(404).json({ message: 'Recipes not found' });
    }

    // Send response once here
    return res.json(recipes);

  } catch (error) {
    // Ensure the response is not sent after an error has already been handled
    console.error('Error getting recipes:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};
