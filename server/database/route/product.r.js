const express = require('express');
const router = express.Router();
const productController = require('../contorler/product.c.js');

// Route to create a new product
router.post('/products', productController.createProduct);

// Route to get all products
router.get('/products/:userId', productController.getAllProducts);

// Route to get product by ID
router.put('/price/:id/:userId/:price', productController.getProductByIdadnprice);
router.put('/priceu/:id/:userId/:priceu', productController.getProductByIdadnpriceu);

// Route to update product by ID
router.put('/products/:id/:userId/:quantity', productController.updateProductById);

// Route to delete product by ID
router.delete('/deleteproduct/:userId/:id', productController.deleteProductById);

// Route to get a product by name
router.get('/solded', productController.getProductByName);

// Route to sell a product
router.put('/sell/:productId/:userId/:quantity/:discount', productController.sellProduct);

module.exports = router;
