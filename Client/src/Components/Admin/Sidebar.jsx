import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="d-flex flex-column p-3 bg-dark text-white" style={{ width: '250px', height: '100vh' }}>
      <h4 className="text-center">Admin Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <div className="dropdown">
            <button className="nav-link text-white dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Recipes
            </button>
            <ul className="dropdown-menu bg-dark">
              <li>
                <Link to="all-recipes" className="dropdown-item text-white bg-dark"> {/* ✅ Fix Path */}
                  All Recipes
                </Link>
              </li>
              <li>
                <Link to="create-recipe" className="dropdown-item text-white bg-dark"> {/* ✅ Fix Path */}
                  Create Recipe
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <div className="dropdown">
            <button className="nav-link text-white dropdown-toggle" type="button" data-bs-toggle="dropdown">
              Users
            </button>
            <ul className="dropdown-menu bg-dark">
              <li>
                <Link to="users" className="dropdown-item text-white bg-dark"> {/* ✅ Fix Path */}
                  All Users
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <Link to="messages" className="nav-link text-white">Messages</Link> {/* ✅ Fix Path */}
        </li>
      </ul>
    </div>
  );
}
