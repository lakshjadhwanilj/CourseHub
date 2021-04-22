import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
// Components
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, error, userInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo], redirect)

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h3>Sign Up</h3>
            { message && <Message variant='danger'>{message}</Message>}
            { error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                {/* name */}
                <Form.Group controlId='name'>
                    <Form.Label className='text-muted font-weight-bold'>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

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
                
                {/* confirm password */}
                <Form.Group controlId='confirmPassword'>
                    <Form.Label className='text-muted font-weight-bold'>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='warning'>Register</Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    <p className='text-muted font-weight-bold'>
                        Already have an account? <Link
                            className='btn btn-link px-0'
                            to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                            Login
                            </Link>
                    </p>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
