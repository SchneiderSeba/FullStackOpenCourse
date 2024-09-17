import { test, after, beforeEach } from 'node:test'
import { Blog } from '../Models/Blog.js'
import assert from 'assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'

const fackData = [
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
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(fackData[0])
  await blogObject.save()
  blogObject = new Blog(fackData[1])
  await blogObject.save()
}
)

const api = supertest(app)

test('api test', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 2 blogs', async () => {
  const res = await api.get('/api/blogs')

  assert.strictEqual(res.body.length, fackData.length)
})

test('the first note is about HTTP methods', async () => {
  const res = await api.get('/api/blogs')

  const author = res.body.map(e => e.author)
  assert(author.includes('XXX'), true)
})

after(async () => {
  await mongoose.connection.close()
})
