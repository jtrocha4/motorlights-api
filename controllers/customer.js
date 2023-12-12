require('../mongo')

const express = require('express')
const router = express.Router()

const Customer = require('../models/Customer')

router.get('/api/customers', async (require, response) => {
  try {
    const data = await Customer.find({})
    response.json(data)
  } catch (error) {
    response.status(404).json({ message: 'Error al obtener los datos' }).end()
  }
})

router.post('/api/customers', async (require, response) => {
  try {
    const { identificacion, nombre, telefono, departamento, municipio, direccion, estado, fechaDeCreacion } = require.body
    const newData = new Customer({
      identificacion,
      nombre,
      telefono,
      departamento,
      municipio,
      direccion,
      estado,
      fechaDeCreacion
    })
    const createCustomer = await newData.save()
    response.status(201).json(createCustomer)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

module.exports = router
