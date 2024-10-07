import './Blog.css'
import { useState } from 'react'
import { LikeBtn } from './LikeBtn'

export const Blog = ({ blog, handleUpdateBlog }) => {

  const [isVisible, setIsVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const toggleVisibility = () => setIsVisible(!isVisible)

  const updateLikes = async () => {
    const updatedBlog = { ...blog, likes: likes + 1 }
    const returnedBlog = await handleUpdateBlog(blog._id, updatedBlog)
    setLikes(returnedBlog.likes)
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
              {blog.url}
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
            </div>
          </div>
        </div>
      )}
    </div>

  // <div className="blog-ind">
  //   <p>Titulo : {blog.title}<br/></p>
  //   <button onClick={toggleVisibility}>{isVisible ? 'Hide'  : 'View'}</button>
  //   {isVisible && 
  //     <div>
  //       <p>URL : {blog.url}</p>
  //         <div className='likes-container'>
  //           <p>Likes : {likes}</p><LikeBtn updateLikes={updateLikes}/>
  //         </div>
  //       <p>Author : {blog.author}</p>
  //     </div>
  //   }
  // </div>
  )
}