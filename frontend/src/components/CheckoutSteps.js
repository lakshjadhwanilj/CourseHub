import React from 'react'
// Components
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3 }) => {
    
    return (
        <Nav justify variant='tabs' className='mt-4'>
            {/* signin */}
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Sign In</Nav.Link> }
            </Nav.Item>

            {/* payment */}
            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Payment</Nav.Link> }
            </Nav.Item>

            {/* place order */}
            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Place Order</Nav.Link>
                    </LinkContainer>
                ) : <Nav.Link disabled>Place Order</Nav.Link> }
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps
