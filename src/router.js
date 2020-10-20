const {Router} = require('express')
const todoController = require('./todo.controller')

const indexRouter = Router()

// Get all tasks
indexRouter.get('/todo',todoController.getTodos)

// Get all done tasks
indexRouter.get('/todo/completed',todoController.getCompletedTodos)

// Add new task
indexRouter.post('/todo',todoController.addTodo)

// Delete task
indexRouter.delete('/todo/:todoId', todoController.removeTodo)

// Update task
indexRouter.put('/todoId/:todoId',todoController.updateTodo)

// Update task state
indexRouter.put('/todo/state/:todoId', todoController.updateTodoState)

// Exporting Task Controller
module.exports = indexRouter