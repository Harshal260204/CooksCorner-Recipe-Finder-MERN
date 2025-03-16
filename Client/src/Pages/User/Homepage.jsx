import React from 'react';
import { assets } from '../../assets/assets'
import TopRecipes from '../../Components/User/TopRecipes'
import { Link } from 'react-router-dom';
import desertImg from '../../assets/desert.jpg'
import breakfastImg from '../../assets/breakfast.jpg'
import mainCourseImg from '../../assets/mainCourse.jpg'
import drinksImg from '../../assets/drinks.jpg'
import snacksImg from '../../assets/snacks.jpg'
import soupImg from '../../assets/soupssandwiches.jpg'

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

          <Link to='/desert' className="card col-2 mx-auto px-0 text-decoration-none mb-3" style={{ width: '12rem', boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", backgroundColor: "000000" }}>
            <img src={desertImg} className="card-img-top" alt='' />
            <div className="card-body" style={{ backgroundColor: "#626F47" }}>
              <h5 className="card-title text-center text-white">Desert</h5>
            </div>
          </Link>

          <Link to='/breakfast' className="card col-2 mx-auto px-0 text-decoration-none mb-3" style={{ width: '12rem', boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", backgroundColor: "000000" }}>
            <img src={breakfastImg} className="card-img-top" alt='' />
            <div className="card-body" style={{ backgroundColor: "#626F47" }}>
              <h5 className="card-title text-center text-white">Breakfast</h5>
            </div>
          </Link>

          <Link to='/main-course' className="card col-2 mx-auto px-0 text-decoration-none mb-3" style={{ width: '12rem', boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", backgroundColor: "000000" }}>
            <img src={mainCourseImg} className="card-img-top" alt='' />
            <div className="card-body" style={{ backgroundColor: "#626F47" }}>
              <h5 className="card-title text-center text-white">Main Course</h5>
            </div>
          </Link>

          <Link to='/drinks' className="card col-2 mx-auto px-0 text-decoration-none mb-3" style={{ width: '12rem', boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", backgroundColor: "000000" }}>
            <img src={drinksImg} className="card-img-top" alt='' />
            <div className="card-body" style={{ backgroundColor: "#626F47" }}>
              <h5 className="card-title text-center text-white">Drinks</h5>
            </div>
          </Link>

          <Link to='/snacks' className="card col-2 mx-auto px-0 text-decoration-none mb-3" style={{ width: '12rem', boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", backgroundColor: "000000" }}>
            <img src={snacksImg} className="card-img-top" alt='' />
            <div className="card-body" style={{ backgroundColor: "#626F47" }}>
              <h5 className="card-title text-center text-white">Snacks</h5>
            </div>
          </Link>

          <Link to='/soups-sandwiches' className="card col-2 mx-auto px-0 text-decoration-none mb-3" style={{ width: '12rem', boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", backgroundColor: "000000" }}>
            <img src={soupImg} className="card-img-top" alt='' />
            <div className="card-body" style={{ backgroundColor: "#626F47" }}>
              <h5 className="card-title text-center text-white">Sandwiches</h5>
            </div>
          </Link>

        </div>
      </div>

      {/* Top Recipes */}
      <div className="Top-Recipes py-4" style={{ backgroundColor: "000000" }}>
        <h1 className="fw-bold text-center">TOP RECIPES</h1>
        <TopRecipes />
      </div>
    </div>
  );
}

export default Homepage;