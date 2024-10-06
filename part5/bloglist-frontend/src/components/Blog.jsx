import './Blog.css'
import { useState } from 'react'
import { LikeBtn } from './LikeBtn'

export const Blog = ({ blog, viewContent, handleView }) => {

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (

  <div className="blog-ind">
    <p>Titulo : {blog.title}<br/></p>
    <button onClick={toggleVisibility}>{isVisible ? 'Hide'  : 'View'}</button>
    {isVisible && 
      <div>
        <p>URL : {blog.url}</p>
        <p>Likes : {blog.likes}</p><LikeBtn />
        <p>Author : {blog.author}</p>
      </div>
    }
  </div>
  )
}