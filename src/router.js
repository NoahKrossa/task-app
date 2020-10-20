const {Router} = require('express')
const todoController = require('./todo.controller')

const indexRouter = Router()

// Get all tasks
indexRouter.get('/task',todoController.getTasks)

// Get all done tasks
indexRouter.get('/task/done',todoController.getCompletedTodos)

// Add new task
indexRouter.post('/task',todoController.addTask)

// Delete task
indexRouter.delete('/task/:taskId', todoController.removeTodo)

// Update task
indexRouter.put('/task/:taskId',todoController.updateTodo)

// Update task state
indexRouter.put('/task/:taskId/state', todoController.updateTodoState)

// Exporting Task Controller
module.exports = indexRouter