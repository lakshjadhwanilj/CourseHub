import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCourses, deleteCourse } from '../actions/courseActions'
// Components
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CourseListScreen = ({ history, match }) => {

    const dispatch = useDispatch()

    const courseList = useSelector(state => state.courseList)
    const { loading, error, courses } = courseList
    
    const courseDelete = useSelector(state => state.courseDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = courseDelete
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listCourses())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteCourse(id))
        }
    }

    const createCourseHandler = (course) => {
        // create product
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h3>Courses</h3>
                </Col>
                <Col className='text-right'>
                    <Button variant='warning' className='my-3' onClick={createCourseHandler}>
                        <i className='fas fa-plus'></i> Create Course
                    </Button>
                </Col>
            </Row>
            { loadingDelete && <Loader /> }
            { errorDelete && <Message variant='danger'>{ errorDelete }</Message> }
            {
                loading ? <Loader /> :
                    error ? <Message variant='danger'>{error}</Message> : (
                        <Table hover responsive size='sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>TITLE</th>
                                    <th>INSTRUCTOR</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    courses.map(course => (
                                        <tr key={course._id}>
                                            <td>{ course._id }</td>
                                            <td>{ course.title }</td>
                                            <td>{ course.instructor }</td>
                                            <td>$ { course.price }</td>
                                            <td>{ course.category }</td>
                                            <td>
                                                <LinkContainer to={`/admin/course/${course._id}/edit`}>
                                                    <Button variant='transparent' size='sm'>
                                                        <i className='fas fa-edit text-info'></i> 
                                                    </Button>
                                                </LinkContainer>
                                                {' '}
                                                <Button variant='transparent' size='sm' onClick={() => deleteHandler(course._id)}>
                                                    <i className='fas fa-trash text-danger'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
            }
        </>
    )
}

export default CourseListScreen
