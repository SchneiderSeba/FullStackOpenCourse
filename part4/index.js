import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { PORT } from './Utils/config.js'
import { connectBDB } from './mongo.js'
import { router } from './Controllers/router.js'
import { info } from './Utils/logger.js'

const app = express()
app.use(cors())
app.use(express.json())

connectBDB()

app.use('/api', router)

app.post('/api', router)

app.listen(PORT, () => {
  info(`Server running on port http://localhost:${PORT}`)
})

export default app
