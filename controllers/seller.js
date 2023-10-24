require('../mongo')

const express = require('express')
const router = express.Router()

const Seller = require('../models/Seller')

router.get('/api/seller', async(require, response)=>{
    try {
        const data = await Seller.find({})
        response.json(data)
    } catch (error) {
        response.status(500).json({message: 'Error al obtener los datos'}).end()
    }
})

router.post('/api/seller', async(require, response)=>{
    try {
        const {nombre, identificacion, estado = 1 } = require.body

        const newData = new Seller({
            nombre,
            identificacion,
            estado
        })

        const createSeller = await newData.save()
        response.status(200).json(createSeller)

    } catch (error) {
        response.json({message: error}).end()
    }
})

router.delete('/api/seller/:id', async(require, response)=>{
    try {
        
        const id = require.params.id
        const deleteData = await Seller.findByIdAndDelete(id)
        response.status(200).json(deleteData)
    } catch (error) {
        response.json({message: error}).end()
    }
})

router.put('/api/seller/:id', async(require, response)=>{
    try {
        const id = require.params.id
        const {nombre, identificacion, estado = 1 } = require.body

        const data = {
            nombre
        }

        const updateData = await Seller.findByIdAndUpdate(id, data, {new: true} )
        response.status(200).json(updateData)

    } catch (error) {
        response.json({message: error}).end()
    }
})

module.exports = router