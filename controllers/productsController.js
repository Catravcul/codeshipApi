const Products = require('./../models/productsModel');
console.log(Products);
exports.getAllProducts = async (req, res, next) => {
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
    next();
  }
};

exports.createProdcuts = async (req, res, next) => {
  try {
    const newProduct = await Products.create(req.body);
    // console.log(newProduct);
    return res.status(200).json({
      status: 'success',
      data: { product: newProduct },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  next();
};
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Products.findById(req.params.id);
    return res.status(200).json({
      status: 'OK',
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const updateProduct = await Products.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'OK',
      data: updateProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
 exports.deleteProduct= async (req, res, next) => {
     try{
         const product = await Products.findByIdAndDelete(req.params.id);
         res.status(204).json({
             status: 'deleted',
             data:null,
         })
     }catch (err) {
        res.status(500).json({
          message: err.message,
          status: 'Internal Server Error',
        });
      }
 }