import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listCourseDetails } from '../actions/courseActions'
// Components
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CourseScreen = ({ match }) => {

    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courseDetails)
    const { loading, error, course } = courseDetails

    useEffect(() => {
       dispatch(listCourseDetails(match.params.id))
    }, [dispatch, match])

    return (
        <>
            <Link className='btn btn-link my-3 text-warning' to='/'>Go Back</Link>
            { loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{ error }</Message>
            ) : (
                <Row>
                    <Col md={8}>
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
                    <Col md={4}>
                        <Card>
                            <Card.Img className='border-bottom border-warning' src={course.image} variant='top' />
                            <Card.Body>
                                <Card.Text as='h3' className='text-center'>$ {course.price}</Card.Text>
                                <Button className='btn btn-warning btn-block btn-lg' type='button' disabled={course.availability !== 'available'}>
                                    ENROLL NOW
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default CourseScreen