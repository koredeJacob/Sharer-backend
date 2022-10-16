const express = require('express')
const morgan = require('morgan')
const path = require('path')
const api = require('./routes/api')
const helmet = require('helmet')

const app = express()

app.use((req, res, next) => {
	res.set('Access-Control-Allow-Origin', 'http://localhost:3000')
	next()
})

app.use(morgan('combined'))

app.use(helmet())

app.use(express.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.use('/v1', api)

app.get('/*', (req, res) => {
	return res.sendFile(path.join(__dirname, '..', 'public', 'index.html'))
})

module.exports = app
