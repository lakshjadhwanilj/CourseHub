import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../actions/orderActions'
// Components
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const OrderListScreen = ({ history }) => {

    const dispatch = useDispatch()

    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo])

    return (
        <>
            <h3 className='text-muted font-weight-bold'>List of Orders</h3>
            {
                loading ? <Loader /> :
                    error ? <Message variant='danger'>{error}</Message> : (
                        <Table hover responsive size='sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>USER</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID AT</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    orders.map(order => (
                                        <tr key={order._id}>
                                            <td>{ order._id }</td>
                                            <td>{ order.user && order.user.name }</td>
                                            <td>{ order.createdAt.substring(0,10) }</td>
                                            <td>$ { order.totalPrice }</td>
                                            <td>
                                                {
                                                    order.isPaid ? (
                                                        order.paidAt.substring(0, 10)
                                                    ) : (
                                                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                                                    )
                                                }
                                            </td>
                                            <td>
                                                <LinkContainer to={`/order/${order._id}`}>
                                                    <Button variant='info' size='sm'>
                                                        DETAILS
                                                    </Button>
                                                </LinkContainer>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
            }
        </>
    )
}

export default OrderListScreen