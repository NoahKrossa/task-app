const mongoose = require('mongoose')
const Schema = mongoose.Schema

const boardSchema = new Schema({
  name: String,
  publicId: {
    type: String
  }
})

boardSchema.pre('save', function(done) {
  const todo = this
  todo.id = require('uuid').v4()
  done()
})

module.exports = mongoose.model('Board', boardSchema)