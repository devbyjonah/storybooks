const express = require('express')
const router = express.Router()

const { ensureAuth, ensureGuest } = require('../middleware/auth')
const indexController = require('../controllers/index')

router.get('/', ensureGuest, indexController.loginForm)
router.get('/dashboard', ensureAuth, indexController.loadDashboard)

module.exports = router