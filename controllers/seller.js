require('../mongo')
const jwt = require('jsonwebtoken')

const express = require('express')
const router = express.Router()

const Seller = require('../models/Seller')
const User = require('../models/User')

router.get('/api/sellers', async (require, response) => {
  try {
    const data = await Seller.find({}).populate('usuario', {
      nombreUsuario: 1,
      nombre: 1
    })
    response.json(data)
  } catch (error) {
    response.status(404).json(error).end()
  }
})

router.post('/api/sellers', async (require, response) => {
  try {
    const { nombre, identificacion, metaRecaudo, metaVentas, estado, fechaDeCreacion } = require.body

    const authorization = require.get('authorization')
    let token = null
    let decodedToken

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7)
    }

    if (token !== null) {
      decodedToken = jwt.verify(
        token,
        process.env.SECRETKEY, {
          expiresIn: 60 * 60 * 24 * 7
        })
    }

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const newData = new Seller({
      estado,
      fechaDeCreacion,
      identificacion,
      metaRecaudo,
      metaVentas,
      nombre,
      usuario: user._id
    })

    const createSeller = await newData.save()
    user.vendedores = user.vendedores.concat(createSeller._id)
    await user.save()
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
