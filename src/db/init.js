const Database = require('./config')

const initDb = {
  async init() {
    const db = await Database()

    await db.exec(`DROP TABLE IF EXISTS rooms;
    CREATE TABLE rooms (
    id INTEGER PRIMARY KEY,
    pass TEXT
    )`)

    await db.exec(`DROP TABLE IF EXISTS questions;
    CREATE TABLE questions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    read INT,
    room INT
    )`)

    await db.close()
  }
}

initDb.init()