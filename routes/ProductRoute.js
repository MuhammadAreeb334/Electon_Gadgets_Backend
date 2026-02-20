const express = require('express');
const { getAllProducts, addProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controller/ProductController');
const protect = require('../middleware/auth');
const authorize = require('../middleware/role');
const upload = require('../middleware/upload')

const ProductRouter = express.Router();


ProductRouter.get('/', protect, authorize("admin", "user"), getAllProducts)
ProductRouter.get('/:id', protect, authorize("admin", "user"), getSingleProduct)
ProductRouter.post('/addProduct', protect, authorize("admin"), upload.array('image', 5), addProduct)
ProductRouter.put('/updateProduct/:id', protect, authorize("admin"), upload.array('image', 5), updateProduct)
ProductRouter.delete('/deleteProduct/:id', protect, authorize("admin"), deleteProduct)

module.exports = ProductRouter;