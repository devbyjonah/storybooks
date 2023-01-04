const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../controllers/auth')

// Auth with google
router.get('/google', authController.google)
// google auth callback
router.get('/google/callback', authController.googleCallback, authController.loginSuccess)
// logout user
router.get('/logout', authController.logout)

module.exports = router