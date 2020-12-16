const Comment = require('./../models/commentModel');

exports.store = async (req, res) => {
  try {
    req.body.owner = req.id
    const newComment = await Comment.create(req.body);
    return res.status(200).json({
      comment: newComment
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.showAll = async (req, res) => {
  try {
    const User = require('../models/userModel')
    const comments = await Comment.find(req.body)
    const result = []
    for(const commentObj of comments){
      const {img_path, username, _id: user_id} = await User.findById(commentObj.owner)
      const {comment} = commentObj
      result.push({comment, img_path, username, user_id})
    }
    return res.status(200).json({
      comments: result
    });
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.update = async (req, res) => {
  try{
    updated = await Comment.findOneAndUpdate({
      owner: req.body.id,
      product: req.body.productId
    })
    return res.status(200).json({
      comment: updated
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}

exports.drop = async (req, res) => {
  try{
    const result = await Comment.remove({}, err => {
      return err
    })
    res.status(200).json({
      result: result,
    })
  } catch(err) {
    res.status(400).json({
      err: err.message
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
      result: result
    })
  } catch (err) {
    res.status(400).json({
      err: err.message
    })
  }
}