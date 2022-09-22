const express = require('express')
const path = require('path')
const api = require('./routes/api')

const app = express()

app.use(express.json())

app.use('/v1', api)

app.get('/', (req, res) => {
	return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
