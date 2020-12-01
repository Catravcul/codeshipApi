const express = require('express');
const SpaceshipController = require('./../controllers/spaceshipController');
const router = express.Router();

router
  .route('/')
  .post(SpaceshipController.store);
router.route('/:id')
.get(SpaceshipController.show)
.patch(SpaceshipController.update);

module.exports = router;
