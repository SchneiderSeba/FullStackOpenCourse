import { Router } from 'express'
import { Person } from '../Models/Person.js'

export const dataRouter = Router()

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
      // Si la persona ya existe, actualiza su información
      existingPerson.number = number
      existingPerson.save().then((updatedPerson) => {
        res.json(updatedPerson)
      }).catch(error => next(error))
    } else {
      // Si la persona no existe, crea una nueva entrada
      const newPerson = new Person({ name, number })
      newPerson.save().then((savedPerson) => {
        res.status(201).json(savedPerson)
      }).catch(error => next(error))
    }
  }).catch(error => next(error))
  // const { name, number } = req.body

  // if (!name || !number) {
  //   return res.status(422).json({ message: 'Name or number is missing' })
  // }
  // if (data.find((person) => person.name === name)) {
  //   return res.status(409).json({ message: 'Name must be unique' })
  // }

  // const person = new Person({
  //   id: Math.floor(Math.random() * 1000),
  //   name,
  //   number
  // })

  // person.save().then((savedPerson) => {
  //   res.status(201).json(savedPerson)
  //   console.log(`added ${name} number ${number} to phonebook`)
  // }).catch(error => next(error))
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
