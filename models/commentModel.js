const mongoose = require('mongoose')
const UserModel = require('./userModel')
const ProductModel = require('./productModel')

const commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: [true, 'A comment must have an owner'],
    validate: {
      validator: (id) => {
        return UserModel.findById(id)
      },
      message: 'Please enter a valid id'
    }
  },
  product: {
    type: mongoose.Types.ObjectId,
    required: [true, 'A comment must have a product'],
    validate: {
      validator: (id) => {
        return ProductModel.findById(id)
      },
      message: 'Please enter a valid id'
    }
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [300, 'A goal explanation must be less than 300 characters.']
  }
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
