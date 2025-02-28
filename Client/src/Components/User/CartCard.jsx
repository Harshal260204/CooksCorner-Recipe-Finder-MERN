import React from 'react'

const CartCard = ({data}) => {
    const {id,img,name,price} = data
    return (
        <div className="card mb-3 bg-success" style={{ maxWidth: 540 }}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={img} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">{price}</small></p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CartCard