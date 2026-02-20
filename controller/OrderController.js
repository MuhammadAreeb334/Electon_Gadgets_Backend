const Order = require('../models/OrderModel')

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json({
            success: true,
            count: orders.length,
            data: orders,
        });
    } 
    catch (error) {
        res.status(500).json({
            success: false,
            error: error.message,
        });
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;

        // Validate if status is one of the enum values
        const validStatuses = ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: "Invalid status value" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status: status },
            { new: true } // Returns the updated document
        );

        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
module.exports = {getAllOrders, updateStatus}
