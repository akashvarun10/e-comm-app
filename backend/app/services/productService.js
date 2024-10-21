const Product = require('../models/productModel');
const Collection = require('../models/collectionModel');

exports.createProduct = async (productData) => {
    const { collectionName, images } = productData; // Ensure images are extracted from productData
    
    // Check if the collection exists by name
    const collectionExists = await Collection.findOne({ name: collectionName });
    if (!collectionExists) {
      throw new Error('Collection not found');
    }
    
    // Create a new product with the provided images
    const product = new Product({
      ...productData,
      collectionId: collectionExists._id,
      images, // Store the image URLs directly
    });
    await product.save();
    return product;
  };

exports.getAllProducts = async () => {
  return await Product.find().populate('collectionId', 'name'); // Populate collection name
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id).populate('collectionId', 'name');
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

exports.filterProducts = async (filter) => {
  return await Product.find(filter).populate('collectionId', 'name');
};

exports.updateProduct = async (id, updates) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  
  Object.assign(product, updates);
  await product.save();
  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};