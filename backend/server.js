// Requiring packages
import express from 'express'
import dotenv from 'dotenv'
import courses from './data/courses.js'

// Load config
dotenv.config()

// Initialize app
const app = express()

// Routing
app.get('/', (req, res) => {
    res.send('API is running!')
})

app.get('/api/courses', (req, res) => {
    res.json(courses)
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c._id === req.params.id)
    res.json(course)
})

// Listening to the port
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))