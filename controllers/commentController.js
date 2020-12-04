const Comment = require('./../models/commentModel');

exports.store = async (req, res, next) => {
  try {
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

exports.showProduct = async (req, res, next) => {
  try {
    const comments = await Comment.find({product: req.body.id});
    return res.status(200).json({
      status: 'OK',
      data: {comment: comments},
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};