const express = require('express')
const {store, drop, showAll, update, destroy} = require('./../controllers/commentController')
const route = express.Router()
const publicRoute = express.Router()

publicRoute
  .route('/')
  .post( showAll )

route
  .route('/')
  .put( store )
  .delete( drop )

route
  .route('/:productId')
  .delete( destroy )
  .patch( update )

module.exports = {
  commentRoute: route,
  commentPublicRoute: publicRoute
}
