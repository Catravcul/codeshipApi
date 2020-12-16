const Product = require('../models/productModel');
exports.index = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({
      products: products
    })
  } catch (err) {
    res.status(404).json({
      err: err.message
    })
  }
}

exports.store = async (req, res) => {
  try {
    const img_path = 'img/product/' + Date.now() + req.files.img.name
    req.body.img_path = img_path
    const newProduct = await Product.create(req.body)
    req.files.img.mv('public/' + img_path, err => console.log(err))
    return res.status(200).json({
      product: newProduct
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.show = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    return res.status(200).json({
      product: product
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.update = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    )
    res.status(200).json({
      product: updated,
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.destroy= async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({
      result: result
    })
  } catch (err) {
    res.status(500).json({
      err: err.message
    })
  }
}
  
exports.drop = async (req, res) => {
  let result;
  try{
    result = await Product.remove({}, err => {
      return err
    })
    res.status(200).json({
      result: result
    })
  } catch(err) {
    res.status(400).json({
      err: err.message
    })
  }
}