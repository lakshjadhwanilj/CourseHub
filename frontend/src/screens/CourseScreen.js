import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listCourseDetails, createCourseReview } from '../actions/courseActions'
import { COURSE_CREATE_REVIEW_RESET } from '../constants/courseConstants'
// Components
import { Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CourseScreen = ({ history, match }) => {

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courseDetails)
    const { loading, error, course } = courseDetails
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const courseReviewCreate = useSelector(state => state.courseReviewCreate)
    const { error: errorCourseReview, success: successCourseReview } = courseReviewCreate

    useEffect(() => {
        if (successCourseReview) {
            alert('Review submitted!')
            setRating(0)
            setComment('')
            dispatch({ type: COURSE_CREATE_REVIEW_RESET })
        }
       dispatch(listCourseDetails(match.params.id))
    }, [dispatch, match, successCourseReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}`)
    }

    const submitHandler = e => {
        e.preventDefault()
        dispatch(createCourseReview(match.params.id, {
            rating,
            comment
        }))
    }

    return (
        <>
            <Link className='btn btn-link text-success mt-3 px-0' to='/'>Go Back</Link>
            { loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{ error }</Message>
            ) : (
                <>
                    <Row>
                        <Col lg={8}>
                            <h2 className='py-2'>{course.title}</h2>
                            <h5 className='py-2'>{course.description}</h5>
                            <Row>
                                <Col lg={4}>
                                    <Rating value={course.rating} text={`${course.numReviews} reviews`} />
                                </Col>
                                <Col lg={8}>
                                    This course is currently { course.availability }.
                                </Col>
                            </Row>
                            <h5 className='py-2'>Created By: {course.instructor}</h5>
                        </Col>
                        <Col lg={4}>
                            <Card>
                                <Card.Img
                                    className='border-bottom border-warning course-card-img'
                                    src={course.image}
                                    variant='top'
                                />
                                <Card.Body>
                                    <Card.Text as='h3' className='text-center'>
                                        $ {course.price}
                                    </Card.Text>
                                    <Button
                                        className='btn btn-warning btn-block btn-lg'
                                        type='button'
                                        onClick={ addToCartHandler }
                                        disabled={course.availability !== 'available'} >
                                        ENROLL NOW
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                        <Row>
                        <Col md={12}>
                            <h3 className='text-muted font-weight-bold my-0'>Reviews</h3>
                        </Col>
                        <Col md={6}>
                            { course.reviews.length === 0 && <Message>No Reviews</Message> }
                            <ListGroup variant='flush'>
                                {course.reviews.map(review => (
                                    <ListGroup.Item key={review._id} className='bg-transparent px-0'>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p className='mb-1'>{ review.createdAt.substring(0, 10) }</p>
                                        <p className='mb-1'>{ review.comment }</p>
                                    </ListGroup.Item>    
                                ))}
                            </ListGroup>
                        </Col>
                        <Col md={6}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item className='bg-transparent px-0 border-0'>
                                    <h4 className='text-muted font-weight-bold'>Write a review</h4>
                                    { errorCourseReview && <Message variant='danger'>{ errorCourseReview }</Message> }
                                    {
                                        userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select' value={rating}
                                                        onChange={e => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select..</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very Good</option>
                                                        <option value='5'>5 - Excellent</option>
                                                    </Form.Control>
                                                </Form.Group>
                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row={3}
                                                        value={comment}
                                                        placeholder='Write a review'
                                                        onChange={e => setComment(e.target.value)}
                                                    >
                                                    </Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='warning'>SUBMIT</Button>
                                            </Form>
                                        ) : <Message>Please <Link to='/login'>Sign In</Link> to write a review</Message>
                                    }
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>            
            )}
        </>
    )
}

export default CourseScreen