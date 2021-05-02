import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderDetails, payOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
// Components
import { PayPalButton } from 'react-paypal-button-v2'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderScreen = ({ match }) => {

    const orderId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails
    
    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.text = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
    }

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
                                                                <Link to={`/course/${item.course}`}>{item.title}</Link>
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
                                        {!order.isPaid && (
                                            <ListGroup.Item className='bg-transparent px-0 border-0'>
                                                {loadingPay && <Loader />}
                                                {!sdkReady ? <Loader /> : (
                                                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                                )}
                                        </ListGroup.Item>
                                        )}
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