// Requiring packages
const express = require('express')
const courses = require('./data/courses')

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
app.listen(5000, console.log('Server running on port 5000'))