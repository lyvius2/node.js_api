const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const app = express()
const user = require('./api/user/app')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/users', user)

module.exports = app