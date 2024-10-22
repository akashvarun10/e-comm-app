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
  try {
    const { brand, size, color, priceRange, featured, tags } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Add filters only if they exist in query
    if (brand) filter.brand = brand;
    if (size) filter.sizes = size;
    if (color) filter.colors = color;
    if (tags) filter.tags = { $in: Array.isArray(tags) ? tags : [tags] };
    if (featured !== undefined) filter.featured = featured === 'true';
    
    // Handle price range
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      if (!isNaN(min) && !isNaN(max)) {
        filter.price = { $gte: min, $lte: max };
      }
    }

    console.log('Filter criteria:', filter); // For debugging
    
    const products = await productService.filterProducts(filter);
    res.status(200).json(products);
  } catch (error) {
    console.error('Filter error:', error); // For debugging
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

// Add new endpoint for related products
exports.getRelatedProducts = async (req, res) => {
  try {
    const relatedProducts = await productService.getRelatedProducts(req.params.id);
    res.status(200).json(relatedProducts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};