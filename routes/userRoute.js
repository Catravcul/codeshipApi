const express = require('express')
const {login, signup, index, update, drop, show, updateSession} = require('../controllers/userController')
const route = express.Router()
const publicRoute = express.Router()

publicRoute.get('/:id', show)

publicRoute.route('/')
.put( signup )
.post( login )

route.route('/')
.get( updateSession )
.patch( update )
.delete( drop )

route.get('/all', index)

module.exports = {
    userRoute: route,
    userPublicRoute: publicRoute
}
