const http = require('http')
require('dotenv').config()

const app = require('./app')
const { mongoconnect } = require('./services/mongo')

const server = http.createServer(app)

const PORT = process.env.PORT || 5000

async function serve() {
	await mongoconnect()
	server.listen(PORT, () => {
		console.log(`listening on port... ${PORT}`)
	})
}

serve()
