const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product must have a title.'],
    trim: true,
    maxlength: [40, 'A product title must be less than 40 characters.']
  },
  type: {
    type: String,
    trim: true,
    maxlength: [25, 'A product must have a valid type'],
    required: [true, 'A product must have a type.'],
    validate: {
      validator: (type) => {
        const types = ['fuselage', 'propulsionEngine', 'takeoff']
        if(types.findIndex(tipo => tipo === type) === -1){
          return false
        }
        return true
      },
      message: 'Please enter an existing type'
    }
  },
  description: {
    type: String,
    trim: true,
    maxlength: [250, 'A product description must be less than 250 characters.']
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price.'],
  },
  img_path: {
    type: String,
    unique: [true, 'A product must have a unique image'],
    required: [true, 'A product require an image']
  },
  file_path: {
    type: String,
    required: [true, 'A product must have a file path'],
    unique: [true, 'A product must have an unique file']
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
