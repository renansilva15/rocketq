const { render } = require('ejs')
const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const password = req.body.password

    let isRoom = true

    while(isRoom) {
      var roomId = ''

      for(i = 0; i < 6; i++) {
        roomId += Math.floor(Math.random() * 10).toString()
      }
  
      const roomExistIds = await db.all(`SELECT id
      FROM rooms;
      `)
  
      isRoom = roomExistIds.some(roomExistId => roomExistId === roomId)
    }

    await db.run(`INSERT INTO rooms
    VALUES (
      ${parseInt(roomId)},
      ${password}
    )`)

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  async open (req, res) { /*  */
    const db = await Database()
    const roomId = req.params.room

    const questions = await db.all(`SELECT *
    FROM questions
    WHERE room = ${roomId} and read = 0
    `)

    const readQuestions = await db.all(`SELECT *
    FROM questions
    WHERE room = ${roomId} and read = 1
    `)

    let isNoQuestions = false

    if(questions.length == 0 && readQuestions.length == 0) {
      isNoQuestions = true
    }

    res.render('room', {roomId: roomId, questions: questions, readQuestions: readQuestions, isNoQuestions: isNoQuestions})
  },

  async enter (req, res) {
    const db = await Database()
    const roomId = req.body.roomId

    const checkRoom = await db.get(`SELECT *
    FROM rooms
    WHERE id = ${roomId}
    `)

    if(checkRoom) {
      res.redirect(`/room/${roomId}`)

    }else {
      res.redirect('/')

    }
  }
}