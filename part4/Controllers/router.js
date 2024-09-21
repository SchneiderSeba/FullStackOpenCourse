import { Blog } from '../Models/Blog.js'
import { User } from '../Models/User.js'
import { Router } from 'express'

export const router = Router()

router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

router.get('/blogs/:id', async (req, res) => {
  const { id } = req.params

  const blog = await Blog.findById(id).populate('user', { username: 1, name: 1 })

  if (blog) {
    res.json(blog)
    console.log(blog)
  } else {
    res.status(404).end()
  }
})

router.post('/blogs', async (req, res) => {
  const { title, author, url, likes, user } = req.body

  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' })
  }
  const existingBlog = await Blog.findOne({ title })
  const userExists = await User.findById(user)

  if (!userExists) {
    return res.status(400).json({ error: 'user does not exist' })
  }

  if (existingBlog) {
    existingBlog.author = author
    const updatedBlog = await existingBlog.save()
    res.json(updatedBlog)
  } else {
    const newBlog = new Blog({ title, author, url, likes, user })
    const savedBlog = await newBlog.save()
    userExists.blogs = userExists.blogs.concat(savedBlog._id)
    await userExists.save()
    res.status(201).json(savedBlog)
  }
})

router.put('/blogs/:id', async (req, res) => {
  const { id } = req.params
  const { title, author, url, likes } = req.body

  const blog = { title, author, url, likes }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })

  if (updatedBlog) {
    res.json(updatedBlog)
  } else {
    res.status(404).end()
  }
})

router.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params

  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})
