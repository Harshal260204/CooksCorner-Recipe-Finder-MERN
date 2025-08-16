import React from "react";
import { assets } from "../../assets/assets";

export default function TopRecipes() {

  const topRecipes = [
    {
      id: 1,
      name: "Chicken Tikka Biryani",
      description: "A fragrant, spiced biryani with marinated chicken tikka pieces, layered with basmati rice.",
      img: assets.chickenBiryani,
      type: "Non-Veg",
      averageRating: 4.5,
      ratingsCount: 120
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      description: "A creamy and flavorful curry made with marinated paneer pieces cooked in a spiced tomato-based sauce.",
      img: assets.paneerTikkaMasala,
      type: "Veg",
      averageRating: 4.2,
      ratingsCount: 95
    },
    {
      id: 3,
      name: "Chicken White Sauce Pasta",
      description: "A creamy, rich pasta dish with grilled chicken, cooked in a garlic-flavored white sauce.",
      img: assets.chickenPasta,
      type: "Non-Veg",
      averageRating: 4.0,
      ratingsCount: 87
    },
    {
      id: 4,
      name: "Shahi Paneer",
      description: "A royal and creamy paneer curry made with rich ingredients like cream, cashews, and aromatic spices.",
      img: assets.shahiPaneer,
      type: "Veg",
      averageRating: 4.7,
      ratingsCount: 142
    }
  ];

  // Function to render star ratings
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-warning">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-warning">☆</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-warning">☆</span>);
    }
    
    return <div>{stars}</div>;
  };

  return (
    <div className="d-flex flex-wrap justify-content-center content">
      {topRecipes.map((recipe) => (
        <div
          className="card m-3"
          style={{
            width: "18rem",
            border: "none",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#DDEB9D",
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          key={recipe.id}
        >
          <img
            src={recipe.img}
            className="card-img-top"
            alt={recipe.name}
            style={{
              height: "200px",
              objectFit: "cover",
              textAlign: "center"
            }}
          />
          <div
            className="card-body"
            style={{
              padding: "1.2rem",
              backgroundColor: "#DDEB9D",
              color: "#2b2d42",
            }}
          >
            <h5 className="RecipeName" style={{ fontSize: "1.1rem", fontWeight: "600", color: "#626F47" }}>
              {recipe.name}
            </h5>
            <h6 className="RecipeType" style={{ fontSize: "1rem", color: "#626F47", marginBottom: "10px" }}>
              {recipe.type}
            </h6>
            <p
              className="card-text"
              style={{
                fontSize: "14px",
                color: "#2b2d42",
                height: "60px",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {recipe.description}
            </p>
            
            {/* Rating Display */}
            <div className="d-flex justify-content-center align-items-center mb-2">
              {renderRating(recipe.averageRating || 0)}
              <span className="ms-2">({recipe.ratingsCount || 0})</span>
            </div>
            
            <div className="d-flex justify-content-center align-items-center mt-3">
              <a href="#" className="btn" style={{
                backgroundColor: "#626F47",
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
      ))}
    </div>
  );
}
