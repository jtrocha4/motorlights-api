const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  nombreUsuario: {
    type: String,
    required: true
  },
  nombre: {
    type: String,
    required: true
  },
  hashContrasena: {
    type: String,
    required: true
  },
  vendedores: [{
    type: Schema.Types.ObjectId,
    ref: 'Seller'
  }],
  productos: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  clientes: [{
    type: Schema.Types.ObjectId,
    ref: 'Customer'
  }],
  ventas: [{
    type: Schema.Types.ObjectId,
    ref: 'Sale'
  }],
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

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.hashContrasena
  }
})

const User = model('User', userSchema)

module.exports = User
