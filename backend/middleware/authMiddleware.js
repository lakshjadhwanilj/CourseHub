import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler (async (req, res, next) => {
    
    let token = req.headers.authorization.split(' ')[1]
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed.')
        }
    }
    
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token.')
    }
    next()
})

export { protect }