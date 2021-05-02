import express from 'express'
import {
    getCourses,
    getCourseById,
    deleteCourse,
    createCourse,
    updateCourse,
    createCourseReview,
    getTopCourses
} from '../controllers/courseController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getCourses).post(protect, admin, createCourse)
router.route('/:id/reviews').post(protect, createCourseReview)
router.get('/top', getTopCourses)
router.
    route('/:id').
    get(getCourseById).
    delete(protect, admin, deleteCourse).
    put(protect, admin, updateCourse)

export default router