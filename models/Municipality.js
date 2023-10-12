const mongoose = require('mongoose')
const { Schema, model } = mongoose

const municipalitySchema = new Schema({
  nombre: String,
  idDepartamento: String
})

municipalitySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Municipality = model('Municipality', municipalitySchema)

module.exports = Municipality
