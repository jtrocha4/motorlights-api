const jwt = require('jsonwebtoken')

const authorizationVerification = (require, response, next) => {
  const authorization = require.get('authorization')
  let token = null
  let decodedToken

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  try {
    if (token !== null) {
      decodedToken = jwt.verify(
        token,
        process.env.SECRETKEY
      )
    }
    require.userId = decodedToken.id
    next()
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return response.status(401).json({ error: 'authorization required, token has expired' })
    }
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'authorization is required, token missing or invalid' })
    }
  }
}

module.exports = authorizationVerification
