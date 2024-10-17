const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, filterProducts, updateProduct, deleteProduct } = require('../controllers/productController');

// Create products
router.post('/create', createProduct);

// Get all products
router.get('/', getAllProducts);

// Get a single product by ID
router.get('/:id', getProductById);

// Filter products
router.get('/filter', filterProducts);

// Update products
router.put('/:id', updateProduct); // Updated route for editing products

// Delete products
router.delete('/:id', deleteProduct);

module.exports = router;