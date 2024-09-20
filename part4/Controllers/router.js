import { Blog } from '../Models/Blog.js'
import { Router } from 'express'

export const router = Router()

router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.get('/blogs/:id', async (req, res) => {
  const { id } = req.params

  const blog = await Blog.findById(id)

  if (blog) {
    res.json(blog)
    console.log(blog)
  } else {
    res.status(404).end()
  }
})

router.post('/blogs', async (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' })
  }
  const existingBlog = await Blog.findOne({ title })

  if (existingBlog) {
    existingBlog.author = author
    const updatedBlog = await existingBlog.save()
    res.json(updatedBlog)
  } else {
    const newBlog = new Blog({ title, author, url, likes })
    const savedBlog = await newBlog.save()
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
