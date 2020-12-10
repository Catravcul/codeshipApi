const Comment = require('./../models/commentModel');

exports.store = async (req, res, next) => {
  try {
    req.body.owner = req.id
    const newComment = await Comment.create(req.body);
    return res.status(200).json({
      status: 'success',
      data: { comment: newComment },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }

  next();
};

exports.showAll = async (req, res, next) => {
  try {
    const comments = await Comment.find(req.body)
    return res.status(200).json({
      status: 'OK',
      data: {comment: comments},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}

exports.update = async (req, res, next) => {
  try{
    result = await Comment.findOneAndUpdate({
      owner: req.body.id,
      product: req.body.productId
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}

exports.drop = async (req, res, next) => {
  try{
    const result = await Comment.remove({}, err => {
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

exports.destroy = async (req, res, next) => {
  try{
    const result = await Comment.remove({
      owner: req.body.id,
      product: req.body.productId
    }, err => {
      return err
    })
    res.status(200).json({
      status: 'OK',
      data: {result: result},
    })
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    })
  }
}