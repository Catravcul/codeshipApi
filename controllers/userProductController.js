const UserProduct = require('../models/userProductModel');

exports.show = async (req, res, next) => {
    try {
      const products = await UserProduct.find({owner: req.body.id})
      return res.status(200).json({
        status: 'OK',
        data: { products: products },
      })
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.message,
      })
      next();
    }
}
    
exports.store = async (req, res, next) => {
  try {
    const newProduct = await UserProduct.create(req.body)
    return res.status(200).json({
      status: 'success',
      data: { product: newProduct },
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }

  next()
}

exports.destroy = async (req, res, next) => {
  let result;
  try{
    result = await UserProduct.remove({}, err => {
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