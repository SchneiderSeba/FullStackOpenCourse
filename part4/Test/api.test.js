import { test, after, beforeEach } from 'node:test'
import { Blog } from '../Models/Blog.js'
import assert from 'assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'

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

test('the first note is about XXX author', async () => {
  const res = await api.get('/api/blogs')

  const author = res.body.map(e => e.author)
  assert(author.includes('XXX'), true)
})

test('a valid BLOG can be added ', async () => {
  const newBlog = {
    title: 'BLOG DE PRUEBA',
    author: 'BLOG DE PRUEBA',
    url: 'BLOG DE PRUEBA',
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.author)

  assert.strictEqual(response.body.length, fackData.length + 1)

  assert(contents.includes('BLOG DE PRUEBA'), true)

//   console.log(response.body)
})

test('blog without content is not added', async () => {
  const newBlog = {
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, fackData.length)

  console.log(response.body)
})

after(async () => {
  await mongoose.connection.close()
})