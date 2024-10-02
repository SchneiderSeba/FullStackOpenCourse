import 'dotenv/config'

export const password = '15673019'

export const PORT = process.env.PORT ?? 3003

export const MONGO_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGO_URI
  : process.env.MONGO_URI
