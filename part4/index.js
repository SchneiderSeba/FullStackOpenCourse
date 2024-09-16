import express from 'express'
import cors from 'cors'
import { PORT } from './config.js'
import { connectBDB } from './mongo.js'
import { router } from './Router/router.js'

const app = express()
app.use(cors())
app.use(express.json())

connectBDB()

app.use('/api', router)

app.post('/api', router)

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
