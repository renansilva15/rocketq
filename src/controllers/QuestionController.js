const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
  
    const question = req.body.question
    const roomId = req.params.room

    await db.run(`INSERT INTO questions (
      title,
      read,
      room
    )
    VALUES (
      "${question}",
      0,
      ${roomId}
    )`)

    res.redirect(`/room/${roomId}`)
  },

  async index(req, res) {
    const db = await Database()

    const roomId = req.params.room
    const questionId = req.params.question
    const action = req.params.action
    const password = req.body.password

    const checkRoom = await db.get(`SELECT *
    FROM rooms
    WHERE id = ${roomId}
    `)

    if(checkRoom.pass == password) {
      if(action == 'delete') {
        await db.run(`DELETE
        FROM questions
        WHERE id = ${questionId}
        `)

      } else {
        await db.run(`UPDATE questions
        SET read = 1
        WHERE id = ${questionId}
        `)

      }
      res.redirect(`/room/${roomId}`)
    }else {
      res.render('incorrect-pass', {roomId: roomId})

    }
  }
}