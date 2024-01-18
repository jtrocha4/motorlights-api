require('../mongo')

const express = require('express')
const router = express.Router()

const authorizationVerification = require('./requiredAuthorization')

const Customer = require('../models/Customer')
const User = require('../models/User')

router.get('/api/customers', authorizationVerification, async (require, response) => {
  const userId = require.userId
  try {
    const data = await Customer.find({ usuario: userId }).populate('usuario', {
      nombreUsuario: 1,
      nombre: 1
    })
    response.json(data)
  } catch (error) {
    response.status(404).json(error).end()
  }
})

router.post('/api/customers', authorizationVerification, async (require, response) => {
  try {
    const { identificacion, nombre, telefono, departamento, municipio, direccion, estado, fechaDeCreacion } = require.body

    const userId = require.userId

    const user = await User.findById(userId)

    const newData = new Customer({
      identificacion,
      nombre,
      telefono,
      departamento,
      municipio,
      direccion,
      usuario: user._id,
      estado,
      fechaDeCreacion
    })
    const createCustomer = await newData.save()
    user.clientes = user.clientes.concat(createCustomer._id)
    await user.save()
    response.status(201).json(createCustomer)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

module.exports = router
