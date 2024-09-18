import { test, after, beforeEach } from 'node:test'
import { Blog } from '../Models/Blog.js'
import assert from 'assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'
import { blogsInDb, fackData } from './test_helper.js'

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

test('a specific blog viewed', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToView = blogsAtStart[0]
  console.log('Blog ID:', blogToView._id)

  const resultBlog = await api
    .get(`/api/blogs/${blogToView._id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

  assert.deepStrictEqual(resultBlog.body, processedBlogToView)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await blogsInDb()
  const blogToDelete = blogsAtStart[0]
  console.log('Blog ID to Delete:', blogToDelete._id)

  await api
    .delete(`/api/blogs/${blogToDelete._id}`)
    .expect(204)

  const blogsAtEnd = await blogsInDb()

  assert.strictEqual(blogsAtEnd.length, fackData.length - 1)

  const contents = blogsAtEnd.map(r => r.author)

  assert(!contents.includes(blogToDelete.author))

  assert.strictEqual(blogsAtEnd.length, fackData.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
