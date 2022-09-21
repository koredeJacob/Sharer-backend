const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
	profilePicture: String,
	profileName: String,
	userID: {
		type: Number,
		required: true
	},
	postTitle: {
		type: String,
		required: true
	},
	postId: {
		type: Number,
		required: true
	},
	postContent: {
		type: String,
		required: true
	},
	likes: [Number],
	comments: [
		{
			userID: {
				type: Number,
				required: true
			},
			comment: {
				type: String,
				required: true
			}
		}
	],
	postDate: {
		type: Date,
		required: true,
		default: Date.now
	}
})

module.exports = mongoose.model('Post', postsSchema)
