require('dotenv').config()
const mongoose = require('mongoose')

const connectionString = process.env.MONGO_DB_URI

// conexion a mongoDb
const conecctionDb = async () => {
  try {
    await mongoose.connect(connectionString)
    console.log('Database connected')
  } catch (error) {
    throw new Error(error)
  }
}

conecctionDb()
