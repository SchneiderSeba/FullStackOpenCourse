import { Router } from 'express'
import { Person } from '../Models/Person.js'

export const dataRouter = Router()

dataRouter.get('/info', (req, res) => {
  const date = new Date()
  Person.find({}).then((person) => {
    res.send(`
        <p>Phonebook has info for ${person.length} people</p>
        <p>${date}</p>
    `)
  })
})

dataRouter.get('/persons', (req, res, next) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  }).catch(error => next(error))
})

dataRouter.get('/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findById(id).then((person) => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).json({ message: 'Person not found' }).end()
    }
  }).catch(error => next(error))
})

dataRouter.post('/persons', (req, res, next) => {
  const { name, number } = req.body

  Person.findOne({ name }).then((existingPerson) => {
    if (existingPerson) {
      existingPerson.number = number
      existingPerson.save().then((updatedPerson) => {
        res.json(updatedPerson)
      }).catch(error => next(error))
    } else {
      const newPerson = new Person({ name, number })
      newPerson.save().then((savedPerson) => {
        res.status(201).json(savedPerson)
      }).catch(error => next(error))
    }
  }).catch(error => next(error))
})

dataRouter.put('/persons/:id', (req, res, next) => {
  const id = req.params.id
  const { name, number } = req.body

  const person = {
    name,
    number
  }

  Person.findByIdAndUpdate(id, person, { new: true }).then((updatedPerson) => {
    if (updatedPerson) {
      res.json(updatedPerson)
    } else {
      res.status(404).json({ message: 'Person not found' })
    }
  }).catch(error => next(error))
})

dataRouter.delete('/persons/:id', (req, res, next) => {
  const id = req.params.id
  Person.findByIdAndDelete(id).then((result) => {
    if (result) {
      res.status(204).json({ message: 'Person deleted' })
    } else {
      res.status(404).json({ message: 'Person not found' })
    }
  }).catch(error => next(error))
})
