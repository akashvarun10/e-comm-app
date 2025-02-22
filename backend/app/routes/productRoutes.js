// // productRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const {
  createProduct,
  getAllProducts,
  getProductById,
  filterProducts,
  updateProduct,
  deleteProduct,
  getRelatedProducts,
  getProductsByCollectionName
} = require('../controllers/productController');

// The order matters! More specific routes first
router.get('/filter/products', filterProducts);
router.post('/create', upload.array('images', 4), createProduct);
router.get('/', getAllProducts);
router.get('/:id/related', getRelatedProducts);
router.get('/:id', getProductById);
router.get('/collections/name/:collectionName/products', getProductsByCollectionName);
router.put('/:id', upload.array('images', 4), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
