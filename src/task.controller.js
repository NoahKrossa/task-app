const Task = require('./task.model')

module.exports = {
    
    async getTasks(req, res, next) {

       try { 
            const tasks = await Task.find({})
            if(tasks.length === 0) return res.status(404).send('not found')
            else res.send(tasks)
            console.log('Getting tasks')
            delete(tasks)
        } catch(err) {
            console.log(err)
            return res.status(500).send('Something brock!')
        }
    },
    async doneTasks(req, res, next) {
        try {
            const doneTasks = await Task.find({isDone: true}).exec()
            if(doneTasks.length == 0) return res.status(404).send('not found')
            res.status(200).send(doneTasks)
            delete(doneTasks)
        } catch(err) {
            console.log(err)
        }
    },
    async addTask(req, res) {

        try {
            const newTask = await new Task(req.body)
            const result = await newTask.save()
            console.log(result)
            res.status(200).send('Added new task!')
            res.end()
            delete(newTask)
            delete(result)

        } catch(err) {
            console.log(err)
            return res.status(500).send('Something brock!')
        }
    },

    async updateTask(req, res) {
        
        try {
            let taskId = req.params['taskId']
            let updates = req.body
            const result = await Task.updateOne({_id: taskId}, updates).exec()
            console.log(result)
            res.status(200).send('Updated task!')
            delete(taskId)
            delete(updates)

        } catch(err) {
            console.log(err)
            return res.status(500).send('Something brock!')
        }
    },

    async removeTask(req, res) {
        
        try {
            let taskId = req.params['taskId']
            const result = await Task.deleteOne({_id: taskId}).exec()
            console.log(result)
            res.status(200).send('One task was be deleted!')
            delete(taskId)
            delete(result)

        } catch(err) {
            console.log(err)
            return res.status(500).send('Something brock!')
        }
    },

    async updateTaskState(req, res) {
        try {
            let state = req.body.isDone
            console.log(typeof(state))
            if(typeof(state) === undefined || typeof(state) !== 'boolean') return res.status(400).send('Bad request!')
            let taskId = req.params['taskId']
            const result = Task.updateOne({_id: taskId}, {isDone: state}).exec()
            console.log(result)
            res.status(200).send('Updated task state!')
            delete(state)
            delete(taskId)

        } catch(err) {
            console.log(err)
            return res.status(500).send('Something brock!')
        }
    }
}