const express = require('express');
const UserProductController = require('./../controllers/userProductController');
const router = express.Router();

router
  .route('/')
  .post(UserProductController.store)
  .delete(UserProductController.destroy)
router.route('/:id')
  .get(UserProductController.show);

module.exports = router;
