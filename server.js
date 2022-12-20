const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const ejsLayouts = require('express-ejs-layouts')
const connectDB = require('./config/db')

dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development'){
	app.use(morgan('dev'))
}

// ejs w/ layouts module
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.set('layout', './views/layouts/main')

// Routes
app.use('/', require('./routes/index'))

const PORT = process.env.PORT || 8000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`))