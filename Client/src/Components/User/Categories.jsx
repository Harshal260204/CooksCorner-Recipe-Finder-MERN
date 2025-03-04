import React from 'react';
import { Link } from 'react-router-dom';

function Categories(props) {
  return (
    <Link className="card col-2 mx-auto px-0 text-decoration-none mb-3" style={{ width: '12rem', boxShadow: "inset 0 0 10px rgba(0, 0, 0, 0.2)", backgroundColor:"000000" }}>
      <img src={props.image}  className="card-img-top" alt={props.name} />
      <div className="card-body" style={{backgroundColor:"#626F47"}}>
        <h5 className="card-title text-center text-white">{props.name}</h5>
      </div>
    </Link>

  )
}

export default Categories;