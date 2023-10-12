require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const Dataset = require('./models/Dataset')

const municipalityController = require('./controllers/municipality')
const departmentController = require('./controllers/department')

app.use(cors())
app.use(express.json())

app.get('/', (require, response) => {
  response.send(`
    <h1>Motorlights-api</h1>
    <p>Api de prueba</p>
  `)
})

app.get('/api/data', async (require, response) => {
  try {
    const data = await Dataset.find({})
    response.json(data)
  } catch (error) {
    response.status(500).json({ message: 'Error al obtener los datos' }).end()
  }
})

app.get('/api/data/:id', async (require, response) => {
  try {
    const id = require.params.id
    const data = await Dataset.findById(id)
    if (data) {
      response.json(data)
    } else {
      response.status(404).json({ message: 'El usuario con el ID especificado no existe en la base de datos' }).end()
    }
  } catch (error) {
    response.status(500).json({ message: error }).end()
  }
})

app.get('/api/data/date/:date', async (require, response) => {
  try {
    const date = require.params.date
    const data = await Dataset.find({ fecha: date })
    if (data) {
      response.json(data)
    } else {
      response.status(404).json({ message: 'No se encontraron informes con la fecha especificada en la base de datos' }).end()
    }
  } catch (error) {
    response.status(500).json({ message: error }).end()
  }
})

app.post('/api/data', async (require, response) => {
  try {
    const data = require.body
    const newData = new Dataset({
      bonoResultado: data.bonoResultado,
      cantidadFacturas: data.cantidadFacturas,
      clientesNuevos: data.clientesNuevos,
      comisionRecaudo: data.comisionRecaudo,
      comisionTotal: data.comisionTotal,
      comisionVenta: data.comisionVenta,
      fecha: data.fecha,
      margen: data.margen,
      metaRecaudoSinIva: data.metaRecaudoSinIva,
      metaVentas: data.metaVentas,
      porcentajeMargen: data.porcentajeMargen,
      porcentajeRecaudo: data.porcentajeRecaudo,
      porcentajeVentas: data.porcentajeVentas,
      promedioVentas: data.promedioVentas,
      recaudoPendiente: data.recaudoPendiente,
      totalCosto: data.totalCosto,
      totalRecaudo: data.totalRecaudo,
      totalVenta: data.totalVenta,
      vendedor: data.vendedor,
      ventasPendiente: data.ventasPendiente
    })
    const createData = await newData.save()
    response.status(200).json(createData)
  } catch (error) {
    response.json({ message: error }).end()
  }
})

app.use('/', municipalityController)
app.use('/', departmentController)

app.use((require, response) => {
  response.status(404).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
