import toprecipe from "../models/topRecipes.js";

// Get All Top Recipes
export const getTopRecipes = async (req, res) => {
  try {
    const topRecipes = await toprecipe.find();
    res.status(200).json({ topRecipes });
  } catch (error) {
    res.status(400).json({ message: "Server Error" });
  }
};

// Edit Top Recipes
export const editTopRecipes = async (req, res) => {
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

    const topRecipeExist = await toprecipe.findById(id);

    if (!topRecipeExist) {
      res.status(400).json({ message: "Top Recipe Does Not Exist" });
    }

    const updatedTopRecipe = await toprecipe.findByIdAndUpdate(
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

    if (!updatedTopRecipe) {
      res.status(400).json({ message: "Top Recipe Not Updated" });
    }

    res.status(200).json({ message: "Top Recipe Udpated Sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Create Top Recipes:
export const createTopRecipe = async (req, res) => {
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

    const newTopRecipe = new toprecipe({
      name,
      description,
      category,
      type,
      ingredients,
      instructions,
      cookingTime,
    });

    await newTopRecipe.save();

    return res.status(201).json({ message: "Top Recipe Created Succesfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete Top Recipes:
export const deleteTopRecipe = async (req, res) => {
  try {
    const { id } = req.body;
    const delTopRecipe = await toprecipe.findByIdAndDelete(id);
    if (!delTopRecipe) {
      res.status(400).json({ message: "Recipe Not Found" });
    }
    res.status(200).json({ message: "Recipe Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
