import { beforeEach, describe } from 'node:test'
import { expect, test, afterAll, beforeAll } from '@jest/globals'
import { Blog } from '../Models/Blog.js'
import { User } from '../Models/User.js'
import { blogsInDb, usersInDb, fackData, nonExistingId, getTokenForTest } from './test_helper.js'
import bcrypt from 'bcrypt'
import assert from 'assert'
import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'
import dotenv from 'dotenv'
dotenv.config()

describe('When there is initially some blogs saved as a test', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)
    const testUser = new User({ username: 'testUser', passwordHash })
    await testUser.save()

    for (const blog of fackData) {
      const blogObject = new Blog({ ...blog, user: testUser._id })
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

      const allBlogs = await blogsInDb()

      expect(res.body.length).toBe(allBlogs.length)
    })
  })

  describe('POST tests', () => {
    test('a valid BLOG can be added ', async () => {
      const blogsBefore = await blogsInDb()

      const newBlog = {
        title: 'BLOG DE PRUEBA',
        author: 'BLOG DE PRUEBA',
        url: 'BLOG DE PRUEBA',
        likes: 1,
        user: '66f16dee6748ed9e6109a9df'
      }

      const token = await getTokenForTest()

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        // agregar exoect para autorizacion jwt
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const contents = response.body.map(r => r.author)

      const blogsAfter = await blogsInDb()

      // assert.strictEqual(response.body.length, fackData.length + 1)
      expect(blogsAfter.length).toBe(blogsBefore.length + 1)

      // assert(contents.includes('BLOG DE PRUEBA'), true)
      expect(contents).toContain('BLOG DE PRUEBA')

    //   console.log(response.body)
    })

    test('blog without content is not added', async () => {
      const blogsBefore = await blogsInDb()

      const newBlog = {
        likes: 1
      }

      const token = await getTokenForTest()

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(400)

      const blogsAfter = await blogsInDb()

      // console.log('Blogs Before:', blogsBefore.body)

      // assert.strictEqual(response.body.length, fackData.length)
      expect(blogsAfter.length).toBe(blogsBefore.length)

    //   console.log(response.body)
    })

    test('You cant creat a blog if you dont send a token', async () => {
      const initBlogs = await blogsInDb()

      const newBlog = {
        title: 'BLOG DE PRUEBA',
        author: 'BLOG DE PRUEBA',
        url: 'BLOG DE PRUEBA',
        likes: 1,
        user: '66f16dee6748ed9e6109a9df'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const response = await api.get('/api/blogs')

      // assert.strictEqual(response.body.length, initBlogs.length)
      expect(response.body.length).toBe(initBlogs.length)
    })

    test('like should be 0 by default', async () => {
      const newBlog = {
        title: 'BLOG DE PRUEBA',
        author: 'BLOG DE PRUEBA',
        url: 'BLOG DE PRUEBA',
        user: '66f16dee6748ed9e6109a9df'
      }

      const token = await getTokenForTest()

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      // el blog agregaro debe tener 0 likes

      const addedBlog = response.body.find(blog => blog.title === 'BLOG DE PRUEBA')

      console.log('Blog:', addedBlog)

      expect(addedBlog.likes).toBe(1)
    })
  })

  describe('PUT or UPDATE tests', () => {
    test('a blog can be updated', async () => {
      const blogsAtStart = await blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      // console.log('Blog ID to Update:', blogToUpdate._id)
      const token = await getTokenForTest()

      const updatedBlog = {
        likes: 50
      }

      await api
        .put(`/api/blogs/${blogToUpdate._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedBlog)
        .expect(200)

      const blogsAtEnd = await blogsInDb()

      const contents = blogsAtEnd.map(r => r.likes)

      // assert.strictEqual(contents[0], 50)
      expect(contents[0]).toBe(50)
    })
  })

  describe('GET by ID viewing a specific blog', () => {
    test('a specific blog viewed', async () => {
      const blogsAtStart = await blogsInDb()
      // console.log('Blogs:', blogsAtStart)

      const blogToView = blogsAtStart[0]
      // console.log('Blog to View:', blogToView)

      // console.log('Blog ID:', blogToView._id)

      const resultBlog = await api
        .get(`/api/blogs/${blogToView._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

      // assert.deepStrictEqual(resultBlog.body, processedBlogToView)
      expect(resultBlog.body).toEqual(processedBlogToView)
    })
  })

  describe('DELETE tests', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await blogsInDb()
      // console.log('Blogs START:', blogsAtStart)
      const blogToDelete = blogsAtStart[0]
      // console.log('Blog ID to Delete:', blogToDelete._id)
      const token = await getTokenForTest()

      await api
        .delete(`/api/blogs/${blogToDelete._id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await blogsInDb()

      // console.log('Blogs END:', blogsAtEnd)

      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

      const contents = blogsAtEnd.map(r => r.author)

      // assert(!contents.includes(blogToDelete.author))
      expect(contents).not.toContain(blogToDelete.author)
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
        .expect(400)
    })
    test('Blog without title or url is not added', async () => {
      const newBlog = {
        author: 'BLOG DE PRUEBA',
        likes: 1
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)

      const response = await api.get('/api/blogs')

      const blogsAfter = await blogsInDb()

      // assert.strictEqual(response.body.length, fackData.length)
      expect(response.body.length).toBe(blogsAfter.length)

    //   console.log('title or url required', response.body)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('When there is initially one user at db', () => {
  try {
    beforeAll(async () => {
      await mongoose.connect(process.env.TEST_MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    })
  } catch (error) {}

  try {
    beforeEach(async () => {
      await User.deleteMany({})
      await Blog.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })
  } catch (error) {}

  const api = supertest(app)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    await api
      .post('/api/users')
      .send({
        username: 'MONOdelViendto',
        name: 'MonoV',
        password: '155655FDFDFDD8'
      })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()

    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)

    expect(usernames).toContain('yktyjdfgdrg')
  })

  test('invalid username or password to create a new  user', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'te',
      name: 'Test User',
      password: 'test123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()

    console.log('Users:', usersAtEnd)

    // assert.strictEqual(usersAtEnd.length, 1)
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
