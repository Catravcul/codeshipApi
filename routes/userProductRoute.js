const express = require('express')
const {store, drop, show} = require('./../controllers/userProductController')
const router = express.Router()
const publicRouter = express.Router()

router
  .route('/')
  .put( store )
  .delete( drop )
publicRouter.route('/:userId')
  .get( show )

module.exports = {
  userProductRoute: router,
  userProductPublicRoute: publicRouter
}
