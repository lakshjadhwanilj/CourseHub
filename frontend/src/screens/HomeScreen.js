import React, { useEffect, useState } from 'react'
import axios from 'axios'
// Components
import Course from '../components/Course'
import { Row, Col } from 'react-bootstrap'

const Homescreen = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        const fetchCourses = async () => {
            const { data } = await axios.get('/api/courses')
            setCourses(data)
        }
        fetchCourses()
    }, [])

    return (
        <>
            <h3 className='pb-0 my-0'>Let's Start Learning</h3>
            <Row>
                { courses.map(course => (
                    <Col key={ course._id } sm={12} md={6} lg={4} xl={3}>
                        <Course course={ course } />
                    </Col>
                )) }
            </Row>
        </>
    )
}

export default Homescreen
