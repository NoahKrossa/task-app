const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    title: {type: String, required: true},
    id: {type:String},
    description: { type: String },
    completed: {type: Boolean, default: false},
    board: {
      type: string, ref: 'Board', required: true
    }
})


todoSchema.pre('save', function(done) {
    const todo = this
    todo.id = require('uuid').v4()
    done()
})

module.exports = mongoose.model('todo', todoSchema)