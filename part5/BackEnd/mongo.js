import mongoose from 'mongoose'
import { info } from './Utils/logger.js'
import { MONGO_URI } from './Utils/config.js'

const connectDB = MONGO_URI

export function connectBDB () {
  return mongoose.connect(connectDB).then(() => {
    info('Connected to MongoDB')
  })
    .catch((error) => {
      info('Error connecting to MongoDB:', error.message)
    })
}
