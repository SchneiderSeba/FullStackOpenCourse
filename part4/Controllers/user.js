import bcrypt from 'bcrypt'
import { Router } from 'express'
import { User } from '../Models/User.js'
import dotenv from 'dotenv'
dotenv.config()

export const userRouter = Router()

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })
  res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  const saltRounds = Number(process.env.SALT)
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})
