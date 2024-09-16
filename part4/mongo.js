import mongoose from 'mongoose'
import { password } from './config.js'

const connectDB = `mongodb+srv://seba19sc:${password}@moviesapirest.xdwlu.mongodb.net/Blogs?retryWrites=true&w=majority&appName=MoviesAPIRest`

export function connectBDB () {
  return mongoose.connect(connectDB).then(() => {
    console.log('Connected to MongoDB')
  })
    .catch((error) => {
      console.log('Error connecting to MongoDB:', error.message)
    })
}
