// Requiring packages
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
// Data
import users from './data/users.js'
import courses from './data/courses.js'
// Models
import User from './models/userModel.js'
import Course from './models/courseModel.js'
import Order from './models/orderModel.js'

import connectDB from './config/db.js'

// Load config
dotenv.config()

// Connecting to MongoDB
connectDB()

// Import sample data
const importData = async () => {
    try {
        await Order.deleteMany()
        await Course.deleteMany()
        await User.deleteMany()

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id

        const sampleCourses = courses.map(course => {
            return {...course, user: adminUser}
        })

        await Course.insertMany(sampleCourses)
        
        console.log('Data Imported!'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`Error: ${error}`.red.inverse)
        process.exit(1)
    }
}

// Destroy all data
const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Course.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse)
        process.exit()
    } catch (error) {
        console.error(`Error: ${error}`.red.inverse)
        process.exit(1)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}