import mongoose from 'mongoose'
import { Password } from './config.js'

const connectDB = `mongodb+srv://seba19sc:${Password}@moviesapirest.xdwlu.mongodb.net/?retryWrites=true&w=majority&appName=MoviesAPIRest`

export function ConnectMDB () {
  return mongoose.connect(connectDB).then(() => {
    console.log('Connected to MongoDB')
  }).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message)
  })
}
