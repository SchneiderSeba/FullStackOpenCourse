/* eslint-disable no-self-compare */
export const dummy = (blogs) => {
  return 1
}

export const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

export const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

// export const mostBlogs = (blogs) => {
//   const authors = blogs.map(blog => blog.author)
//   const author = authors.sort((a, b) => authors.filter(author => author === a).length - authors.filter(author => author === b).length).pop()
//   return {
//     author,
//     blogs: authors.filter(a => a === author).length
//   }
// }

export const mostBlogs = (blogs) => {
  const blogCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const authorWithMostBlogs = Object.keys(blogCounts).reduce((a, b) =>
    blogCounts[a] > blogCounts[b] ? a : b
  )

  return {
    author: authorWithMostBlogs,
    blogs: blogCounts[authorWithMostBlogs]
  }
}

export const mostLikes = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const author = authors.sort((a, b) => totalLikes(blogs.filter(blog => blog.author === a)) - totalLikes(blogs.filter(blog => blog.author === b))).pop()
  return {
    author,
    likes: totalLikes(blogs.filter(blog => blog.author === author))
  }
}
