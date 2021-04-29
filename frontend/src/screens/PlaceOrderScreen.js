import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createOrder } from '../actions/orderActions'
// Components
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = ({ history }) => {

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    
    cart.totalPrice = cart.cartItems.reduce((acc, item) => acc + item.price, 0)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            paymentMethod: cart.paymentMethod,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 />
            <Row className='mt-3'>
                <Col md={8} lg={9}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='bg-transparent p-0 py-2'>
                            <h5 className='text-muted font-weight-bold'>Payment Method</h5>
                            <p>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        
                        <ListGroup.Item className='bg-transparent p-0 py-2'>
                            <h5 className='text-muted font-weight-bold'>Order Items</h5>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty.</Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item
                                            className='bg-transparent p-0 py-2'
                                            key={index}
                                        >
                                            <Row>
                                                <Col md={3}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{ item.title }</Link>
                                                </Col>
                                                <Col md={2}>
                                                    $ { item.price }
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                            
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4} lg={3}>
                    <div>
                        <ListGroup variant='flush'>
                            <ListGroup.Item className='bg-transparent px-0 pb-0'>
                                <h5 className='text-muted font-weight-bold'>Order Summary</h5>
                            </ListGroup.Item>
                            
                            <ListGroup.Item className='bg-transparent px-0 border-0'>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>$ { cart.totalPrice }</Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                error &&
                                <ListGroup.Item className='bg-transparent px-0 border-0'>
                                    <Message variant='danger'>{ error }</Message>
                                </ListGroup.Item>
                            }

                            <ListGroup.Item className='bg-transparent p-0'>
                                <Button
                                    type='button'
                                    className='btn-block btn-lg py-3'
                                    variant='warning'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}>
                                        Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
