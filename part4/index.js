import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import 'express-async-errors'
import { PORT } from './Utils/config.js'
import { connectBDB } from './mongo.js'
import { router } from './Controllers/router.js'
import { info } from './Utils/logger.js'
import { userRouter } from './Controllers/user.js'
import { errorHandler, unknownEndpoint } from './Middleware/error.js'

const app = express()
app.use(cors())
app.use(express.json())

connectBDB()

app.use('/api', router)

app.use('/api/users', userRouter)

app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => {
  info(`Server running on port http://localhost:${PORT}`)
})

export default app
