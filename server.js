// packages
const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const connectDB = require('./config/db')

// intialize environment / DB Connection / App
dotenv.config({ path: './config/config.env' })
connectDB()
const app = express()

// add body parser for submitting forms and JSON
app.use(express.urlencoded({ extended:false }))
app.use(express.json())

// Passport config
require('./config/passport')(passport)

// logging with morgan package
if (process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}

// set view engine to ejs and default layout to main
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.set('layout', './layouts/main')

// EJS Helpers
const { formatDate, truncate, stripTags, editIcon } = require('./helpers/ejs')
app.locals.formatDate = formatDate
app.locals.truncate = truncate
app.locals.stripTags = stripTags
app.locals.editIcon = editIcon

// Session middleware
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// setup static folder
app.use(express.static(path.join(__dirname, 'public')))

// Set Global Variables
app.use((req, res, next) => {
	res.locals.user = req.user || null
	next()
})

// direct requests to router files
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))