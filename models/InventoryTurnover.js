const mongoose = require('mongoose')
const { Schema, model } = mongoose

const inventoryTurnoverSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  meta: {
    type: Number,
    required: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  fechaDeCreacion: {
    type: Date,
    default: Date.now(),
    required: true
  }
})

inventoryTurnoverSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const InventoryTurnover = model('InventoryTurnover', inventoryTurnoverSchema)

module.exports = InventoryTurnover
