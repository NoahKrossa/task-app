const Board = require('./board.model')

const getBoards = async (req, res) => {
  try {
    const doc = await Board.find()
    res.json({
      boards: doc
    })
  } catch(e) {
     console.log(e)
     return res.sendStatus(500)
  }
}

const addBoard = async (req, res) => {
  try {
    const newBoard = new Board(req.body)
    const doc = await newBoard.save()
    res.json({
      message: 'Added new board',
      board: doc
    })
  } catch (e) {
    console.log(e)
    return res.sendStatus(500)
  }
}

const removeBoard = async (req, res) => {
  try {
    await Board.deleteOne({publicId: req.params['boardId']}).exec()
    res.json({
      message: 'Board removed successfully!'
    })
  } catch (e) {
    console.log(e)
    return res.sendStatus(500)
  }
}

const updateBoardName = async (req, res) => {
  try {
    const doc = await Board.updateOne({publicId: req.params['boardId']}, {name: req.body.name}).exec()
    res.json({
      message: 'Board name updated successfully!',
      updatedBoard: doc
    })
  } catch (e) {
    console.log(e)
    return res.sendStatus(500)
  }
}

module.exports = {
  getBoards,
  addBoard,
  removeBoard,
  updateBoardName
}