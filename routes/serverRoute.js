const express = require('express')
const router = express.Router()
const publicRouter = express.Router()


publicRouter.get('/login',(req, res) => {
    res.sendFile(process.cwd() + '/server/login.html')
})
publicRouter.get('/signup', (req, res) => {
    res.sendFile(process.cwd() + '/server/signup.html')
})

publicRouter.use((req, res, next) => {
    if (req.body.serverId) {
        next()
    } else {
        res.redirect('/server/login')
    }
})

publicRouter
    .route('/')
    .post((req, res, next) => {
        res.sendFile(process.cwd() + '/server/index.html')
    })
publicRouter.post('/comment', (req, res) => {
        res.sendFile(process.cwd() + '/server/comment.html')
    })
    
publicRouter.post('/user', (req, res) => {
        res.sendFile(process.cwd() + '/server/user.html')
    })

publicRouter.post('/spaceship', (req, res) => {
    res.sendFile(process.cwd() + '/server/spaceship.html')
})
    
    
module.exports = {
    serverRoute: router,
    serverPublicRoute: publicRouter
}