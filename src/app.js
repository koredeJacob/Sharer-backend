const express = require('express')
const api = require('./routes/api')

const app = express()

app.use('/v1', api)

app.get('/', (req, res) => {
	return res.send('hello world')
})

module.exports = app
