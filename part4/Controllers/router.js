import { Blog } from '../Models/Blog.js'
import { Router } from 'express'

export const router = Router()

router.get('/blogs', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

router.post('/blogs', (req, res) => {
  const { title, author, url, likes } = req.body

  if (!title || !author) {
    return res.status(400).json({ error: 'title and author are required' })
  }

  Blog.findOne({ title }).then((existingBlog) => {
    if (existingBlog) {
      existingBlog.author = author
      existingBlog.save().then((updatedBlog) => {
        res.json(updatedBlog)
      })
    } else {
      const newBlog = new Blog({ title, author, url, likes })
      newBlog.save().then((savedBlog) => {
        res.status(201).json(savedBlog)
      })
    }
  }).catch(error => res.status(400).json({ error: error.message }))
})
