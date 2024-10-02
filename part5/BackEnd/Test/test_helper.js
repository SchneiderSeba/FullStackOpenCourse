import { Blog } from '../Models/Blog.js'
import { User } from '../Models/User.js'
import jwt from 'jsonwebtoken'

export const fackData = [
  {
    _id: '100000000000000000000001',
    title: 'Test Title 1',
    author: 'XXX',
    user: '66f16dee6748ed9e6109a9df',
    url: 'Test URL 1',
    likes: 1
  },
  {
    _id: '424545454545454545454545',
    title: 'Test Title 2',
    author: 'Test Author 2',
    user: '66f16dee6748ed9e6109a000',
    url: 'Test URL 2',
    likes: 2
  },
  {
    _id: '868868686868686868686868',
    title: 'Test Title 3',
    author: 'Test Author 3',
    user: '66f16dee6748ed9e6109a111',
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
// extract blogs from fackData
export const extractBlogs = () => {
  return fackData.map(blog => {
    return {
      _id: blog._id,
      title: blog.title,
      author: blog.author,
      user: blog.user,
      url: blog.url,
      likes: blog.likes
    }
  })
}

export const getTokenForTest = async () => {
  const testUser = await User.findOne({ username: 'testUser' })
  if (!testUser) {
    throw new Error('User not found')
  }

  const userForToken = {
    username: testUser.username,
    id: testUser._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: 60 * 60 })
  return token
}
