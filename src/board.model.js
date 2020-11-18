const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
  name: String
})

module.exports = mongoose.model('Board', boardSchema)