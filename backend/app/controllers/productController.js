const productService = require('../services/productService');

exports.createProduct = async (req, res) => {
    try {
      const product = await productService.createProduct(req.body); // Now contains images array
      res.status(201).json({ message: 'Product created successfully', product });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


exports.getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.filterProducts = async (req, res) => {
  const { brand, size, color, priceRange, featured } = req.query;

  // Construct filter object
  const filter = {};
  if (brand) filter.brand = brand; // Assuming brand is a field in the product schema
  if (size) filter.sizes = size; // Size filtering
  if (color) filter.colors = color; // Color filtering
  if (featured) filter.featured = featured === 'true'; // Featured filtering

  // Price filtering
  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split('-').map(Number);
    filter.price = { $gte: minPrice, $lte: maxPrice };
  }

  try {
    const products = await productService.filterProducts(filter);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await productService.deleteProduct(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully', product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};