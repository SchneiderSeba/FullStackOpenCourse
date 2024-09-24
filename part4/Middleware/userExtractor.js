import jwt from 'jsonwebtoken'
import { User } from '../Models/User.js'

export const userExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
      req.user = await User.findById(decodedToken.id)

      if (!req.user) {
        return res.status(400).json({ error: 'user does not exist' })
      }
    } catch (error) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  next()
}
