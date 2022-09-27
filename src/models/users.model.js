const userDatabase = require('./users.mongo')

async function getLatestUserId() {
	const latestId = await userDatabase.findOne().sort('-userID')

	if (!latestId) {
		return 0
	}
	return latestId.userID
}

async function createUser(id, name, picture) {
	const user = await userDatabase.findOne({ googleId: id }, { _id: 0, __v: 0 })
	if (!user) {
		const latestuserId = await getLatestUserId()
		const userdetails = {
			googleId: id,
			profileName: name,
			profilePicture: picture,
			userID: latestuserId + 1
		}
		const newuser = userDatabase.updateOne({ googleId: id }, userdetails, { upsert: true })
		return newuser
	}
	return user
}

async function getAllUsers() {
	const users = await userDatabase.find({}, { __v: 0, _id: 0 })

	return users
}

async function getOneUser(id) {
	const user = await userDatabase.findOne({ googleId: id }, { _id: 0, __v: 0 })
	return user
}

module.exports = { createUser, getAllUsers, getOneUser }
