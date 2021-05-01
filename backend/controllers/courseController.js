import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Pubic
const getCourses =  asyncHandler (async (req, res) => {
    const courses = await Course.find({})
    res.json(courses)
})

// @desc    Fetch single course
// @route   GET /api/courses/:id
// @access  Pubic
const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)

    if (course) {
        res.json(course)
    } else {
        res.status(404)
        throw new Error('Product not found!')
    }
})

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id)

    if (course) {
        await course.remove()
        res.json({ message: 'Course removed!' })
    } else {
        res.status(404)
        throw new Error('Course not found!')
    }
})

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
    const course = new Course({
        title: 'Sample Title',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        instructor: req.user.name,
        category: 'Sample Category',
        description: 'Sample Description',
        availability: 'not available',
        numReviews: 0,
    })
    
    const createdCourse = await course.save()
    res.status(201).json(createdCourse)
})

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
    const { title, price, image, instructor, category, description, availability } = req.body

    const course = await Course.findById(req.params.id)

    if (course) {
        course.title = title
        course.price = price
        course.image = image
        course.instructor = instructor
        course.category = category
        course.description = description
        course.availability = availability

        const updatedCourse = await course.save()        
        res.json(updatedCourse)
    } else {
        res.status(404)
        throw new Error('Course not found!')
    }
})

export {
    getCourses,
    getCourseById,
    deleteCourse,
    createCourse,
    updateCourse
}