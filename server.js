// modules
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

// logging with morgan module
if (process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}

// ejs w/ layouts module
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.set('layout', './layouts/main')

// Session middleware
app.use(
	session({
		secret:'el gato',
		resave: false,
		saveUninitialized: false,
		store: new MongoStore({ mongooseConnection: mongoose.connection })
	})
)

// passport middleware
app.use(passport.initialize())
app.use(passport.session())

// static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))