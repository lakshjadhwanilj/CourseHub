import axios from 'axios'
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const addToCart = (id) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/courses/${id}`)
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            course: data._id,
            title: data.title,
            image: data.image,
            price: data.price,
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}