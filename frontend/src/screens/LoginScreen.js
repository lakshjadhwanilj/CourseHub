import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
// Components
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const LoginScreen = ({ location, history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo], redirect)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h3 className='text-muted font-weight-bold'>Sign In</h3>
            { error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                {/* email */}
                <Form.Group controlId='email'>
                    <Form.Label className='text-muted font-weight-bold'>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                {/* password */}
                <Form.Group controlId='password'>
                    <Form.Label className='text-muted font-weight-bold'>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button
                    type='submit'
                    variant='warning'
                    size='lg'
                    className='btn-block'
                >
                    SIGN IN
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    <p className='text-muted font-weight-bold'>
                        Dont't have an account? <Link
                            className='btn btn-link px-0 text-success'
                            to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                            Register
                            </Link>
                    </p>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
