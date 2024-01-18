require('../mongo')

const express = require('express')
const router = express.Router()

const authorizationVerification = require('./requiredAuthorization')

const Product = require('../models/Product')
const User = require('../models/User')

router.get('/api/products', authorizationVerification, async (require, response) => {
  const userId = require.userId
  try {
    const data = await Product.find({ usuario: userId }).populate('usuario', {
      nombreUsuario: 1,
      nombre: 1
    })
    response.json(data)
  } catch (error) {
    response.status(404).json({ message: 'Error al obtener los datos' }).end()
  }
})

router.post('/api/products', authorizationVerification, async (require, response) => {
  try {
    const { codigo, nombre, categoria, estado, fechaDeCreacion } = require.body

    const userId = require.userId

    const user = await User.findById(userId)

    const newData = new Product({
      codigo,
      nombre,
      categoria,
      usuario: user._id,
      estado,
      fechaDeCreacion
    })
    const createProduct = await newData.save()
    user.productos = user.productos.concat(newData._id)
    await user.save()
    response.status(201).json(createProduct)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

module.exports = router
