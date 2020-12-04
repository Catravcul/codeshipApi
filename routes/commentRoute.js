const express = require('express')
const CommentController = require('./../controllers/commentController')
const router = express.Router()

router
  .route('/')
  .post(CommentController.store)
  .delete(CommentController.destroy)
router.route('/:id')
.get(CommentController.showProduct)

module.exports = router
