const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product must have a title.'],
    trim: true,
    maxLength: [40, 'A product title must be less than 40 characters.'],
    minLength: [10, 'A product title must be greater than 40 characters.'],
  },
  description: {
    type: String,
    trim: true,
    maxLength: [250, 'A product description must be less than 250 characters.'],
    minLength: [
      50,
      'A product description must be greater than 50 characters.',
    ],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.'],
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  },
});

const Products = mongoose.model('Products', productsSchema);
module.exports = Products;
