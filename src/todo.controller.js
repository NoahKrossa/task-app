const Todo = require("./todo.model");

module.exports = {
  /** Return all todos */
  async getTodos(req, res, next) {
    try {
      const todoList = await Todo.find()
      if(!todoList.length) return res.sendStatus(404)
      res.send(todoList)
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },

  /** Return completed todos */
  async getCompletedTodos(req, res, next) {
    try {
      const completedTodos = await Todo.find({ completed: true }).exec();
      if (!completedTodos.length) return res.status(404).send("not found");
      res.send(completedTodos);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500)
    }
  },


  async addTodo(req, res) {
    try {
      const newTodo = await new Todo(req.body);
      const result = await newTodo.save();

      res.status(200).send("Added new todo!");

    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },

  async updateTodo(req, res) {
    try {
      
      const todoId = req.params["todoId"];
      const {title} = req.body;
      if(!title) return res.sendStatus(400)
      await Todo.findOneAndUpdate({id:todoId}, {title})
      res.status(200).send("Updated todo!");

    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },

  async removeTodo(req, res) {
    try {
      const todoId = req.params["todoId"];
      await Todo.deleteOne({ id: todoId }).exec();
      res.status(200).send("One todo was be deleted!");

    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },

  async updateTodoState(req, res) {
    try {
      const todoId = req.params["todoId"];
      const result = Todo.updateOne({ id: todoId }, { completed: true }).exec();
      res.status(200).send("Updated todo state!");

    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },
};
