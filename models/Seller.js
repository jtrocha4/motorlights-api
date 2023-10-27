const mongoose = require('mongoose')
const { Schema, model } = mongoose

const sellerSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  identificacion: {
    type: String,
    required: true
  },
  // telefono: {
  //   type: Number,
  //   required: true
  // },
  // correoElectronico: {
  //   type: String,
  //   required: true
  // },
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

sellerSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Seller = model('Seller', sellerSchema)

module.exports = Seller
