import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  url: { type: String },
  likes: { type: Number, default: 0 }
})

blogSchema.path('author').validate(function (value) {
  return this.author || this.url
}, 'Either author or url must be provided.')

blogSchema.path('url').validate(function (value) {
  return this.author || this.url
}, 'Either author or url must be provided.')

const Blog = mongoose.model('Blog', blogSchema)

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    // returnedObject.id = returnedObject._id.toString()
    // delete returnedObject._id
    delete returnedObject.__v
  }
})

export { Blog }
