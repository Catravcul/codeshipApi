const Product = require('../models/productModel');
exports.index = async (req, res, next) => {
  try {
    const products = await Product.find();
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

exports.store = async (req, res, next) => {
  try {
    const img_path = 'img/product/' + Date.now() + req.files.img.name;
    req.body.img_path = img_path;
    const newProduct = await Product.create(req.body);
    req.files.img.mv('public/' + img_path, err => console.log(err));
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
exports.show = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
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

exports.update = async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'OK',
      data: updatedProduct,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};
 exports.destroy= async (req, res, next) => {
     try{
         const result = await Product.findByIdAndDelete(req.params.id);
         res.status(204).json({
             status: 'deleted',
             data: {result: result},
         })
     }catch (err) {
        res.status(500).json({
          message: err.message,
          status: 'Internal Server Error',
        });
      }
 }

 exports.drop = async (req, res, next) => {
  let result;
  try{
    result = await Product.remove({}, err => {
      return err
    })
    res.status(200).json({
      status: 'OK',
      data: {result: result},
    })
  } catch(err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}