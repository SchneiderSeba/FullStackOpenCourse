import './Blog.css'
import { useState } from 'react'
import { LikeBtn } from './LikeBtn'
import { DeleteBtn } from './DeleteBtn'

export const Blog = ({ blog, handleUpdateBlog, handleDeleteBlog, user }) => {

  const [isVisible, setIsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const updateLikes = async () => {
    const updatedBlog = { ...blog, likes: likes + 1 }
    const returnedBlog = await handleUpdateBlog(blog._id, updatedBlog)
    setLikes(returnedBlog.likes)
  }

  const deleteBlog = async () => {
    handleDeleteBlog(blog.id, user.id)
  }

  return (

    <div className='blogCard'>
      <div className='blogHeader'>
        <h2 className='blogTitle'>{blog.title}</h2>
        <button onClick={toggleVisibility} className='toggleButton'>
          {isVisible ? 'Hide' : 'View'}
        </button>
      </div>
      {isVisible && (
        <div className='blogContent'>
          <div className='blogUrl'>
            <span className='icon'>🔗</span>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              Link Here
            </a>
          </div>
          <div className='blogInfo'>
            <div className='author'>
              <span className='icon'>👤</span>
              <span>{blog.author}</span>
            </div>
            <div className='likes'>
              <span>{likes} likes</span>
              <LikeBtn updateLikes={updateLikes}/>
              {user.id === blog.user && (
                <DeleteBtn handleDeleteBlog={deleteBlog} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}