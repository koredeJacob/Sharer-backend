const { getAllUsers } = require('../../models/users.model')

async function httpGetAllUsers(req, res) {
	const allUsers = await getAllUsers()
	return res.status(200).json(allUsers)
}

module.exports = { httpGetAllUsers }
