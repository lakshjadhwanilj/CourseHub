import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listCourses, deleteCourse, createCourse } from '../actions/courseActions'
import { COURSE_CREATE_RESET } from '../constants/courseConstants'
// Components
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CourseListScreen = ({ history, match }) => {

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const courseList = useSelector(state => state.courseList)
    const { loading, error, courses, page, pages } = courseList
    
    const courseDelete = useSelector(state => state.courseDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = courseDelete
    
    const courseCreate = useSelector(state => state.courseCreate)
    const { loading: loadingCreate, error: errorCreate, success: successCreate, course: createdCourse } = courseCreate
    
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    
    useEffect(() => {
        dispatch({ type: COURSE_CREATE_RESET })

        if (!userInfo) {
            history.push('/login')
        }
        if (successCreate) {
            history.push(`/admin/course/${createdCourse._id}/edit`)
        } else {
            dispatch(listCourses('', pageNumber))
        }
    }, [dispatch, history, userInfo, successDelete, successCreate, createdCourse, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure?')) {
            dispatch(deleteCourse(id))
        }
    }

    const createCourseHandler = () => {
        dispatch(createCourse())
        console.log(createdCourse)
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h3 className='text-muted font-weight-bold'>List of Courses</h3>
                </Col>
                <Col className='text-right'>
                    <Button variant='warning' className='my-3' onClick={createCourseHandler}>
                        <i className='fas fa-plus'></i> Create Course
                    </Button>
                </Col>
            </Row>
            { loadingDelete && <Loader /> }
            { errorDelete && <Message variant='danger'>{ errorDelete }</Message> }
            { loadingCreate && <Loader /> }
            { errorCreate && <Message variant='danger'>{ errorCreate }</Message> }
            {
                loading ? <Loader /> :
                    error ? <Message variant='danger'>{error}</Message> : (
                        <>
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
                            <Paginate pages={pages} page={page} isAdmin={true} />
                        </>
                    )
            }
        </>
    )
}

export default CourseListScreen
