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

export { getCourses, getCourseById } 