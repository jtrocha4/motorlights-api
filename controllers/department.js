require('../mongo')

const express = require('express')
const router = express.Router()

const Department = require('../models/Department')

router.get('/api/departments', async (require, response) => {
  try {
    const data = await Department.find({}).populate('municipios', {
      nombre: 1,
      _id: 0
    })
    response.json(data)
  } catch (error) {
    response.status(404).json({ message: 'Error al obtener los datos' }).end()
  }
})

router.post('/api/departments', async (require, response) => {
  try {
    const { nombre, municipios = [] } = require.body
    const newData = new Department({
      nombre,
      municipios
    })
    const createDepartment = await newData.save()
    response.status(201).json(createDepartment)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

module.exports = router
