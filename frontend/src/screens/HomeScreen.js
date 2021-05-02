import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listCourses } from '../actions/courseActions'
// Components
import { Row, Col } from 'react-bootstrap'
import Meta from '../components/Meta'
import CourseCarousel from '../components/CourseCarousel'
import Course from '../components/Course'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import Loader from '../components/Loader'

const Homescreen = ({ match }) => {

    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const courseList = useSelector(state => state.courseList)
    const { loading, error, courses, pages, page } = courseList

    useEffect(() => {
        dispatch(listCourses(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            <Meta />
            {
                !keyword ? <CourseCarousel /> :
                    <Link className='btn btn-link text-success mt-3 px-0' to='/'>Go Back</Link>}
            <h3 className='pb-0 my-0 text-muted font-weight-bold'>Let's Start Learning..</h3>
            { loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{ error }</Message>
            ) : (
                <>
                    <Row>
                        { courses.map(course => (
                            <Col key={ course._id } xs={12} sm={12} md={6} lg={4} xl={3}>
                                <Course course={ course } />
                            </Col>
                        )) }
                    </Row>
                    <Paginate
                        pages={pages}
                        page={page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default Homescreen
