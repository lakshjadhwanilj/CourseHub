import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
// Components
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const ProfileScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name) {
                dispatch(getUserDetails('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password}))
        }
    }

    return (
        <Row>
            <Col md={4}>
                <h3>User Profile</h3>
                { message && <Message variant='danger'>{message}</Message>}
                { error && <Message variant='danger'>{error}</Message>}
                { success && <Message variant='success'>Profile Updated!</Message>}
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

                    <Button type='submit' variant='warning'>UPDATE</Button>
                </Form>
            </Col>
            <Col md={8}>
                <h3>My Courses</h3>
            </Col>
        </Row>
    )
}

export default ProfileScreen
