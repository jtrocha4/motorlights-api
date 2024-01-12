const bcrypt = require('bcrypt')
require('../mongo')

const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.get('/', async (require, response) => {
  try {
    const data = await User.find({}).populate('vendedores', {
      nombre: 1,
      identificacion: 1,
      metaRecaudo: 1,
      metaVentas: 1,
      _id: 0
    })
    response.json(data)
  } catch (error) {
    response.status(404).json(error).end()
  }
})

router.post('/', async (require, response) => {
  try {
    const { nombreUsuario, nombre, contrasena } = require.body

    const saltRounds = 10
    const hashContrasena = await bcrypt.hash(contrasena, saltRounds)

    const newData = new User({
      nombreUsuario,
      nombre,
      hashContrasena
    })
    const createUser = await newData.save()
    response.status(201).json(createUser)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

module.exports = router
