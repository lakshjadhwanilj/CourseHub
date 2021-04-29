import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails } from '../actions/orderActions'
// Components
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    return (
        <div className='pt-3'>
            { loading ? <Loader /> :
                error ? <Message variant='danger'>{error}</Message> :
                    <>
                        <h4 className='text-muted font-weight-bold'>Order No. {order._id}</h4>
                        <Row className='mt-3'>
                            <Col md={8} lg={9}>
                                <ListGroup variant='flush'>
                                        
                                    <ListGroup.Item className='bg-transparent p-0 py-2'>
                                        <h5 className='text-muted font-weight-bold'>Payment Details</h5>
                                        <p className='mb-1'>
                                            <strong>Name: </strong>
                                            {order.user.name}
                                        </p>
                                        <p className='mb-1'>
                                            <strong>Email: </strong>
                                            <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                        </p>
                                        <p className='mb-1'>
                                            <strong>Method: </strong>
                                            {order.paymentMethod}
                                        </p>
                                        {
                                            order.isPaid ?
                                            <Message variant='success'>Paid on {order.paidAt}</Message> :
                                            <Message variant='danger'>Not Paid</Message>
                                        }
                                    </ListGroup.Item>
                                        
                                    <ListGroup.Item className='bg-transparent p-0 py-2'>
                                        <h5 className='text-muted font-weight-bold'>Order Items</h5>
                                        {order.orderItems.length === 0 ? <Message>Order is empty.</Message> : (
                                            <ListGroup variant='flush'>
                                                {order.orderItems.map((item, index) => (
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
                                                                <Link to={`/product/${item.product}`}>{item.title}</Link>
                                                            </Col>
                                                            <Col md={2}>
                                                                $ {item.price}
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
                                                <Col>$ {order.totalPrice}</Col>
                                            </Row>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </div>
                            </Col>
                        </Row>
                    </>
            }
        </div>
    )
}

export default OrderScreen