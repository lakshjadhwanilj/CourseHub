import express from 'express'
import { getCourses, getCourseById, deleteCourse } from '../controllers/courseController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(getCourses)
router.route('/:id').get(getCourseById).delete(protect, admin, deleteCourse)

export default router