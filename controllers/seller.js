require('../mongo')

const express = require('express')
const router = express.Router()

const Seller = require('../models/Seller')

router.get('/api/sellers', async (require, response) => {
  try {
    const data = await Seller.find({})
    response.json(data)
  } catch (error) {
    response.status(404).json(error).end()
  }
})

router.post('/api/sellers', async (require, response) => {
  try {
    const { nombre, identificacion, metaRecaudo, metaVentas, estado, fechaDeCreacion } = require.body

    const newData = new Seller({
      estado,
      fechaDeCreacion,
      identificacion,
      metaRecaudo,
      metaVentas,
      nombre
    })

    const createSeller = await newData.save()
    response.status(201).json(createSeller)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

router.delete('/api/sellers/:id', async (require, response) => {
  try {
    const id = require.params.id
    const deleteData = await Seller.findByIdAndDelete(id)
    response.status(200).json(deleteData)
  } catch (error) {
    response.json(error).end()
  }
})

router.put('/api/sellers/:id', async (require, response) => {
  try {
    const id = require.params.id
    const { nombre, identificacion, metaRecaudo, metaVentas, estado = 1 } = require.body

    const data = {
      nombre,
      identificacion,
      metaRecaudo,
      metaVentas,
      estado
    }

    const updateData = await Seller.findByIdAndUpdate(id, data, { new: true })
    response.status(200).json(updateData)
  } catch (error) {
    response.json(error).end()
  }
})

module.exports = router
