import React from 'react';
import {assets} from '../../assets/assets'
import Categories from '../../Components/User/Categories'
import TopRecipes from '../../Components/User/TopRecipes'
import '../../Styles/Homepage.css'

function Homepage() {
  return (
    <div>
      {/* CAROUSEL */}
      <div id="recipeCarousel" className="carousel slide" data-bs-ride="carousel">
        {/* Indicators */}
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#recipeCarousel"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#recipeCarousel"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#recipeCarousel"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className="carousel-item active">
            <img
              src={assets.car1}
              className="d-block w-100"
              alt="Delicious Recipe 1"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Delicious Recipe 1</h5>
              <p>Explore the taste of fresh ingredients in every bite!</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="carousel-item">
            <img
              src={assets.car2}
              className="d-block w-100"
              alt="Tasty Dish 2"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Tasty Dish 2</h5>
              <p>Savor the flavors of expertly crafted recipes.</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="carousel-item">
            <img
              src={assets.car3}
              className="d-block w-100"
              alt="Scrumptious Meal 3"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Scrumptious Meal 3</h5>
              <p>Indulge in a feast that's as visually stunning as it is delicious.</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#recipeCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#recipeCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* CATEGORIES SECTION */}
      <div className="container-fluid py-3 Categories-Component">
        <h2 className="text-center fw-bold">What Will You Cook Next?</h2>
        <div className="row justify-content-center">
          <Categories image={assets.img1} name="Breakfast" />
          <Categories image={assets.img2} name="Main Course" />
          <Categories image={assets.img3} name="Desert" />
          <Categories image={assets.img4} name="Snacks" />
          <Categories image={assets.img5} name="Drinks" />
          <Categories image={assets.img6} name="Sandwiches" />
        </div>
      </div>

      {/* Top Recipes */}
      <div className="Top-Recipes py-4" style={{ background: "#F0C1E1" }}>
        <h1 className="fw-bold text-center">TOP RECIPES</h1>
        <TopRecipes />
      </div>
    </div>
  );
}

export default Homepage;