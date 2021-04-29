// Requiring packages
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import courseRoutes from './routes/courseRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

// Load config
dotenv.config()

// Connecting to MongoDB
connectDB()

// Initialize app
const app = express()

app.use(express.json())

// Routing
app.get('/', (req, res) => {
    res.send('API is running!')
})

app.use('/api/courses', courseRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

// Custom Middleware
app.use(notFound)
app.use(errorHandler)

// Listening to the port
const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))