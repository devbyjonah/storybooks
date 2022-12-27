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

// direct requests to router files
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))