const Product = require('../models/productModel');
const Collection = require('../models/collectionModel');
const { supabase, supabaseUrl } = require('../config/supabase');

function parseSupabaseUrl(imageUrl) {
  const urlPrefix = `${supabaseUrl}/storage/v1/object/public/product-images/`;
  const filePath = imageUrl.replace(urlPrefix, '');
  return { filePath };
}

exports.createProduct = async (productData) => {
  const { collectionName, images, brand, tags, ...otherData } = productData;

  // Check if the collection exists by name
  const collectionExists = await Collection.findOne({ name: collectionName });
  if (!collectionExists) {
    throw new Error('Collection not found');
  }

  const product = new Product({
    name: otherData.name,
    brand,
    tags,
    collectionId: collectionExists._id,
    images,
    price: otherData.price,
    discountPrice: otherData.discountPrice,
    colors: otherData.colors,
    sizes: otherData.sizes,
    featured: otherData.featured,
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

exports.filterProducts = async (filterCriteria) => {
  try {
    console.log('Service filter criteria:', filterCriteria); // For debugging
    
    const products = await Product.find(filterCriteria)
      .populate('collectionId', 'name');
    
    console.log(`Found ${products.length} products`); // For debugging
    return products;
  } catch (error) {
    console.error('Service filter error:', error); // For debugging
    throw error;
  }
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
  const product = await Product.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  // Delete images from Supabase storage
  for (const imageUrl of product.images) {
    const { filePath } = parseSupabaseUrl(imageUrl);

    const { error } = await supabase.storage
      .from('product-images')
      .remove([filePath]);

    if (error) {
      console.error('Supabase delete error:', error);
    }
  }

  // Delete the product from the database
  await Product.findByIdAndDelete(id);

  return product;
};

exports.getRelatedProducts = async (productId) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new Error('Product not found');
  }

  // Find products that share at least one tag with the current product
  // Exclude the current product from results
  const relatedProducts = await Product.find({
    _id: { $ne: productId },
    tags: { $in: product.tags }
  })
  .limit(4) // Limit to 4 related products
  .populate('collectionId', 'name');

  return relatedProducts;
};

exports.getProductsByCollection = async (collectionId) => {
  // Find all products that belong to the given collectionId
  const products = await Product.find({ collectionId }).populate('collectionId', 'name');
  return products;
};
