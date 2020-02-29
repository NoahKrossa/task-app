// Dependencies
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

// mongodb connection
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useFindAndModify', true)
mongoose.connect('mongodb://localhost:27017/demo')
.then(result => console.log('Connected to mongodb database'))
.catch(err => console.log(err))

// Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))

// Routing
app.use('/api', require('./router'))

// Server settings
app.set('port', process.env.PORT || 8080)

// Start server
app.listen(app.get('port'), 
        ()=> console.log(`Server running on port ${app.get('port')}`))