import asyncHandler from 'express-async-handler'
import Course from '../models/courseModel.js'

// @desc    Fetch all courses
// @route   GET /api/courses
// @access  Pubic
const getCourses = asyncHandler(async (req, res) => {
    
    const pageSize = 4
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Course.countDocuments({ ...keyword })
    const courses = await Course.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1))
    
    res.json({ courses, page, pages: Math.ceil(count / pageSize) })
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

// @desc    Create new review
// @route   POST /api/courses/:id/reviews
// @access  Private
const createCourseReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const course = await Course.findById(req.params.id)

    if (course) {
        const alreadyReviewed = course.reviews.find(r => r.user.toString() === req.user._id.toString())

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Product already reviewd.')
        }
        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }
        course.reviews.push(review)
        course.numReviews = course.reviews.length
        course.rating = course.reviews.reduce((acc, item) => item.rating + acc, 0) / course.reviews.length

        await course.save()
        res.status(201).json({message: 'Review added!'})
    } else {
        res.status(404)
        throw new Error('Course not found!')
    }
})

// @desc    Get top rated courses
// @route   GET /api/courses/top
// @access  Public
const getTopCourses = asyncHandler(async (req, res) => {
    const courses = await Course.find({}).sort({ rating: -1 }).limit(3)
    res.json(courses)
})

export {
    getCourses,
    getCourseById,
    deleteCourse,
    createCourse,
    updateCourse,
    createCourseReview,
    getTopCourses
}