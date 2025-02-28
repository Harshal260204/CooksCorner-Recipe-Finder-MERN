import React from "react";
import "../../Styles/Recipes.css";
import { assets } from "../../assets/assets";
import RecipeCard from "../../Components/User/RecipeCard"; 

const Recipes = () => {
  const recipes = [
    {
      id: 1,
      name: "Chicken Tikka Biryani",
      description: "A fragrant, spiced biryani with marinated chicken tikka pieces, layered with basmati rice.",
      img: assets.chickenBiryani,
      type: "Non-Veg",
    },
    {
      id: 2,
      name: "Paneer Tikka Masala",
      description: "A creamy and flavorful curry made with marinated paneer pieces cooked in a spiced tomato-based sauce.",
      img: assets.paneerTikkaMasala,
      type: "Veg",
    },
    {
      id: 3,
      name: "Chicken White Sauce Pasta",
      description: "A creamy, rich pasta dish with grilled chicken, cooked in a garlic-flavored white sauce.",
      img: assets.chickenPasta,
      type: "Non-Veg",
    },
    {
      id: 4,
      name: "Shahi Paneer",
      description: "A royal and creamy paneer curry made with rich ingredients like cream, cashews, and aromatic spices.",
      img: assets.shahiPaneer,
      type: "Veg",
    },
    {
      id: 5,
      name: "Chicken Crispy",
      description: "A popular appetizer made with crispy fried chicken coated in a spicy, tangy sauce.",
      img: assets.chickenCrispy,
      type: "Non-Veg",
    },
    {
      id: 6,
      name: "Paneer Biryani",
      description: "A delightful, layered biryani made with marinated paneer and aromatic basmati rice, perfect for vegetarians.",
      img: assets.paneerBiryani,
      type: "Veg",
    },
    {
      id: 7,
      name: "Chole Masala",
      description: "A spicy, flavorful North Indian chickpea curry, packed with robust spices and perfect with rice or naan.",
      img: assets.choleMasala,
      type: "Veg",
    },
    {
      id: 8,
      name: "Gulab Jamun",
      description: "A popular Indian dessert made of soft, round, deep-fried balls soaked in sweet, aromatic sugar syrup.",
      img: assets.gulabjamun,
      type: "Dessert",
    }
  ];

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center content" style={{ background: "#F0C1E1" }}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
