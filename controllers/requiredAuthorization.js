const jwt = require('jsonwebtoken')

const authorizationVerification = (require, response, next) => {
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
    return response.status(401).json({ error: 'authorization is required, token missing or invalid' })
  }

  require.userId = decodedToken.id
  next()
}

module.exports = authorizationVerification
