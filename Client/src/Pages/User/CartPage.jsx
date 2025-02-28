import React from 'react'
import CartCard from '../../Components/User/CartCard'
import { useSelector } from 'react-redux'

const CartPage = () => {
    const selector = useSelector(state => state.cart)
    return (
        <div>
            {selector.map((data, index) => {
                return <CartCard data={data} />
            })}
        </div>
    )
}

export default CartPage