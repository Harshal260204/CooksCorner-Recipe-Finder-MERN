import React, { useState, useEffect } from 'react';
import RecipeCard from '../../Components/User/RecipeCard';
import axios from 'axios';

const MainCourse = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMainCourseRecipes = async () => {
      try {
        // Fetch recipes by category
        const response = await axios.get("http://localhost:3000/recipes/category/Main Course");
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch main course recipes");
        setLoading(false);
        console.error("Error fetching main course recipes:", err);
      }
    };

    fetchMainCourseRecipes();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><h3>Loading main course recipes...</h3></div>;
  }

  if (error) {
    return <div className="text-center mt-5"><h3 className="text-danger">{error}</h3></div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Main Course Recipes</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default MainCourse;