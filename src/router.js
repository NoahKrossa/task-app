const {Router} = require('express')
const taskCtrl = require('./task.controller')

const indexRouter = Router()

// Get all tasks
indexRouter.get('/task',taskCtrl.getTasks)

// Get all tasks
indexRouter.get('/task/done',taskCtrl.doneTasks)

// Add new task
indexRouter.post('/task',taskCtrl.addTask)

// Delete task
indexRouter.delete('/task/:taskId', taskCtrl.removeTask)

// Update task
indexRouter.put('/task/:taskId',taskCtrl.updateTask)

// Update task state
indexRouter.put('/task/:taskId/state', taskCtrl.updateTaskState)

// Exporting Task Controller
module.exports = indexRouter