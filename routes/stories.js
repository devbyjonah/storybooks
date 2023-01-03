const express = require('express')
const router = express.Router()
const storiesController = require('../controllers/stories')
const { ensureAuth } = require('../middleware/auth')

const Story = require('../models/Story')

router.get('/', ensureAuth, storiesController.getStories)
router.get('/add', ensureAuth, storiesController.addForm)
router.get('/:id', ensureAuth, storiesController.getStory)
router.get('/edit/:id', ensureAuth, storiesController.editStory)
router.get('/user/:userId', ensureAuth, storiesController.userStories)

router.post('/', ensureAuth, storiesController.createStory)

router.put('/:id', ensureAuth, storiesController.updateStory)

router.delete('/:id', ensureAuth, storiesController.deleteStory)

module.exports = router