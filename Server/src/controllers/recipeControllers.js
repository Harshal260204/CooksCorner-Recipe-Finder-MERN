import recipe from "../models/recipeModel.js";
import user from "../models/userModel.js";

// Get All Recipes :
export const getAllRecipes = async (req, res) => {
  try {
    const recipes = await recipe.find();
    res.status(200).json({ recipes });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Recipes By Veg / Non Veg ()
export const getRecipeByType = async (req, res) => {
  try {
    const recipes = await recipe.find({ type: req.params.type });

    if (!recipes) {
      return res.status(404).json({ message: 'Recipes not found' });
    }

    return res.json(recipes);
  } catch (error) {
    console.error('Error getting recipes:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Get Recipes By Category
export const getRecipeByCategory = async (req, res) => {
  try {
    const recipes = await recipe.find({ category: req.params.category });

    if (!recipes) {
      return res.status(404).json({ message: 'Recipes not found' });
    }

    return res.json(recipes);
  } catch (error) {
    console.error('Error getting recipes:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

// Search Recipes by Name or Category
export const searchRecipes = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Create a case-insensitive regex for searching
    const searchRegex = new RegExp(query, 'i');
    
    // Search in name, description, category, and ingredients
    const recipes = await recipe.find({
      $or: [
        { name: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { ingredients: searchRegex }
      ]
    });

    res.status(200).json({ recipes });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add Rating to Recipe
export const addRating = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const { rating, review } = req.body;
    const userId = req.user._id;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    // Find the recipe
    const recipeItem = await recipe.findById(recipeId);
    if (!recipeItem) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    // Check if user has already rated this recipe
    const existingRatingIndex = recipeItem.ratings.findIndex(r => r.userId.toString() === userId.toString());
    
    if (existingRatingIndex >= 0) {
      // Update existing rating
      recipeItem.ratings[existingRatingIndex].rating = rating;
      if (review) recipeItem.ratings[existingRatingIndex].review = review;
      recipeItem.ratings[existingRatingIndex].date = Date.now();
    } else {
      // Add new rating
      recipeItem.ratings.push({ userId, rating, review });
    }

    // Calculate average rating
    const totalRating = recipeItem.ratings.reduce((sum, r) => sum + r.rating, 0);
    recipeItem.averageRating = totalRating / recipeItem.ratings.length;

    // Save the recipe
    await recipeItem.save();

    res.status(200).json({ message: "Rating added successfully", recipe: recipeItem });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
