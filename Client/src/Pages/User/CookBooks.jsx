import React from 'react';
import { assets } from '../../assets/assets';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Store/cartSlice';

const cookbooks = [
  {
    id: 1,
    img: assets.andhracookbook,
    name: "Essential Andhra Cookbook",
    description: "A collection of nutritious and delicious recipes.",
    price: "₹1,299"
  },
  {
    id: 2,
    img: assets.parsicookbook,
    name: "Parsi Kitchen: A Memoir of Food and Family",
    description: "Simple and tasty meals for busy schedules.",
    price: "₹999"
  },
  {
    id: 3,
    img: assets.desertcookbook,
    name: "Desserts for Every Mood",
    description: "Sweet and savory baked delights for every occasion.",
    price: "₹1,499"
  },
  {
    id: 4,
    img: assets.masalalabcookbook,
    name: "Masala Lab: The Science of Indian Cooking",
    description: "A variety of plant-based recipes to enjoy.",
    price: "₹1,199"
  },
  {
    id: 5,
    img: assets.liquidcookbook,
    name: "Liquid Intelligence",
    description: "A journey through aromatic spices and flavors.",
    price: "₹1,399"
  },
  {
    id: 6,
    img: assets.tiffincookbook,
    name: "The Tiffin",
    description: "Healthy and tasty Mediterranean-inspired dishes.",
    price: "₹1,599"
  }
];

const CookbookCard = () => {

  const dispatch = useDispatch()

  const selector = useSelector(state => state.cart)
  console.log(selector);

  return (
    <div className="d-flex flex-wrap justify-content-center content">
      {cookbooks.map(book => (
        <div key={book.id} className="card m-3" style={{
          width: "18rem",
          border: "none",
          borderRadius: "12px",
          overflow: "hidden",
          backgroundColor: "#DDEB9D",  // Matching top recipe card background color
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}>
          <img src={book.img} className="card-img-top" alt={book.name} style={{
            height: "200px",
            objectFit: "cover"
          }} />
          <div className="card-body" style={{
            padding: "1.2rem",
            backgroundColor: "#DDEB9D", // Consistent background color
            color: "#2b2d42",
          }}>
            <h5 className="BookName" style={{
              fontSize: "1.1rem",
              fontWeight: "600",
              color: "#626F47",  // Consistent color
            }}>
              {book.name}
            </h5>
            <p className="card-text" style={{
              fontSize: "14px",
              color: "#2b2d42",
              height: "40px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}>
              {book.description}
            </p>
            <p className="card-price" style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: "#000"
            }}>
              {book.price}
            </p>
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button className="btn" onClick={() => dispatch(addToCart(book))} style={{
                backgroundColor: "#626F47",  // Green button
                color: "#fff",
                borderRadius: "25px",
                padding: "0.5rem 1rem",
                textTransform: "uppercase",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}>
                Add to Cart
              </button>
              <button className="btn" style={{
                backgroundColor: "#626F47",  // Green button
                color: "#fff",
                borderRadius: "25px",
                padding: "0.5rem 1rem",
                textTransform: "uppercase",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CookbookCard;
