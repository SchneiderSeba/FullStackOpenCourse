import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { ConnectMDB } from './mongo.js'
import { PORT } from './config.js'
import { dataRouter } from './Router/DataRouter.js'
import { errorHandler } from './Middleware/Error.js'

const app = express()
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(express.static(path.join(path.resolve(), 'public')))

ConnectMDB().then(() => {
  console.log('Connected to MongoDB')

  app.get('/', (req, res) => {
    const indexPath = path.join(path.resolve(), 'Src', 'index.html')
    res.sendFile(indexPath)
  })

  app.get('/info', dataRouter)

  app.use('/api', dataRouter)

  app.delete('/api', dataRouter)

  app.post('/api', dataRouter)

  app.put('/api', dataRouter)

  app.use(errorHandler)

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message)
})
