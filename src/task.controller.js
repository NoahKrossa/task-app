const Task = require('./task.model')

module.exports = {
    getTasks(req, res) {
        Task.find()
        .then(doc => res.json(doc))
        .catch(err => res.send(err))
    },

    addTask(req, res) {
        const newTask = new Task(req.body)
        
        newTask.save()
        .then(result => {
            console.log('Added Post')
        })
        .catch(err =>{
            return res.status(500).send(err)
        })
        res.send('Added new task!')
        res.end()
    },

    updateTask(req, res) {
        Task.findByIdAndUpdate(req.params['taskId'], req.body)
        .exec()
        .then(result => {
            console.log('Updated task')
        })
        .catch(err => {
            throw err
        })
        res.send('Updated task :D')
        res.end()
    },

    removeTask(req, res) {
        
        Task.findByIdAndDelete(req.params['taskId'])
        .exec()
        .then(result => {
            console.log('deleted task')
        })
        .catch(err => {
            throw err
        })
        res.send('deleted task')
        res.end()
    },

    updateTaskState(req, res) {
        Task.findByIdAndUpdate(req.params['taskId'], {isDone: req.body.isDone})
        .exec()
        .then(result => {
            console.log('Updated task state')
        })
        .catch(err => {
            throw err
        })
        res.send('Updated task state')
        res.end()
    }
}