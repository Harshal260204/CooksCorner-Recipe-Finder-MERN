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
    const { type } = req.params;

    if (!type) {
      res.status(400).json({ message: "Enter The Type" });
    }

    const recipes = await recipe.find({ type: type });

    if (recipes.length === 0) {
      res.status(400).json({ message: `No ${type} Recipes Found` });
    }

    res
      .status(200)
      .json({ data: recipes, message: `${type} Recipes Are Fetched!` });
  } catch (error) {
    console.log(error);
    res.json(500).json({ message: "Server Error" });
  }
};

// Create Recipes :
export const createRecipe = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      type,
      ingredients,
      instructions,
      cookingTime,
    } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Enter The Name Of The Recipe" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ message: "Enter The Description Of The Recipe" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ message: "Enter The Category Of The Recipe" });
    }
    if (!type) {
      return res.status(400).json({ message: "Enter The Type Of The Recipe" });
    }
    if (!ingredients) {
      return res
        .status(400)
        .json({ message: "Enter The Ingredients Of The Recipe" });
    }
    if (!instructions) {
      return res
        .status(400)
        .json({ message: "Enter The Instructions Of The Recipe" });
    }
    if (!cookingTime) {
      return res
        .status(400)
        .json({ message: "Enter The Cooking Time Of The Recipe" });
    }

    const newRecipe = new recipe({
      name,
      description,
      category,
      type,
      ingredients,
      instructions,
      cookingTime,
    });

    await newRecipe.save();
    return res.status(201).json({ message: "Recipe Created Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update Recipes :
export const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      category,
      type,
      ingredients,
      instructions,
      cookingTime,
    } = req.body;

    const recipeExist = await user.findById(id);

    if (!recipeExist) {
      res.status(400).json({ message: "Recipe Does Not Exist" });
    }

    const updatedRecipe = await recipe.findByIdAndUpdate(
      id,
      {
        name,
        description,
        category,
        type,
        ingredients,
        instructions,
        cookingTime,
      },
      { new: true }
    );

    if (!updatedRecipe) {
      res.status(400).json({ message: "Recipe Not Updated" });
    }

    res.status(200).json({ message: "Recipe Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Recipes :
export const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTheRecipe = await recipe.findByIdAndDelete(id);

    if (!deleteTheRecipe) {
      res.status(400).json({ message: "Recipe Not Found" });
    }

    res.status(200).json({ message: "Recipe Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
