const { getAllUsers, getOneUser, getUserById } = require('../../models/users.model')

async function httpGetAllUsers(req, res) {
	const allUsers = await getAllUsers()
	return res.status(200).json(allUsers)
}

async function httpGetOneUser(req, res) {
	const id = req.user
	const user = await getOneUser(id)
	if (!user) {
		return res.status(404).json({
			error: 'user not found'
		})
	}
	return res.status(200).json(user)
}

async function httpGetUserById(req, res) {
	const { id } = req.params
	const user = await getUserById(Number(id))
	if (!user) {
		return res.status(404).json({
			error: 'user not found'
		})
	}
	return res.status(200).json(user)
}

module.exports = { httpGetAllUsers, httpGetOneUser, httpGetUserById }
