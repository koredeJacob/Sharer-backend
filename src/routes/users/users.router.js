const express = require('express')
const { httpGetAllUsers } = require('./users.controller')

const usersRouter = express.Router()

usersRouter.get('/', httpGetAllUsers)
module.exports = usersRouter
