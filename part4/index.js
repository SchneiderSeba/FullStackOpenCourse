import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import 'express-async-errors'
import { PORT } from './Utils/config.js'
import { connectBDB } from './mongo.js'
import { blogRouter } from './Controllers/router.js'
import { info } from './Utils/logger.js'
import { userRouter } from './Controllers/user.js'
import { errorHandler, unknownEndpoint } from './Middleware/error.js'
import { loginRouter } from './Controllers/login.js'

const app = express()
app.use(cors())
app.use(express.json())

connectBDB()

app.use('/api', blogRouter)

app.use('/api/login', loginRouter)

app.use('/api/users', userRouter)

app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => {
  info(`Server running on port http://localhost:${PORT}`)
})

export default app
