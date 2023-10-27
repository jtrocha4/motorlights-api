const mongoose = require('mongoose')
const { Schema, model } = mongoose

const sellerPerformanceSchema = new Schema({
  bonoResultado: {
    type: Number,
    required: true
  },
  cantidadFacturas: {
    type: Number,
    required: true
  },
  clientesNuevos: {
    type: Number,
    required: true
  },
  comisionRecaudo: {
    type: Number,
    required: true
  },
  comisionTotal: {
    type: Number,
    required: true
  },
  comisionVenta: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    required: true
  },
  margen: {
    type: Number,
    required: true
  },
  metaRecaudoSinIva: {
    type: Number,
    required: true
  },
  metaVentas: {
    type: Number,
    required: true
  },
  porcentajeMargen: {
    type: Number,
    required: true
  },
  porcentajeRecaudo: {
    type: Number,
    required: true
  },
  porcentajeVentas: {
    type: Number,
    required: true
  },
  promedioVentas: {
    type: Number,
    required: true
  },
  recaudoPendiente: {
    type: Number,
    required: true
  },
  totalCosto: {
    type: Number,
    required: true
  },
  totalRecaudo: {
    type: Number,
    required: true
  },
  totalVenta: {
    type: Number,
    required: true
  },
  idVendedor: {
    type: Schema.Types.ObjectId,
    ref: 'Seller',
    required: true
  },
  ventasPendiente: {
    type: Number,
    required: true
  }
})

sellerPerformanceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const SellerPerformance = model('SellerPerformance', sellerPerformanceSchema)

module.exports = SellerPerformance
