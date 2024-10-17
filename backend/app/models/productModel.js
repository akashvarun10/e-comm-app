const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  collectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection', // Reference to the Collection model
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    required: true,
    validate: {
      validator: (v) => v.length >= 1 && v.length <= 4, // Minimum 1, maximum 4 images
      message: 'A product must have between 1 and 4 images.',
    },
  },
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    default: null,
  },
  colors: {
    type: [String], // Array of color strings
  },
  sizes: {
    type: [String], // Array of size strings
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt timestamps

module.exports = mongoose.model('Product', productSchema);