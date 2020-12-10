const express = require('express')
const {store, destroy, show, update, index, drop} = require('../controllers/productController')
const route = express.Router()
const publicRoute = express.Router()

publicRoute.get('/', index )

publicRoute.get('/:id', show)
  
route
  .route('/')
  .put( store )
  .delete( drop )
route
  .route('/:id')
  .patch( update )
  .delete( destroy )

module.exports = {
  productRoute: route,
  productPublicRoute: publicRoute
}
