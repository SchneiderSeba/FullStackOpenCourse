import { Blog } from '../Models/Blog.js'
import { User } from '../Models/User.js'
import { Router } from 'express'
import { getTokenFrom } from '../Middleware/getToken.js'
import { userExtractor } from '../Middleware/userExtractor.js'
import jwt from 'jsonwebtoken'

export const blogRouter = Router()

blogRouter.get('/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogRouter.get('/blogs/:id', async (req, res) => {
  const { id } = req.params

  const blog = await Blog.findById(id)
  // .populate('user', { username: 1, name: 1 })

  if (blog) {
    res.json(blog)
    // console.log(blog)
  } else {
    res.status(404).end()
  }
})

blogRouter.post('/blogs', getTokenFrom, userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' })
  }

  const user = req.user
  const token = req.token

  if (!token) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  const userExists = await User.findById(decodedToken.id)
  if (!userExists) {
    return res.status(400).json({ error: 'user does not exist' })
  }

  const existingBlog = await Blog.findOne({ title })

  if (existingBlog) {
    existingBlog.author = author
    const updatedBlog = await existingBlog.save()
    res.json(updatedBlog)
  } else {
    const newBlog = new Blog({ title, author, url, likes, user: user._id })
    const savedBlog = await newBlog.save()
    userExists.blogs = userExists.blogs.concat(savedBlog._id)
    await userExists.save()
    res.status(201).json(savedBlog)
  }
})

blogRouter.put('/blogs/:id', getTokenFrom, userExtractor, async (req, res) => {
  const { title, author, url, likes } = req.body

  const blog = { title, author, url, likes }

  const { id } = req.params

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true, runValidators: true, context: 'query' })

  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(404).end()
  }
})

blogRouter.delete('/blogs/:id', userExtractor, async (req, res) => {
  const { id } = req.params

  const user = req.user

  const blog = await Blog.findById(id)

  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(id)
    res.status(204).end()
  } else {
    res.status(401).json({ error: 'unauthorized' })
  }
})
