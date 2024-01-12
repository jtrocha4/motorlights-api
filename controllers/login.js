require('../mongo')

const express = require('express')
const loginRouter = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

loginRouter.post('/', async (require, response) => {
  try {
    const { nombreUsuario, contrasena } = require.body
    const user = await User.findOne({ nombreUsuario })

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(contrasena, user.hashContrasena)

    if (!(user && passwordCorrect)) {
      response.status(401).json({ error: 'invalid user or password' })
    } else {
      const userForToken = {
        id: user._id,
        nombreUsuario: user.nombreUsuario,
        nombre: user.nombre
      }
      const token = jwt.sign(userForToken, process.env.SECRETKEY)

      response.status(200).json({
        message: 'login successful',
        data: {
          id: user._id,
          nombreUsuario: user.nombreUsuario,
          nombre: user.nombre,
          token
        }
      })
    }
  } catch (error) {
    response.status(400).json(error).end()
  }
})

module.exports = loginRouter
