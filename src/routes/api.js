const express = require('express')
const postsRouter = require('./posts/posts.router')
const usersRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

const api = express.Router()

api.use('/users', usersRouter)
api.use('/posts', postsRouter)
api.use('/auth', authRouter)

module.exports = api
