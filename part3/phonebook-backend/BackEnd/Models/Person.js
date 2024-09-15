import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true, minLength: 4 },
  number: { type: String, required: true, minLength: 8 }
})

const Person = mongoose.model('Person', personSchema)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  }
})

export { Person }
