import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({ id: Number, name: String, number: String })

const Person = mongoose.model('Person', personSchema)

// const person = new Person({ name: 'Carlos Araujo', number: '123456789' })

// person.save().then(result => {
//   console.log(result)
//   mongoose.connection.close()
// }).catch((error) => { console.log('Error saving person:', error.message) })

export { Person }
