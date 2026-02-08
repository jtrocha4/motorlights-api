require('../mongo')
const authorizationVerification = require('./requiredAuthorization')

const express = require('express')
const router = express.Router()

const InventoryTurnover = require('../models/InventoryTurnover')
const User = require('../models/User')

router.get('/api/invetoryTurnover', authorizationVerification, async (require, response) => {
  const userId = require.userId
  try {
    const data = await InventoryTurnover.find({ usuario: userId }).populate('usuario', {
      nombreUsuario: 1,
      nombre: 1
    })
    response.json(data)
  } catch (error) {
    response.status(404).json(error).end()
  }
})

router.post('/api/invetoryTurnover', authorizationVerification, async (require, response) => {
  try {
    const { nombre, codigo, categoriaMotos, categoriaCarros } = require.body

    const userId = require.userId

    const user = await User.findById(userId)

    const newData = new InventoryTurnover({
      nombre,
      codigo,
      usuario: user._id,
      categoriaMotos,
      categoriaCarros
    })

    const createInventoryTurnover = await newData.save()
    user.rotacionInventario = user.rotacionInventario.concat(createInventoryTurnover._id)
    await user.save()
    response.status(201).json(createInventoryTurnover)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

router.delete('/api/invetoryTurnover/:id', authorizationVerification, async (require, response) => {
  try {
    const id = require.params.id
    const deleteData = await InventoryTurnover.findByIdAndDelete(id)
    response.status(200).json(deleteData)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

router.put('/api/invetoryTurnover/:id', authorizationVerification, async (require, response) => {
  try {
    const id = require.params.id
    const { nombre, codigo, categoriaMotos, categoriaCarros } = require.body

    const data = {
      nombre,
      codigo,
      categoriaMotos,
      categoriaCarros
    }

    const updateData = await InventoryTurnover.findByIdAndUpdate(id, data, { new: true })
    response.status(200).json(updateData)
  } catch (error) {
    response.json(error).end()
  }
})

module.exports = router
