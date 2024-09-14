import { Router } from 'express'
import { readJSON } from '../utils.js'
import { Person } from '../Models/Person.js'

const data = readJSON('./DB.json')

export const dataRouter = Router()

dataRouter.get('/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

dataRouter.get('/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findById(id).then((person) => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).json({ message: 'Person not found' })
    }
  })
})

dataRouter.post('/persons', (req, res) => {
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(422).json({ message: 'Name or number is missing' })
  }
  if (data.find((person) => person.name === name)) {
    return res.status(409).json({ message: 'Name must be unique' })
  }

  const person = new Person({
    id: Math.floor(Math.random() * 1000),
    name,
    number
  })

  person.save().then((savedPerson) => {
    res.status(201).json(savedPerson)
  })
})

dataRouter.delete('/persons/:id', (req, res) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then((result) => {
    if (result) {
      res.status(204).json({ message: 'Person deleted' })
    } else {
      res.status(404).json({ message: 'Person not found' })
    }
  })
})
