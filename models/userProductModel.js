const mongoose = require('mongoose')
const UserModel = require('./userModel')
const ProductModel = require('./productsModel')

const userProductSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'The product must have an owner id'],
    validate: {
      validator: (id) => {
        return UserModel.findById(id)
      },
      message: 'Please enter a valid id'
    }
  },
  product: {
    type: mongoose.Types.ObjectId,
    required: [true, 'The user must have a product id'],
    validate: {
      validator: (id) => {
        return ProductModel.findById(id)
      },
      message: 'Please enter a valid id'
    }
  }
});

const userProducts = mongoose.model('user_products', userProductSchema);
module.exports = userProducts;
