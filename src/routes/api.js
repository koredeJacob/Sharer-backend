const express = require('express')
const postsRouter = require('./posts/posts.router')
const usersRouter = require('./users/users.router')
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20')
const cookiesession = require('cookie-session')
const { createUser, getOneUser } = require('../models/users.model')

const api = express.Router()

const config = {
	CLIENT_ID: process.env.CLIENT_ID,
	CLIENT_SECRET: process.env.CLIENT_SECRET,
	COOKIE_KEY_1: process.env.KEY_1,
	COOKIE_KEY_2: process.env.KEY_2
}

const AUTH_OPTIONS = {
	callbackURL: '/v1/auth/google/callback',
	clientID: config.CLIENT_ID,
	clientSecret: config.CLIENT_SECRET
}

async function verifycallback(accessToken, refreshToken, profile, done) {
	const currentuser = await createUser(profile.id, profile.displayName, profile.photos[0].value)
	done(null, profile)
}

passport.serializeUser((user, done) => {
	done(null, user.id)
})

passport.deserializeUser((id, done) => {
	done(null, id)
})
passport.use(new Strategy(AUTH_OPTIONS, verifycallback))

api.use(
	cookiesession({
		name: 'session',
		maxAge: 60 * 24 * 60 * 60 * 1000,
		keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2]
	})
)

api.use(passport.initialize())
api.use(passport.session())

function checkedLoggedin(req, res, next) {
	console.log(req.user)
	const isLoggedin = req.isAuthenticated() && req.user
	if (!isLoggedin) {
		return res.status(401).json({
			error: 'you must log in'
		})
	}
	next()
}

api.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }))

api.get(
	'/auth/google/callback',
	passport.authenticate('google', {
		failureRedirect: '/v1/failure',
		successRedirect: '/v1/success',
		session: true
	})
)

api.get('/auth/logout', (req, res) => {
	req.logout()
	return res.redirect('/')
})

api.get('/failure', (req, res) => {
	return res.status(500).send('failed to log in')
})

api.get('/success', async (req, res) => {
	const userId = await getOneUser(req.user)
	return res.status(200).json({ userID: userId.userID })
})

api.use('/users', checkedLoggedin, usersRouter)
api.use('/posts', checkedLoggedin, postsRouter)

module.exports = api
