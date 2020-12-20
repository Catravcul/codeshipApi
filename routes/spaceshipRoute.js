const express = require('express')
const {store, drop, show, update, index} = require('./../controllers/spaceshipController')
const router = express.Router()
const publicRouter = express.Router()

publicRouter.get('/:userId', show)

router
  .route('/')
  .get( show )
  .put( store )
  .delete( drop )
  .patch( update )

router.get('/all', index)

router
  .route('/:userId')
  .patch( update )

module.exports = {
  spaceshipRoute: router,
  spaceshipPublicRoute: publicRouter
}
