import React from 'react';
import { Link } from 'react-router-dom';
import '../../Styles/Categories.css';

function Categories(props) {
  return (
    <Link className="card col-2 mx-auto px-0 text-decoration-none" style={{ width: '12rem' , boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)" }}>
      <img src={props.image} className="card-img-top" alt={props.name} />
      <div className="card-body">
        <h5 className="card-title text-center">{props.name}</h5>
      </div>
    </Link>

  )
}

export default Categories