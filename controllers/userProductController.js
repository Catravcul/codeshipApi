const UserProduct = require('../models/userProductModel');

exports.show = async (req, res, next) => {
    try {
      const products = await UserProduct.find({owner: req.params.userId})
      return res.status(200).json({
        products: products
      })
    } catch (err) {
      res.status(404).json({
        err: err.message
      })
      next();
    }
}
    
exports.store = async (req, res, next) => {
  try {
    req.body.owner = req.id
    const newProduct = await UserProduct.create(req.body)
    return res.status(200).json({
      product: newProduct
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }

  next()
}

exports.drop = async (req, res, next) => {
  let result;
  try{
    result = await UserProduct.remove({}, err => {
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