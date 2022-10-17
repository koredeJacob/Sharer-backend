const express = require('express')
const { httpGetAllUsers, httpGetOneUser } = require('./users.controller')

const usersRouter = express.Router()

usersRouter.get('/', httpGetAllUsers)
usersRouter.get('/user', httpGetOneUser)

module.exports = usersRouter
