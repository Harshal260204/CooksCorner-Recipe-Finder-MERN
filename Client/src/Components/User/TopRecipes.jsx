import React from "react";
import { assets } from "../../assets/assets";

export default function RecipeCard() {

  const topRecipes = [
    {
      id: 1,
      name: "Chicken Tikka Biryani",
      description: "A fragrant, spiced biryani with marinated chicken tikka pieces, layered with basmati rice.",
      img: assets.chickenBiryani, // Updated
      type: "Non-Veg"
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      description: "A creamy and flavorful curry made with marinated paneer pieces cooked in a spiced tomato-based sauce.",
      img: assets.paneerTikkaMasala, // Updated
      type: "Veg"
    },
    {
      id: 3,
      name: "Chicken White Sauce Pasta",
      description: "A creamy, rich pasta dish with grilled chicken, cooked in a garlic-flavored white sauce.",
      img: assets.chickenPasta, // Updated
      type: "Non-Veg"
    },
    {
      id: 4,
      name: "Shahi Paneer",
      description: "A royal and creamy paneer curry made with rich ingredients like cream, cashews, and aromatic spices.",
      img: assets.shahiPaneer, // Updated
      type: "Veg"
    },
    {
      id: 5,
      name: "Chicken Crispy",
      description: "A popular appetizer made with crispy fried chicken coated in a spicy, tangy sauce.",
      img: assets.chickenBiryani, // Updated
      type: "Non-Veg"
    },
    {
      id: 6,
      name: "Paneer Biryani",
      description: "A delightful, layered biryani made with marinated paneer and aromatic basmati rice, perfect for vegetarians.",
      img: assets.paneerBiryani, // Updated
      type: "Veg"
    },
    {
      id: 7,
      name: "Chole Masala",
      description: "A spicy, flavorful North Indian chickpea curry, packed with robust spices and perfect with rice or naan.",
      img: assets.choleMasala, // Updated
      type: "Veg"
    },
    {
      id: 8,
      name: "Gulab Jamun",
      description: "A popular Indian dessert made of soft, round, deep-fried balls soaked in sweet, aromatic sugar syrup.",
      img: assets.gulabjamun, // Updated
      type: "Dessert"
    }
  ];

  return (
    <div className="d-flex flex-wrap justify-content-center content" style={{}}>
      {topRecipes.map((recipe) => (
        <div
          className="card m-3"
          style={{
            width: "18rem",
            border: "none",
            borderRadius: "12px",
            overflow: "hidden",
            backgroundColor: "#DDEB9D",  // Card background color
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
              backgroundColor: "#DDEB9D",  // Updated background color to match the card
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
      ))}
    </div>


  );
}
