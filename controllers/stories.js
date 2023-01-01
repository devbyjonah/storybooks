const Story = require('../models/Story')

module.exports = {
	addStory: (req,res) => {
		res.render('stories/add')
	},
	getStories: async (req, res) => {
		try {
			let stories = await Story.find({ status:'public' })
				.populate('user')
				.sort({ createdAt:'desc' })
				.lean()

			res.render('stories/index', {
				stories
			})
		}catch(err) {
			console.error(err)
			res.render('error/500')
		}
	}
}