const Products = require('./../models/productsModel');
console.log(Products);
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find();
    // console.log(products);
    return res.status(200).json({
      status: 'OK',
      data: { products: products },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
    console.log(err.message)
  }

};

exports.createProdcuts = async (req, res, next) => {
  try {
    const newProduct = await Products.create(req.body);
    console.log(newProduct);
    return res.status(200).json({
      status: 'success',
      data: { product: newProduct },
    });
  } catch (err) {
    return res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  next();
};
