import React from 'react'
import { Link } from 'react-router-dom'
// Components
import Rating from './Rating'
import { Card } from 'react-bootstrap'

const Course = ({ course }) => {
    return (
        <Card bg='dark' className='my-3 p-3 rounded'>
            <Link to={`/course/${course._id}`}>
                <Card.Img src={course.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/course/${course._id}`}>
                    <Card.Title as='div'>
                        <strong className='text-warning' >{ course.title }</strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={ course.rating } text={ `${course.numReviews} reviews` } />
                </Card.Text>
                <Card.Text as='h3'>${ course.price }</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Course
