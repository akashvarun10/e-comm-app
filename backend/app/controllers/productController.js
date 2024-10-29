// controllers/productController.js
const Collection = require('../models/collectionModel'); // Ensure the correct path to the model
const productService = require('../services/productService');
const { supabase, supabaseUrl } = require('../config/supabase');
const { v4: uuidv4 } = require('uuid');

function parseSupabaseUrl(imageUrl) {
  const urlPrefix = `${supabaseUrl}/storage/v1/object/public/product-images/`;
  const filePath = imageUrl.replace(urlPrefix, '');
  return { filePath };
}

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      collectionName,
      brand,
      tags,
      price,
      discountPrice,
      colors,
      sizes,
      featured,
    } = req.body;

    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'At least one image is required' });
    }

    const imageUrls = [];

    // Generate a temporary unique folder name
    const productFolderName = uuidv4();

    // Upload each image to Supabase storage
    for (const file of req.files) {
      const { originalname, buffer } = file;
      const fileExt = originalname.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${productFolderName}/${fileName}`;

      const { data, error } = await supabase.storage
        .from('product-images')
        .upload(filePath, buffer);

      if (error) {
        console.error('Supabase upload error:', error);
        return res.status(500).json({ error: 'Failed to upload image to storage' });
      }

      // Get the public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath);

      imageUrls.push(publicUrlData.publicUrl);
    }

    // Prepare product data
    const productData = {
      name,
      collectionName,
      brand,
      tags,
      images: imageUrls,
      price,
      discountPrice,
      colors,
      sizes,
      featured,
    };

    // Create the product in the database
    const product = await productService.createProduct(productData);

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    console.error('Create product error:', error);
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
    const productId = req.params.id;
    const updates = req.body;

    // Check if new images are uploaded
    if (req.files && req.files.length > 0) {
      // Get the existing product to retrieve existing images
      const existingProduct = await productService.getProductById(productId);

      // Delete existing images from Supabase storage
      for (const imageUrl of existingProduct.images) {
        const { filePath } = parseSupabaseUrl(imageUrl);

        const { error } = await supabase.storage
          .from('product-images')
          .remove([filePath]);

        if (error) {
          console.error('Supabase delete error:', error);
        }
      }

      const imageUrls = [];

      // Upload new images to Supabase storage
      for (const file of req.files) {
        const { originalname, buffer } = file;
        const fileExt = originalname.split('.').pop();
        const fileName = `${uuidv4()}.${fileExt}`;
        const filePath = `${productId}/${fileName}`;

        const { data, error } = await supabase.storage
          .from('product-images')
          .upload(filePath, buffer);

        if (error) {
          console.error('Supabase upload error:', error);
          return res.status(500).json({ error: 'Failed to upload image to storage' });
        }

        // Get the public URL of the uploaded image
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        imageUrls.push(publicUrlData.publicUrl);
      }

      // Include image URLs in updates
      updates.images = imageUrls;
    }

    const product = await productService.updateProduct(productId, updates);
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error('Update product error:', error);
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

exports.getProductsByCollectionName = async (req, res) => {
  try {
    const { collectionName } = req.params; // Get the collection name from the request parameters

    // Find the collection by name
    const collection = await Collection.findOne({ name: collectionName });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    // Fetch all products that belong to the specified collection ID
    const products = await productService.getProductsByCollection(collection._id);

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for this collection' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
