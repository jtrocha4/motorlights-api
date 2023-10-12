const mongoose = require('mongoose')
const { Schema, model } = mongoose

const departmentSchema = new Schema({
  nombre: String,
  municipios: [{
    type: Schema.Types.ObjectId,
    ref: 'Municipality'
  }]
})

departmentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Department = model('Department', departmentSchema)

module.exports = Department
