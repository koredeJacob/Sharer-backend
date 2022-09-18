const {
	getAllPosts,
	AddNewPost,
	getOnePost,
	deletePost,
	updateLikes
} = require('../../models/posts.model')

async function httpGetAllPosts(req, res) {
	const allposts = await getAllPosts()
	return res.status(200).json(allposts)
}

async function httpAddNewPost(req, res) {
	const postdata = req.body
	if (!postdata.postContent || !postdata.postTitle || !postdata.userID) {
		return res.status(400).json({
			error: 'missing required property'
		})
	}

	const addpost = await AddNewPost(postdata)
	return res.status(201).json(addpost)
}

async function httpGetPostById(req, res) {
	const { id } = req.params
	if (isNaN(id)) {
		return res.status(400).json({
			error: 'invalid id'
		})
	}
	const singlePost = await getOnePost(Number(id))
	if (!singlePost) {
		return res.status(404).json({
			error: 'post not found'
		})
	}
	return res.status(200).json(singlePost)
}

async function httpDeletePost(req, res) {
	const { id } = req.params
	if (isNaN(id)) {
		return res.status(400).json({
			error: 'invalid id'
		})
	}
	const deletedpost = await deletePost(Number(id))
	if (deletedpost.deletedCount < 1) {
		return res.status(404).json({
			error: 'post not found'
		})
	}
	return res.status(200).json({
		message: 'deleted post'
	})
}

async function httpUpdateLikes(req, res) {
	const { id } = req.params
	const { userID } = req.body
	if (isNaN(id)) {
		return res.status(400).json({
			error: 'invalid id'
		})
	}
	const post = await updateLikes(Number(id), userID)
	if (!post) {
		return res.status(404).json({
			error: 'post not found'
		})
	}
	return res.status(200).json({
		message: 'post likes updated'
	})
}

module.exports = {
	httpGetAllPosts,
	httpAddNewPost,
	httpGetPostById,
	httpDeletePost,
	httpUpdateLikes
}
