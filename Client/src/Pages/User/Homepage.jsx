import React, { useState } from 'react';
import { assets } from '../../assets/assets'
import TopRecipes from '../../Components/User/TopRecipes'
import { Link } from 'react-router-dom';
import desertImg from '../../assets/desert.jpg'
import breakfastImg from '../../assets/breakfast.jpg'
import mainCourseImg from '../../assets/mainCourse.jpg'
import drinksImg from '../../assets/drinks.jpg'
import snacksImg from '../../assets/snacks.jpg'
import soupImg from '../../assets/soupssandwiches.jpg'
import axios from 'axios';

function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    try {
      const response = await axios.get(`http://localhost:3000/recipes/search?query=${searchQuery}`);
      setSearchResults(response.data.recipes);
      setShowResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    }
  };

  return (
    <div >
      {/* Hero Section */}
      <div>
        <img style={{ width: "100%", height: "700px" }} src={assets.car1} alt="" />
      </div>

      {/* Search Section */}
      <div className="container mt-4">
        <form onSubmit={handleSearch} className="d-flex justify-content-center">
          <div className="input-group" style={{ maxWidth: '600px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit">Search</button>
          </div>
        </form>
        
        {/* Search Results */}
        {showResults && (
          <div className="mt-4">
            <h3>Search Results for "{searchQuery}"</h3>
            {searchResults.length > 0 ? (
              <div className="d-flex flex-wrap justify-content-center">
                {searchResults.map(recipe => (
                  <div key={recipe._id} className="card m-2" style={{ width: '18rem' }}>
                    <div className="card-body">
                      <h5 className="card-title">{recipe.name}</h5>
                      <p className="card-text">{recipe.description}</p>
                      <p className="text-muted">Category: {recipe.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No recipes found matching your search.</p>
            )}
            <button className="btn btn-secondary mt-3" onClick={() => setShowResults(false)}>
              Clear Search
            </button>
          </div>
        )}
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