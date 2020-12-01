const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product must have a title.'],
    trim: true,
    maxlength: [40, 'A product title must be less than 40 characters.'],
    minlength: [5, 'A product title must be greater than 5 characters.'],
  },
  type: {
    type: String,
    trim: true,
    maxlength: [25, 'A product must have a valid type'],
    required: [true, 'A product must have a type.']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [250, 'A product description must be less than 250 characters.'],
    minlength: [
      50,
      'A product description must be greater than 50 characters.',
    ],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.'],
  },
  img_path: {
    type: String,
    unique: [true, 'A product must have a unique image']
  },
  file_path: {
    type: String,
    required: [true, 'A product must have a file path'],
    unique: [true, 'A product must have an unique file']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
});

const Products = mongoose.model('Products', productsSchema);
module.exports = Products;
