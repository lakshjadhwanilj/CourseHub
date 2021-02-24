import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCourses } from '../actions/courseActions'
// Components
import { Row, Col } from 'react-bootstrap'
import Course from '../components/Course'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Homescreen = () => {

    const dispatch = useDispatch()

    const courseList = useSelector(state => state.courseList)
    const { loading, error, courses } = courseList

    useEffect(() => {
        dispatch(listCourses())
    }, [dispatch])

    return (
        <>
            <h3 className='pb-0 my-0'>Let's Start Learning..</h3>
            { loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{ error }</Message>
            ) : (
                <Row>
                { courses.map(course => (
                    <Col key={ course._id } sm={12} md={6} lg={4} xl={3}>
                        <Course course={ course } />
                    </Col>
                )) }
            </Row>
            )}
        </>
    )
}

export default Homescreen
