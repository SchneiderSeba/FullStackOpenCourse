import { describe } from 'node:test'
import { expect, test } from '@jest/globals'
import { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } from '../Utils/list_helper.js'

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Marius Covasevich',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 10,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const results = dummy(blogs)
  // assert.strictEqual(results, 1)
  expect(results).toBe(1)
})

describe('total likes', () => {
  test('check all blogs sum likes, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    // assert.strictEqual(result, 20)
    expect(result).toBe(20)
    // console.log('Total Likes all Blogs:', result)
  })
})

describe('favorite blog', () => {
  test('check favorite blog', () => {
    const result = favoriteBlog(listWithOneBlog)
    // assert.deepStrictEqual(result, listWithOneBlog[2])
    expect(result).toEqual(listWithOneBlog[2])
    // console.log('Blog with more Likes:', result)
  })
})

describe('most blogs', () => {
  test('check author with most blogs', () => {
    const result = mostBlogs(listWithOneBlog)
    // assert.deepStrictEqual(result, { author: 'Edsger W. Dijkstra', blogs: 2 })
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 2 })
    // console.log('Author with most Blogs:', result)
  })
})

describe('most likes', () => {
  const result = mostLikes(listWithOneBlog)
  // assert.deepStrictEqual(result, { author: 'Marius Covasevich', likes: 10 })
  expect(result).toEqual({ author: 'Marius Covasevich', likes: 10 })
  // console.log('Author with most Likes:', result)
})
