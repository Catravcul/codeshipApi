const express = require('express')
const router = express.Router()
const publicRouter = express.Router()


publicRouter
    .route('/')
    .get((req, res, next) => {
        res.sendFile(process.cwd() + '/public/login.html')
    })

publicRouter.use((req, res, next) => {
    if (req.body.serverId) {
        next()
    } else {
        res.redirect('/')
    }
})

publicRouter
    .route('/')
    .post((req, res, next) => {
        res.sendFile(process.cwd() + '/public/index.html')
    })
publicRouter
    .route('/comment')
    .post((req, res, next) => {
        res.sendFile(process.cwd() + '/public/comment.html')
    })

module.exports = {
    serverRoute: router,
    serverPublicRoute: publicRouter
}