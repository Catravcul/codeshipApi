const express = require('express')
const {login, signup, index, update, drop, show} = require('../controllers/userController')
const route = express.Router()
const publicRoute = express.Router()

publicRoute.get('/:id', show)

publicRoute.route('/')
.put( signup )
.post( login )

route.patch('/:id', update)

route.route('/')
.get( index )
.patch( update )
.delete( drop )

module.exports = {
    userRoute: route,
    userPublicRoute: publicRoute
}
