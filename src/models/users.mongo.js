const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true
	},
	profilePicture: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	}
})

module.exports = mongoose.model('User', usersSchema)
