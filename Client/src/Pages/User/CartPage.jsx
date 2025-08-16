import React from 'react'
import CartCard from '../../Components/User/CartCard'
import { useSelector, useDispatch } from 'react-redux'
import { clearCart } from '../../Store/cartSlice'

const CartPage = () => {
    const cartItems = useSelector(state => state.cart)
    const dispatch = useDispatch()

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        // Extract numeric value from price string (e.g., "₹1,299" -> 1299)
        const price = parseFloat(item.price.replace(/[^\d.]/g, ''));
        return total + (isNaN(price) ? 0 : price);
    }, 0);

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear the cart?')) {
            dispatch(clearCart());
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Your Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                <div className="text-center">
                    <h4>Your cart is empty</h4>
                    <p>Add some delicious cookbooks to your cart!</p>
                </div>
            ) : (
                <>
                    <div className="row">
                        <div className="col-md-8">
                            {cartItems.map((data, index) => {
                                return <CartCard key={index} data={data} />
                            })}
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Order Summary</h5>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                        <span>Items ({cartItems.length})</span>
                                        <span>₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>Shipping</span>
                                        <span>Free</span>
                                    </div>
                                    <hr />
                                    <div className="d-flex justify-content-between fw-bold">
                                        <span>Total</span>
                                        <span className="text-success">₹{totalPrice.toFixed(2)}</span>
                                    </div>
                                    <button className="btn btn-success w-100 mt-3">Proceed to Checkout</button>
                                    <button className="btn btn-outline-danger w-100 mt-2" onClick={handleClearCart}>
                                        Clear Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default CartPage