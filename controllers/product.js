require('../mongo')

const express = require('express')
const router = express.Router()

const Product = require('../models/Product')

router.get('/api/products', async (require, response) => {
  try {
    const data = await Product.find({})
    response.json(data)
  } catch (error) {
    response.status(404).json({ message: 'Error al obtener los datos' }).end()
  }
})

router.post('/api/products', async (require, response) => {
  try {
    const { codigo, nombre, categoria, estado, fechaDeCreacion } = require.body

    const newData = new Product({
      codigo,
      nombre,
      categoria,
      estado,
      fechaDeCreacion
    })
    const createProduct = await newData.save()
    response.status(201).json(createProduct)
  } catch (error) {
    response.status(500).json({ message: error })
  }
})

module.exports = router
