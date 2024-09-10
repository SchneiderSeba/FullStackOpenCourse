import { Router } from 'express'
import { readJSON } from '../utils.js'

const data = readJSON('./DB.json')

export const dataRouter = Router()

dataRouter.get('/', (req, res) => {})

dataRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = data.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }

  return person
})
