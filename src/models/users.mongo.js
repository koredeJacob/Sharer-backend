const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
	googleId: {
		type: String,
		required: true
	},
	userID: {
		type: Number,
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
