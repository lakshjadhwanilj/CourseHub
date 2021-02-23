import React from 'react'
import { Link } from 'react-router-dom'
// Components
import Rating from './Rating'
import { Card } from 'react-bootstrap'

const Course = ({ course }) => {
    return (
        <Card bg='dark' className='my-3 p-0 rounded card'>
            <Link to={`/course/${course._id}`}>
                <Card.Img className='m-0 p-0' src={course.image} variant='top' />
            </Link>
            <Card.Body className='border-top border-warning'>
                <Link to={`/course/${course._id}`}>
                    <Card.Title as='h5'>
                        <strong className='text-warning' >{ course.title }</strong>
                    </Card.Title>
                </Link>
            </Card.Body>
            <Card.Footer className='m-0 bg-dark'>
                <Card.Text as='div' className='my-2'>
                    <Rating value={ course.rating } text={ `${course.numReviews} reviews` } />
                </Card.Text>
                <Card.Text as='h4'>$ { course.price }</Card.Text>
            </Card.Footer>
        </Card>
    )
}

export default Course
