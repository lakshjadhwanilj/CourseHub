import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listTopCourses } from '../actions/courseActions'
import { Link } from 'react-router-dom'
// Components
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

const CourseCarousel = () => {
    
    const dispatch = useDispatch()
    
    const courseTopRated = useSelector(state => state.courseTopRated)
    const { loading, error, courses } = courseTopRated
    
    useEffect(() => {
        dispatch(listTopCourses())
    }, [dispatch])

    return loading ? <Loader /> :
        error ? <Message variant='danger'>{error}</Message> : (
            <Carousel pause='hover' className='bg-dark'>
                {courses.map(course => (
                    <Carousel.Item key={course._id}>
                        <Link to={`/course/${course._id}`}>
                            <Image src={course.image} alt='course.title' fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <p className='lead font-weight-bold m-0'>{ course.title }</p>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
}

export default CourseCarousel
