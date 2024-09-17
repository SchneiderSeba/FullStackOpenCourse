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
  const blog = new Blog(req.body)

  blog
    .save()
    .then(result => {
      res.status(201).json(result)
    })
})
