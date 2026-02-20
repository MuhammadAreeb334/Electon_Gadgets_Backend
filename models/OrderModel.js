const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    paymentId: { // Store the Stripe Session ID here
        type: String
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled']
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Order', orderSchema);