const express = require('express')
const router = express.Router()
const publicRouter = express.Router()


publicRouter.get('/login',(req, res) => {
    
    res.sendFile(process.cwd() + '/public/login.html')
})
publicRouter.get('/signup', (req, res) => {
    
    res.sendFile(process.cwd() + '/public/signup.html')
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
        res.sendFile(process.cwd() + '/public/index.html')
    })
    publicRouter
    .route('/comment')
    .post((req, res, next) => {
        res.sendFile(process.cwd() + '/public/comment.html')
    })
    
    publicRouter
        .route('/user')
        .post((req, res, next) => {
            res.sendFile(process.cwd() + '/public/user.html')
        })
    
    
    module.exports = {
        serverRoute: router,
        serverPublicRoute: publicRouter
    }