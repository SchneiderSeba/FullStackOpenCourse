import { Router } from 'express'
import { readJSON } from '../utils.js'

const data = readJSON('./DB.json')

export const dataRouter = Router()

dataRouter.get('/', (req, res) => {
  res.json(data)
})

dataRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = data.find((person) => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ message: 'Person not found' })
  }

  return person
})

dataRouter.post('/', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(422).json({ message: 'Name or number is missing' })
  }
  if (data.find((person) => person.name === name)) {
    return res.status(409).json({ message: 'Name must be unique' })
  }

  const person = {
    id: Math.floor(Math.random() * 1000),
    name,
    number
  }

  data.push(person)
  res.status(201).json(person)
})

dataRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = data.find((person) => person.id === id)

  if (person) {
    data.splice(data.indexOf(person), 1)
    res.status(204).json({ message: 'Person deleted' })
  } else {
    res.status(404).json({ message: 'Person not found' })
  }
})
