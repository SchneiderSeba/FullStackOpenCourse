import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Post } from './Post.jsx'

export const UniqueUser = ({ user, viewDetailsId, setViewDetailsId }) => {

  const [openView, setOpenBlog] = useState(null)

  if (user.blogs.length === 0) {
    return (
      <p style={{ color: '#FF6666', fontSize: '16px', padding: '5px' }}>No blogs available for this user.</p>
    )
  }

  return (
    <>
      <button
        onClick={() => setOpenBlog(!openView)}
        style={{ margin: '10px', backgroundColor: 'blue', color: 'white', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}
        aria-expanded={openView}
      >
        {openView ? 'Hide Details' : 'View Details'}
      </button>
      { openView && (
        <div style={{ marginTop: '5px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {user.blogs.map(blog => (
              <>
                <Link
                  key={blog._id || blog.id}
                  to={`/posts/${blog._id || blog.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <li style={{ marginTop: '5px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                    <span style={{ color: 'lightBlue' }}>{blog.title}</span>
                  </li>
                </Link>
              </>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}