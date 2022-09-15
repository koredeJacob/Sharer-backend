const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
	profilePicture: String,
	profileName: String,
	userID: {
		type: String,
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
	likes: [String],
	comments: [
		{
			userID: {
				type: String,
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
