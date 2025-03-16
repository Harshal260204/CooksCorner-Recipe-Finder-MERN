import mongoose from "mongoose";

const topRecipeScehma = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Veg", "Non-Veg"],
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  instructions: {
    type: String,
    required: true,
  },
  cookingTime: {
    type: Number,
    required: true,
  },
});

const toprecipe = mongoose.model("TopRecipes", topRecipeScehma);

export default toprecipe;
