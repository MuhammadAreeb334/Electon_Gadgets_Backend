const Stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/OrderModel');

const Checkout = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const userId = req.user.id; 

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        let totalAmount = 0;
        const lineItems = cartItems.map((item) => {
            totalAmount += item.price * (item.quantity || 1);
            return {
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: Math.round(item.price * 100),
                },
                quantity: item.quantity || 1,
            };
        });
        const session = await Stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: 'payment',
            // success_url: "",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
            // cancel_url: "",
            customer_email: req.user.email, 
        });

        const newOrder = new Order({
            user: userId,
            products: cartItems.map(item => ({
                productId: item._id, 
                quantity: item.quantity || 1
            })),
            totalPrice: totalAmount,
            paymentId: session.id, 
            status: 'Pending'
        });

        await newOrder.save();
        res.json({ id: session.id, url: session.url });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = Checkout;