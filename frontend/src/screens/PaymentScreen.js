import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../actions/cartActions'
// Components
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = ({ history }) => {

    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h3 className='pb-1'>Payment</h3>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label className='text-muted font-weight-bold'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={e => setPaymentMethod(e.target.value)}>    
                        </Form.Check>
                    </Col>
                    {/* <Col>
                        <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={e => setPaymentMethod(e.target.value)}>    
                        </Form.Check>
                    </Col> */}
                </Form.Group>
                <Button type='submit' variant='success'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
