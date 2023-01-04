const passport = require('passport')

exports.google = passport.authenticate('google', { scope: ['profile'] })
exports.googleCallback = passport.authenticate('google', { failureRedirect: '/' })

exports.loginSuccess = (req, res) => {
	res.redirect('/dashboard')
}

exports.logout = (req, res, next) => {
	req.logout((error) => {
        if (error) { return next(error) }
        res.redirect('/')
    })
}