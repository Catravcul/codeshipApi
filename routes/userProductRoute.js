const express = require('express');
const UserProductController = require('./../controllers/userProductController');
const router = express.Router();

router
  .route('/')
  .post(UserProductController.store);
router.route('/:id')
  .get(UserProductController.show);

module.exports = router;
