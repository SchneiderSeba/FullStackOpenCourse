import { Blog } from '../Models/Blog.js'
import { User } from '../Models/User.js'

export const fackData = [
  {
    title: 'Test Title 1',
    author: 'XXX',
    url: 'Test URL 1',
    likes: 1
  },
  {
    title: 'Test Title 2',
    author: 'Test Author 2',
    url: 'Test URL 2',
    likes: 2
  },
  {
    title: 'Test Title 3',
    author: 'Test Author 3',
    url: 'Test URL 3',
    likes: 3
  }
]

export const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

export const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

export const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
