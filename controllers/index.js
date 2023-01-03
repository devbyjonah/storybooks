const Story = require('../models/Story')

module.exports = {
	loginForm: (req, res) => {
		res.render('login', { layout:'./layouts/login' })
	},
	loadDashboard: async (req, res) => {
		try {
			const stories = await Story.find({ user: req.user.id}).lean()
			res.render('dashboard', {
				name: req.user.firstName,
				stories
			})
		} catch(err) {
			console.error(err)
			res.render('error/500')
		}
	},
}