import { Link, useParams } from 'react-router-dom'
import { LikeBtn } from './LikeBtn'

export const Post = ({ blogs, updateLikes }) => {

  const { id } = useParams()
  const blog = blogs.find(blog => blog._id === id || blog.id === id)

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
    <div style={{ margin: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>{blog.title}</h2>
      <p><strong>Author:</strong> {blog.author}</p>
      <p><strong>URL:</strong> {blog.url}</p>
      <p><strong>Likes:</strong> {blog.likes}</p>

      <LikeBtn updateLikes={() => updateLikes(blog._id || blog.id)} style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
        Like
      </LikeBtn>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <button style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #007bff', borderRadius: '5px' }}>
          Return
        </button>
      </Link>
    </div>
  )
}