const { getAllUsers, getOneUser } = require('../../models/users.model')

async function httpGetAllUsers(req, res) {
	const allUsers = await getAllUsers()
	return res.status(200).json(allUsers)
}

async function httpGetOneUser(req, res) {
	const id = req.user
	const user = await getOneUser(id)
	return res.status(200).json(user)
}

module.exports = { httpGetAllUsers }
