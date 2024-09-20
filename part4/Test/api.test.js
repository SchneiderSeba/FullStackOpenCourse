import { test, after, beforeEach, describe } from 'node:test'
import { Blog } from '../Models/Blog.js'
import assert from 'assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'
import { blogsInDb, fackData, nonExistingId } from './test_helper.js'

describe('When there is initially some blogs saved as a test', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of fackData) {
      const blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  const api = supertest(app)

  describe('GET tests', () => {
    test('api test', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test(`there are ${fackData.length} Blogs`, async () => {
      const res = await api.get('/api/blogs')

      assert.strictEqual(res.body.length, fackData.length)
    })

    test('the first note is about XXX author', async () => {
      const res = await api.get('/api/blogs')

      const author = res.body.map(e => e.author)
      assert(author.includes('XXX'), true)
    })
  })

  describe('POST tests', () => {
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

    //   console.log(response.body)
    })

    test('like should be 0 by default', async () => {
      const newBlog = {
        title: 'BLOG DE PRUEBA',
        author: 'BLOG DE PRUEBA',
        url: 'BLOG DE PRUEBA'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const contents = response.body.map(r => r.likes)

      assert.strictEqual(contents[contents.length - 1], 0)

    //   console.log('Should be 0 default', response.body[3])
    })
  })

  describe('PUT or UPDATE tests', () => {
    test('a blog can be updated', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      console.log('Blog ID to Update:', blogToUpdate._id)

      const updatedBlog = {
        likes: 50
      }

      await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAtEnd = await blogsInDb()

      const contents = blogsAtEnd.map(r => r.likes)

      assert.strictEqual(contents[0], 50)
    })
  })

  describe('GET by ID viewing a specific blog', () => {
    test('a specific blog viewed', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToView = blogsAtStart[0]
      //   console.log('Blog ID:', blogToView._id)

      const resultBlog = await api
        .get(`/api/blogs/${blogToView._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      assert.deepStrictEqual(resultBlog.body, processedBlogToView)
    })
  })

  describe('DELETE tests', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToDelete = blogsAtStart[0]
      //   console.log('Blog ID to Delete:', blogToDelete._id)

      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .expect(204)

      const blogsAtEnd = await blogsInDb()

      assert.strictEqual(blogsAtEnd.length, fackData.length - 1)

      const contents = blogsAtEnd.map(r => r.author)

      assert(!contents.includes(blogToDelete.author))

      assert.strictEqual(blogsAtEnd.length, fackData.length - 1)
    })
  })

  describe('ERRORS Validation tests', () => {
    test('fails with statuscode 404 if blog does not exist', async () => {
      const validNonexistingId = await nonExistingId()

      await api
        .get(`/api/blogs/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/blogs/${invalidId}`)
        .expect(500)
    })
    test('Blog without title or url is not added', async () => {
      const newBlog = {
        author: 'BLOG DE PRUEBA',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, fackData.length)

    //   console.log('title or url required', response.body)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
