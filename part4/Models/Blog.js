import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  }
})

export { Blog }
