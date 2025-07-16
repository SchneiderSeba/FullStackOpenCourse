import { useState } from 'react'
import { Blog } from './Blog'
import './BlogSection.css'
import PropTypes from 'prop-types'

export const BlogSection = ({
  blogs,
  viewContent,
  handleView,
  handleUpdateBlog,
  handleDeleteBlog,
  user,
}) => {
  return (
    <div className="blogSection">
      {blogs.map((blog) => (
        <Blog
          key={blog._id}
          blog={blog}
          viewContent={viewContent}
          handleView={handleView}
          handleUpdateBlog={handleUpdateBlog}
          handleDeleteBlog={handleDeleteBlog}
          user={user}
        />
      ))}
    </div>
  )
}

BlogSection.propTypes = {
  blogs: PropTypes.array.isRequired,
  viewContent: PropTypes.bool.isRequired,
  handleView: PropTypes.func.isRequired,
  handleUpdateBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object,
}

export const ShowCreateBlog = ({ showCreateForm }) => {
  return (
    <div className={!showCreateForm ? 'createFormOff' : 'createFormOn'}>
      <button>{showCreateForm ? 'Cancel' : 'Create'}</button>
    </div>
  )
}

export const FormNewBlog = ({ handleCreateBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const onSubmit = (event) => {
    event.preventDefault()
    console.log('Creating new blog:', newBlog)
    handleCreateBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  const handleNewBlog = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="createForm">
        <h2>Create new blog</h2>
        <input
          data-testid="title"
          type="text"
          name="title"
          value={newBlog.title}
          onChange={handleNewBlog}
          placeholder="Title"
        />
        <input
          data-testid="author"
          type="text"
          name="author"
          value={newBlog.author}
          onChange={handleNewBlog}
          placeholder="Author"
        />
        <input
          data-testid="url"
          type="text"
          name="url"
          value={newBlog.url}
          onChange={handleNewBlog}
          placeholder="URL"
        />
        <button type="submit">Create</button>
      </div>
    </form>
  )
}
