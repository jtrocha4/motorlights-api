require('dotenv').config()
require('./mongo')

const express = require('express')
const app = express()
const cors = require('cors')

const SellerPerformance = require('./models/SellerPerformance')

const municipalityController = require('./controllers/municipality')
const departmentController = require('./controllers/department')
const sellerController = require('./controllers/seller')
const saleController = require('./controllers/sale')
const productController = require('./controllers/product')
const customerController = require('./controllers/customer')
const userController = require('./controllers/user')
const loginController = require('./controllers/login')

app.use(cors())
app.use(express.json())

app.get('/', (require, response) => {
  response.send(`
    <h1>Motorlights-api</h1>
    <p>Api de prueba</p>
  `)
})

app.get('/api/sellerPerformance', async (require, response) => {
  try {
    const data = await SellerPerformance.find({})
      .populate('idVendedor', {
        _id: 1,
        fechaDeCreacion: 0,
        estado: 0
      })
    response.json(data)
  } catch (error) {
    response.status(404).json(error).end()
  }
})

app.get('/api/sellerPerformance/:sellerId', async (require, response) => {
  try {
    const sellerId = require.params.sellerId
    const data = await SellerPerformance.find({ idVendedor: sellerId }).populate('idVendedor', {
      _id: 1,
      fechaDeCreacion: 0,
      estado: 0
    })
    if (data) {
      response.json(data)
    } else {
      response.status(404).json({ message: 'El usuario con el ID especificado no existe en la base de datos' }).end()
    }
  } catch (error) {
    response.status(500).json({ message: error }).end()
  }
})

app.get('/api/sellerPerformance/date/:date', async (require, response) => {
  try {
    const date = require.params.date
    const data = await SellerPerformance.find({ fecha: date })
    if (data) {
      response.json(data)
    } else {
      response.status(404).json({ message: 'No se encontraron informes con la fecha especificada en la base de datos' }).end()
    }
  } catch (error) {
    response.status(500).json({ message: error }).end()
  }
})

app.post('/api/sellerPerformance', async (require, response) => {
  try {
    const { bonoResultado, cantidadFacturas, clientesNuevos, comisionRecaudo, comisionTotal, comisionVenta, fecha, margen, metaRecaudoSinIva, metaVentas, porcentajeMargen, porcentajeRecaudo, porcentajeVentas, promedioVentas, recaudoPendiente, totalCosto, totalRecaudo, totalVenta, idVendedor, ventasPendiente } = require.body
    const newData = new SellerPerformance({
      bonoResultado,
      cantidadFacturas,
      clientesNuevos,
      comisionRecaudo,
      comisionTotal,
      comisionVenta,
      fecha,
      margen,
      metaRecaudoSinIva,
      metaVentas,
      porcentajeMargen,
      porcentajeRecaudo,
      porcentajeVentas,
      promedioVentas,
      recaudoPendiente,
      totalCosto,
      totalRecaudo,
      totalVenta,
      idVendedor,
      ventasPendiente
    })
    const createData = await newData.save()
    response.status(201).json(createData)
  } catch (error) {
    response.status(400).json(error).end()
  }
})

app.use('/', municipalityController)
app.use('/', departmentController)
app.use('/', sellerController)
app.use('/', saleController)
app.use('/', productController)
app.use('/', customerController)
app.use('/api/users', userController)
app.use('/api/login', loginController)

app.use((require, response) => {
  response.status(404).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
