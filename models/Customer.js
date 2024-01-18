const mongoose = require('mongoose')
const { Schema, model } = mongoose

const customerSchema = new Schema({
  identificacion: {
    type: Number,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  telefono: {
    type: Number,
    required: true
  },
  departamento: {
    type: String,
    required: true
  },
  municipio: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  estado: {
    type: Boolean,
    default: true,
    required: true
  },
  fechaDeCreacion: {
    type: Date,
    default: Date.now(),
    required: true
  }
})

customerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Customer = model('Customer', customerSchema)

module.exports = Customer
