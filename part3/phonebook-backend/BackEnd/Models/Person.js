import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  id: Number,
  name: { type: String, required: true, minLength: 4 },
  number: {
    type: String,
    required: true,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{6}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
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
