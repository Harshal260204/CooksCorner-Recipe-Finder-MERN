import React from 'react';

const CartCard = ({ data }) => {
  const { id, img, name, price } = data;
  return (
    <div className="card mb-3 shadow-lg rounded-3 border-0" style={{ maxWidth: '540px' }}>
      <div className="row g-0">
        <div className="col-md-4">
          <img
            src={img}
            alt={name}
            className="img-fluid rounded-start w-100"
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="col-md-8 d-flex flex-column justify-content-between">
          <div className="card-body">
            <h5 className="card-title text-primary fw-bold">{name}</h5>
            <p className="card-text text-muted">Fresh and delicious, perfect for your appetite.</p>
            <p className="card-text">
              <span className="text-success fw-bold">{price}</span>
            </p>
          </div>
          <div className="card-footer bg-light border-0 text-end">
            <button className="btn btn-outline-danger btn-sm">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;