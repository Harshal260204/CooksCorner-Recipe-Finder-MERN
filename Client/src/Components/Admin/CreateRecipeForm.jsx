import React, { useState } from "react";
import axios from 'axios';

const CreateRecipeForm = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    category: "",
    type: "Veg",
    ingredients: "",
    instructions: "",
    cookingTime: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipe);
    const response = await axios.post("http://localhost:3000/recipes/", recipe);
    console.log(response);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create Recipe</h2>
      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-lg">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" name="name" className="form-control" value={recipe.name} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Description:</label>
          <textarea name="description" className="form-control" value={recipe.description} onChange={handleChange} required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" name="category" className="form-control" value={recipe.category} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Type:</label>
          <select name="type" className="form-select" value={recipe.type} onChange={handleChange} required>
            <option value="Veg">Veg</option>
            <option value="Non-Veg">Non-Veg</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Ingredients (comma-separated):</label>
          <input type="text" name="ingredients" className="form-control" value={recipe.ingredients} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Instructions:</label>
          <textarea name="instructions" className="form-control" value={recipe.instructions} onChange={handleChange} required></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Cooking Time (in minutes):</label>
          <input type="number" name="cookingTime" className="form-control" value={recipe.cookingTime} onChange={handleChange} required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipeForm;
