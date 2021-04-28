// Requiring packages
import mongoose from 'mongoose'

// Creating Schema
const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            title: { type: String, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            course: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Course'
            },
        }
    ],
    paymentMethod: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_address: { type: String }
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        required: true,
        default: false
    },
    paidAt: {
        type: Date
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    },
    approvedAt: {
        type: Date
    }
}, {
    timestamps: true
})

// Creating Models
const Order = mongoose.model('Order', orderSchema)

export default Order