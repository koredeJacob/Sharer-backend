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

async function deletePost(id, userid) {
	const post = await postsDatabase.deleteOne({ postId: id, userID: userid })
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
	const updatedPost = await postsDatabase.findOneAndUpdate(
		{ postId: id },
		{ likes: updatedLikes },
		{ new: true }
	)
	return updatedPost
}

async function removeComment(commentid, id) {
	const post = await postsDatabase.findOne({ postId: id }, { comments: 1 })
	if (!post) {
		return null
	}
	const newcomment = post.comments.filter((item) => {
		return commentid !== item._id.toString()
	})
	console.log(newcomment)
	const newpost = await postsDatabase.findOneAndUpdate(
		{ postId: id },
		{ comments: newcomment },
		{ new: true }
	)
	return newpost
}

async function addComment(userid, comment, id) {
	const post = await postsDatabase.findOne({ postId: id }, { comments: 1 })
	if (!post) {
		return null
	}
	newcomment = post.comments
	newcomment.push({ userID: userid, comment: comment })
	const newpost = await postsDatabase.findOneAndUpdate(
		{ postId: id },
		{ comments: newcomment },
		{ new: true }
	)
	return newpost
}

module.exports = {
	getAllPosts,
	AddNewPost,
	getOnePost,
	deletePost,
	updateLikes,
	removeComment,
	addComment
}
