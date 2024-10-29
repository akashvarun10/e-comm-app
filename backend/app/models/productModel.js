// productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    collectionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Collection', required: true },
    brand: { type: String, required: true },
    tags: {
      type: [String],
      validate: {
        validator: (v) => v && v.length > 0,
        message: 'At least one tag is required.',
      },
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: (v) => v.length >= 1 && v.length <= 4,
        message: 'A product must have between 1 and 4 images.',
      },
    },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    colors: { type: [String] },
    sizes: { type: [String] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
