import mongoose from "mongoose";

const recipeSchema = mongoose.Schema({
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

const recipe = mongoose.model("Recipe", recipeSchema);

export default recipe;
