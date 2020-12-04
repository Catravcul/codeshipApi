const express = require('express')
const SpaceshipController = require('./../controllers/spaceshipController')
const router = express.Router()

router
  .route('/')
  .post(SpaceshipController.store)
  .delete(SpaceshipController.destroy)
router.route('/:id')
.get(SpaceshipController.show)
.patch(SpaceshipController.update)

module.exports = router
