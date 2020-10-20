const mongoose = require('mongoose')

module.exports = async ()=> {
  // mongodb connection
  mongoose.set('useNewUrlParser', true)
  mongoose.set('useUnifiedTopology', true)
  try {
    await mongoose.connect('mongodb://localhost:27017/todos')
    console.log('Connected to mongodb database successfully!') 
  } catch(error) {
    console.log(error)
  }
}