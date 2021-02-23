// Requiring packages
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

import courseRoutes from './routes/courseRoutes.js'

// Load config
dotenv.config()

// Connecting to MongoDB
connectDB()

// Initialize app
const app = express()

// Routing
app.get('/', (req, res) => {
    res.send('API is running!')
})

app.use('/api/courses', courseRoutes)

// Listening to the port
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))