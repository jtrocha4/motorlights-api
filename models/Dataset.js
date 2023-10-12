const mongoose = require('mongoose')
const { Schema, model } = mongoose

const datasetSchema = new Schema({
  bonoResultado: Number,
  cantidadFacturas: Number,
  clientesNuevos: Number,
  comisionRecaudo: Number,
  comisionTotal: Number,
  comisionVenta: Number,
  fecha: Date,
  margen: Number,
  metaRecaudoSinIva: Number,
  metaVentas: Number,
  porcentajeMargen: Number,
  porcentajeRecaudo: Number,
  porcentajeVentas: Number,
  promedioVentas: Number,
  recaudoPendiente: Number,
  totalCosto: Number,
  totalRecaudo: Number,
  totalVenta: Number,
  vendedor: String,
  ventasPendiente: Number
})

datasetSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Dataset = model('Dataset', datasetSchema)

module.exports = Dataset
