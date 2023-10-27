require('../mongo')

const express = require('express')
const router = express.Router()

const Department = require('../models/Department')

router.get('/api/department', async (require, response) => {
  try {
    const data = await Department.find({}).populate('municipios', {
      nombre: 1,
      _id: 0
    })
    response.json(data)
  } catch (error) {
    response.status(500).json({ message: 'Error al obtener los datos' }).end()
  }
})

router.post('/api/department', async (require, response) => {
  try {
    const { nombre, municipios = [] } = require.body
    const newData = new Department({
      nombre,
      municipios
    })
    const createDepartment = await newData.save()
    response.status(200).json(createDepartment)
  } catch (error) {
    response.json({ message: error }).end()
  }
})

module.exports = router