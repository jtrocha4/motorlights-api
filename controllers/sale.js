require('../mongo')

const express = require('express')
const router = express.Router()

const authorizationVerification = require('./requiredAuthorization')

const Sale = require('../models/Sale')
const User = require('../models/User')

router.get('/api/sales', authorizationVerification, async (require, response) => {
  const userId = require.userId
  try {
    const data = await Sale.find({ usuario: userId })
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
      .populate('usuario', {
        nombreUsuario: 1,
        nombre: 1
      })
    response.status(200).json(data)
  } catch (error) {
    response.status(404).json(error).end()
  }
})

router.post('/api/sales', authorizationVerification, async (require, response) => {
  try {
    const { codigoDeFactura, fecha, mes, anio, idVendedor, idCliente, idProducto, metodoDePago, cantidad, valorUnitario, ventaBruta, descuento, ventaNeta, iva, valorTotal, fechaDeCreacion } = require.body

    const userId = require.userId

    const user = await User.findById(userId)

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
      valorTotal,
      usuario: user._id
    })

    const createSale = await newData.save()
    user.ventas = user.ventas.concat(newData._id)
    await user.save()
    response.status(201).json(createSale)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

router.get('/api/sales/:idSeller', authorizationVerification, async (require, response) => {
  try {
    const idSeller = require.params.idSeller
    const data = await Sale.find({ idVendedor: idSeller })
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
    express.response.status(400).json(error).end()
  }
})

module.exports = router
