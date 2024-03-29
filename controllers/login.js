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
      const token = jwt.sign(
        userForToken,
        process.env.SECRETKEY,
        {
          // Expira en 7 dias
          expiresIn: 60 * 60 * 24 * 7
        }
      )

      const decodedToken = jwt.verify(
        token,
        process.env.SECRETKEY
      )

      const expiredToken = new Date(decodedToken.exp * 1000)

      response.status(200).json({
        id: user._id,
        nombreUsuario: user.nombreUsuario,
        nombre: user.nombre,
        token,
        expiredToken
      })
    }
  } catch (error) {
    response.status(400).json(error).end()
  }
})

module.exports = loginRouter
