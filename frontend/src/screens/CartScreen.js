import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartActions'
// Components
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'

const CartScreen = ({ match, history }) => {
    
    const courseId = match.params.id

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (courseId) {
            dispatch(addToCart(courseId))
        }
    }, [dispatch, courseId])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=payment')
    }

    return (
        <>
            <h3 className='pb-1'>Shopping Cart</h3>
            
            <Row>
                <Col lg={9}>
                    {cartItems.length === 0 ? (
                        <Message>Your cart is empty! <Link to='/' className='font-weight-bold text-decoration-none'>Go Back</Link></Message>
                    ) : (
                        <>
                            <p className='lead text-muted p-0 m-0'>
                                You have {cartItems.reduce((acc, item) => acc + 1, 0)} courses in your cart.
                            </p>
                            <ListGroup className='my-1 p-1' variant='flush'>
                                {cartItems.map(item => (
                                    <ListGroup.Item
                                        className='bg-transparent p-0 py-2'
                                        key={item.course}
                                    >
                                        <Row>
                                            <Col xs={12} md={3} className='d-none d-md-block'>
                                                <Image src={item.image} alt={item.title} fluid rounded />
                                            </Col>
                                            <Col xs={6} md={5} className='font-weight-bold'>
                                                <Link to={`/course/${item.course}`}>{ item.title }</Link>
                                            </Col>
                                            <Col xs={3} md={2} className='font-weight-bold text-right'>
                                                $ {item.price}
                                            </Col>
                                            <Col xs={3} md={2} className='text-center'>
                                                <Button
                                                    type='button'
                                                    variant='outline-danger'
                                                    size='lg'
                                                    className='my-2'
                                                    onClick={() => removeFromCartHandler(item.course)}
                                                >
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </>
                    )}
                </Col>
                <Col lg={3}>
                    <div>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='bg-transparent px-0 border-0'>
                                <p className='lead text-muted'>Total:</p>
                                <h3 className='py-0 my-0 font-weight-bold'>
                                    $ {cartItems.reduce((acc, item) => acc + item.price, 0).toFixed(2)}
                                </h3>
                            </ListGroup.Item>
                            <ListGroup.Item className='bg-transparent p-0'>
                                <Button
                                    type='button'
                                    className='btn btn-block btn-danger btn-lg py-3'
                                    disabled={cartItems.length === 0}
                                    onClick={checkoutHandler}
                                >
                                    <strong>Checkout</strong>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default CartScreen
