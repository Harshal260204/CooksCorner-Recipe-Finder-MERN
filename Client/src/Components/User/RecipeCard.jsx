import React from "react";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="card m-3" style={{
      width: "18rem",
      border: "none",
      borderRadius: "12px",
      overflow: "hidden",
      backgroundColor: "#DDEB9D",  // Matching background color
      boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    }}>
      <img src={recipe.img} className="card-img-top" alt={recipe.name} style={{
        height: "200px",
        objectFit: "cover",
      }} />
      <div className="card-body" style={{
        padding: "1.2rem",
        backgroundColor: "#DDEB9D",  // Matching background color
        color: "#2b2d42",
      }}>
        <h5 className="RecipeName" style={{
          fontSize: "1.1rem",
          fontWeight: "600",
          color: "#626F47",  // Matching text color
        }}>
          {recipe.name}
        </h5>
        <h6 className="RecipeType" style={{
          fontSize: "1rem",
          color: "#626F47",  // Consistent color for type
          marginBottom: "10px",
        }}>
          {recipe.type}
        </h6>
        <p className="card-text" style={{
          fontSize: "14px",
          color: "#2b2d42",
          height: "60px",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}>
          {recipe.description}
        </p>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <a href="#" className="btn" style={{
            backgroundColor: "#626F47",  // Green button
            color: "#fff",
            borderRadius: "25px",
            padding: "0.5rem 1rem",
            textTransform: "uppercase",
            fontWeight: "bold",
            border: "none",
            cursor: "pointer",
          }}>
            View Recipe
          </a>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
