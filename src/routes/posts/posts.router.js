const express = require('express')

const {
	httpGetAllPosts,
	httpAddNewPost,
	httpGetPostById,
	httpDeletePost,
	httpUpdateLikes,
	httpRemoveComment,
	httpAddComment
} = require('./posts.controller')

const postsRouter = express.Router()
postsRouter.get('/', httpGetAllPosts)
postsRouter.get('/:id', httpGetPostById)
postsRouter.put('/updatelikes/:id', httpUpdateLikes)
postsRouter.put('/addcomment/:id', httpAddComment)
postsRouter.put('/removecomment/:id', httpRemoveComment)
postsRouter.post('/', httpAddNewPost)
postsRouter.delete('/:id', httpDeletePost)

module.exports = postsRouter
