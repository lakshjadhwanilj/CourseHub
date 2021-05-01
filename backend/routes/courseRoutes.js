import express from 'express'
import {
    getCourses,
    getCourseById,
    deleteCourse,
    createCourse,
    updateCourse
} from '../controllers/courseController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getCourses).post(protect, admin, createCourse)
router.
    route('/:id').
    get(getCourseById).
    delete(protect, admin, deleteCourse).
    put(protect, admin, updateCourse)

export default router