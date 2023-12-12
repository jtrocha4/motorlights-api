require('../mongo')

const express = require('express')
const router = express.Router()

const Sale = require('../models/Sale')

router.get('/api/sales', async (require, response) => {
  try {
    const data = await Sale.find({})
      .populate('idVendedor', {
        _id: 0,
        fechaDeCreacion: 0,
        estado: 0
      })
      .populate('idProducto', {
        _id: 0,
        fechaDeCreacion: 0,
        estado: 0
      })
      .populate('idCliente', {
        _id: 0,
        fechaDeCreacion: 0,
        estado: 0
      })
    response.json(data)
  } catch (error) {
    response.status(404).json({ message: 'Error al obtener los datos' }).end()
  }
})

router.post('/api/sales', async (require, response) => {
  try {
    const { codigoDeFactura, fecha, mes, anio, idVendedor, idCliente, idProducto, metodoDePago, cantidad, valorUnitario, ventaBruta, descuento, ventaNeta, iva, valorTotal, fechaDeCreacion } = require.body

    const newData = new Sale({
      cantidad,
      codigoDeFactura,
      descuento,
      fecha,
      mes,
      anio,
      fechaDeCreacion,
      idVendedor,
      idCliente,
      idProducto,
      iva,
      metodoDePago,
      valorUnitario,
      ventaBruta,
      ventaNeta,
      valorTotal
    })

    const createSale = await newData.save()
    response.status(201).json(createSale)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

module.exports = router
