import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'
import { ConnectMDB } from './mongo.js'
import { PORT } from './config.js'
import { dataRouter } from './Router/DataRouter.js'

const app = express()
app.use(cors())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.json())
app.use(express.static(path.join(path.resolve(), 'public')))

ConnectMDB().then(() => {
  console.log('Connected to MongoDB')

  const data = [
    {
      id: 1,
      name: 'Arto Hellas',
      number: '040-123456'
    },
    {
      id: 2,
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    },
    {
      id: 3,
      name: 'Dan Abramov',
      number: '12-43-234345'
    },
    {
      id: 4,
      name: 'Mary Poppendieck',
      number: '39-23-6423122'
    }
  ]

  app.get('/', (req, res) => {
    const indexPath = path.join(path.resolve(), 'Src', 'index.html')
    res.sendFile(indexPath)
  })

  app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`
          <p>Phonebook has info for ${data.length} people</p>
          <p>${date}</p>
      `)
  })

  app.use('/api', dataRouter)

  app.delete('/api', dataRouter)

  app.post('/api', dataRouter)

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
  })
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message)
})
