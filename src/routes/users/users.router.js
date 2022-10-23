const express = require('express')
const { httpGetAllUsers, httpGetOneUser, httpGetUserById } = require('./users.controller')

const usersRouter = express.Router()

usersRouter.get('/', httpGetAllUsers)
usersRouter.get('/user', httpGetOneUser)
usersRouter.get('/:id', httpGetUserById)

module.exports = usersRouter
