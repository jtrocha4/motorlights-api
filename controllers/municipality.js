require('../mongo')

const express = require('express')
const router = express.Router()

const Municipality = require('../models/Municipality')
const Department = require('../models/Department')

router.get('/api/municipalities', async (require, response) => {
  try {
    const data = await Municipality.find({})
    response.json(data)
  } catch (error) {
    response.status(404).json({ message: 'Error al obtener los datos' }).end()
  }
})

router.post('/api/municipalities', async (require, response) => {
  try {
    const { nombre, idDepartamento } = require.body

    const department = await Department.findById(idDepartamento)

    const newData = new Municipality({
      nombre,
      idDepartamento: department._id
    })

    const createMunicipality = await newData.save()
    department.municipios = department.municipios.concat(createMunicipality._id)
    await department.save()

    response.status(201).json(createMunicipality)
  } catch (error) {
    response.json({ message: error }).end()
  }
})

module.exports = router
