const mongoose = require('mongoose')
const { Schema, model } = mongoose

const inventoryTurnoverSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  codigo: {
    type: String,
    required: true
  },
  categoriaMotos: {
    type: Boolean,
    default: false,
    required: true
  },
  categoriaCarros: {
    type: Boolean,
    default: false,
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
