import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  username: { type: String, minlength: 3, required: true, unique: true },
  name: String,
  passwordHash: { type: String, required: true, minlength: 3 },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

export const User = mongoose.model('User', userSchema)
