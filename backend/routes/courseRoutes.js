import express from 'express'
import { getCourses, getCourseById } from '../controllers/courseController.js'

const router = express.Router()

router.route('/').get(getCourses)
router.route('/:id').get(getCourseById)

export default router