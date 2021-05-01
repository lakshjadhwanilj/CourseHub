import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listCourseDetails, updateCourse } from '../actions/courseActions'
import { COURSE_UPDATE_RESET } from '../constants/courseConstants'
// Components
import { Form, Button, } from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const CourseEditScreen = ({ match, history }) => {

    const courseId = match.params.id

    const [title, setTitle] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [instructor, setInstructor] = useState('')
    const [category, setCategory] = useState('')
    const [availability, setAvailability] = useState('not available')
    const [description, setDescription] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const courseDetails = useSelector(state => state.courseDetails)
    const { loading, error, course } = courseDetails
    
    const courseUpdate = useSelector(state => state.courseUpdate)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = courseUpdate

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: COURSE_UPDATE_RESET })
            history.push('/admin/courselist')
        } else {
            if (!course.title || course._id !== courseId) {
                dispatch(listCourseDetails(courseId))
            } else {
                setTitle(course.title)
                setPrice(course.price)
                setImage(course.image)
                setInstructor(course.instructor)
                setCategory(course.category)
                setAvailability(course.availability)
                setDescription(course.description)
            }
        }
    }, [course, courseId, dispatch, history, successUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = await axios.post('/api/upload', formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateCourse({
            _id: courseId,
            title,
            price,
            image,
            instructor,
            category,
            availability,
            description
        }))
    }

    return (
        <>
            <Link to='/admin/courseList' className='btn btn-link text-success mt-3 px-0'>
                Go Back
            </Link>
            <FormContainer>
                <h3>Edit Course</h3>
                { loadingUpdate && <Loader /> }
                { errorUpdate && <Message variant='danger'>{ errorUpdate }</Message> }
                {
                    loading ? <Loader /> :
                        error ? <Message variant='danger'>{error}</Message> : (
                            <Form onSubmit={submitHandler}>
                        
                                <Form.Group controlId='title'>
                                    <Form.Label className='text-muted font-weight-bold'>Title</Form.Label>
                                    <Form.Control
                                        type='name'
                                        placeholder='Enter Title'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label className='text-muted font-weight-bold'>Price</Form.Label>
                                    <Form.Control
                                        type='number'
                                        placeholder='Enter Price'
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId='image'>
                                    <Form.Label className='text-muted font-weight-bold'>Image</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Image URL'
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='image'>
                                <Form.File
                                        id='image-file'
                                        label='Choose File'
                                        custom
                                        onChange={uploadFileHandler}></Form.File>
                                    {uploading && <Loader />}
                                </Form.Group>
                                
                                <Form.Group controlId='instructor'>
                                    <Form.Label className='text-muted font-weight-bold'>Instructor</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Instructor'
                                        value={instructor}
                                        onChange={(e) => setInstructor(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId='category'>
                                    <Form.Label className='text-muted font-weight-bold'>Category</Form.Label>
                                    <Form.Control
                                        type='text'
                                        placeholder='Enter Category'
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId='availability'>
                                    <Form.Label className='text-muted font-weight-bold'>Availability</Form.Label>
                                    <Form.Control as='select' onChange={e => setAvailability(e.target.value)}>
                                        <option value='not available'>Not Available</option>
                                        <option value='available'>Available</option>
                                    </Form.Control>
                                </Form.Group>
                                
                                <Form.Group controlId='description'>
                                    <Form.Label className='text-muted font-weight-bold'>Description</Form.Label>
                                    <Form.Control
                                        as='textarea'
                                        rows={3}
                                        placeholder='Enter Description'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>

                                <Button type='submit' variant='warning'>Update</Button>
                            </Form>
                        )
                }
        </FormContainer>
        </>
    )
}

export default CourseEditScreen
