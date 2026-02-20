const express = require('express');
const protect = require('../middleware/auth');
const authorize = require('../middleware/role');
const upload = require('../middleware/upload');
const { getAllOrders, updateStatus } = require('../controller/OrderController');

const OrderRouter = express.Router();


OrderRouter.get('/', protect, authorize("admin", "user"), getAllOrders)
OrderRouter.put('/editstatus', protect, authorize("admin", "user"), updateStatus)
// OrderRouter.get('/:id', protect, authorize("admin", "user"), getSingleProduct)
// OrderRouter.post('/addProduct', protect, authorize("admin"), upload.array('image', 5), addProduct)
// OrderRouter.put('/updateProduct/:id', protect, authorize("admin"), upload.array('image', 5), updateProduct)
// OrderRouter.delete('/deleteProduct/:id', protect, authorize("admin"), deleteProduct)

module.exports = OrderRouter;