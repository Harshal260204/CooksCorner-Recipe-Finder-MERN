import React, { useState, useEffect } from 'react';
import RecipeCard from '../../Components/User/RecipeCard';
import axios from 'axios';

const Breakfast = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreakfastRecipes = async () => {
      try {
        // Fetch recipes by category
        const response = await axios.get("http://localhost:3000/recipes/category/Breakfast");
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch breakfast recipes");
        setLoading(false);
        console.error("Error fetching breakfast recipes:", err);
      }
    };

    fetchBreakfastRecipes();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><h3>Loading breakfast recipes...</h3></div>;
  }

  if (error) {
    return <div className="text-center mt-5"><h3 className="text-danger">{error}</h3></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Breakfast Recipes</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Breakfast;