const Todo = require("./todo.model");

module.exports = {
  /** Return all todos */
  async getTodos(req, res, next) {
    try {
      const todos = await Todo.find({ isDone: false });
      if (todos.length === 0) return res.status(404).send("not found");
      else res.send(todos);
      console.log("Getting todos");
      delete todos;
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },

  /** Return completed todos */
  async getCompletedTodos(req, res, next) {
    try {
      const completedTodos = await Todo.find({ completed: true }).exec();
      if (completedTodos.length == 0) return res.status(404).send("not found");
      res.status(200).send(completedTodos);
      delete completedTodos;
    } catch (err) {
      console.log(err);
    }
  },

  
  async addTodo(req, res) {
    try {
      const newTodo = await new Todo(req.body);
      const result = await newTodo.save();
      console.log(result);
      res.status(200).send("Added new todo!");
      res.end();
      delete newTodo;
      delete result;
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },

  async updateTodo(req, res) {
    try {
      let todoId = req.params["todoId"];
      let updates = req.body;
      const result = await Todo.updateOne({ _id: todoId }, updates).exec();
      console.log(result);
      res.status(200).send("Updated todo!");
      delete todoId;
      delete updates;
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },

  async removeTodo(req, res) {
    try {
      let todoId = req.params["todoId"];
      const result = await Todo.deleteOne({ _id: todoId }).exec();
      console.log(result);
      res.status(200).send("One todo was be deleted!");
      delete todoId;
      delete result;
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },

  async updateTodoState(req, res) {
    try {
      let state = req.body.isDone;
      console.log(typeof state);
      if (typeof state === undefined || typeof state !== "boolean")
        return res.status(400).send("Bad request!");
      let todoId = req.params["todoId"];
      const result = Todo.updateOne({ _id: todoId }, { isDone: state }).exec();
      console.log(result);
      res.status(200).send("Updated todo state!");
      delete state;
      delete todoId;
    } catch (err) {
      console.log(err);
      return res.status(500).send("Something brock!");
    }
  },
};
