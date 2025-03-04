import React from 'react';
import { assets } from '../../assets/assets'
import Categories from '../../Components/User/Categories'
import TopRecipes from '../../Components/User/TopRecipes'

function Homepage() {
  return (
    <div >
      {/* Hero Section */}
      <div>

        <img style={{ width: "100%", height: "700px" }} src={assets.car1} alt="" />
      </div>



      {/* CATEGORIES SECTION */}
      <div className="container-fluid pb-3 Categories-Component">
        <div className="row justify-content-center">
          <h2 className="text-center fw-bold p-4">What Will You Cook Next?</h2>
          <Categories image={assets.img1} name="Breakfast" />
          <Categories image={assets.img2} name="Main Course" />
          <Categories image={assets.img3} name="Desert" />
          <Categories image={assets.img4} name="Snacks" />
          <Categories image={assets.img5} name="Drinks" />
          <Categories image={assets.img6} name="Sandwiches" />
        </div>
      </div>

      {/* Top Recipes */}
      <div className="Top-Recipes py-4" style={{backgroundColor:"000000"}}>
        <h1 className="fw-bold text-center">TOP RECIPES</h1>
        <TopRecipes />
      </div>
    </div>
  );
}

export default Homepage;