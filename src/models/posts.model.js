const { updateOne } = require('./posts.mongo')
const postsDatabase = require('./posts.mongo')

async function getAllPosts() {
	const allposts = await postsDatabase.find({}, { _id: 0, __v: 0 }).sort('-postId')
	return allposts
}

async function getLatestPostId() {
	const latestPost = await postsDatabase.findOne().sort('-postId')

	if (!latestPost) {
		return 0
	}
	return latestPost.postId
}

async function AddNewPost(post) {
	const latestPostId = await getLatestPostId()
	newPost = {
		userID: post.userID,
		profileName: post.profileName,
		profilePicture: post.profilePicture,
		postTitle: post.postTitle,
		postContent: post.postContent,
		postId: latestPostId + 1,
		comments: [],
		likes: []
	}

	const savedpost = await postsDatabase.findOneAndUpdate({ postId: newPost.postId }, newPost, {
		upsert: true,
		new: true
	})
	return savedpost
}

async function getOnePost(id) {
	const post = await postsDatabase.findOne({ postId: id }, { _id: 0, __v: 0 })
	return post
}

async function deletePost(id) {
	const post = await postsDatabase.deleteOne({ postId: id })
	return post
}

async function updateLikes(id, user) {
	const post = await postsDatabase.findOne({ postId: id }, { likes: 1 })
	if (!post) {
		return null
	}
	const likeSet = new Set(post.likes)
	if (likeSet.has(user)) {
		likeSet.delete(user)
	} else {
		likeSet.add(user)
	}
	const updatedLikes = [...likeSet]
	const updatedPost = await postsDatabase.updateOne({ postId: id }, { likes: updatedLikes })
	return updatedPost
}

module.exports = { getAllPosts, AddNewPost, getOnePost, deletePost, updateLikes }
