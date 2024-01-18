const mongoose = require('mongoose')
const { Schema, model } = mongoose

const saleSchema = new Schema({
  codigoDeFactura: {
    type: String,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  mes: {
    type: Number,
    required: true
  },
  anio: {
    type: Number,
    required: true
  },
  idVendedor: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  idCliente: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  idProducto: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  metodoDePago: {
    type: String,
    default: 'Credito',
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  valorUnitario: {
    type: Number,
    required: true
  },
  ventaBruta: {
    type: Number,
    required: true
  },
  descuento: {
    type: Number,
    required: true
  },
  ventaNeta: {
    type: Number,
    required: true
  },
  iva: {
    type: Number,
    required: true
  },
  valorTotal: {
    type: Number,
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

saleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Sale = model('Sale', saleSchema)

module.exports = Sale
