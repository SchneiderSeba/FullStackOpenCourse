import { Link, useParams } from 'react-router-dom'
import { LikeBtn } from './LikeBtn'
import './Post.css' // Assuming you have a CSS file for styling
import './comments.css' // Assuming you have a CSS file for comments styling

export const Post = ({ blogs, updateLikes, handleComment, user, allUsers }) => {

  const { id } = useParams()
  const blog = blogs.find(blog => blog._id === id || blog.id === id)

  const addComment = (id, comment, user, commentAuthor) => {

    console.log(`Adding comment to blog with id ${id}: ${comment}`)

    handleComment(id, comment, user, commentAuthor)
  }

  if (!blog) {
    return <div>Blog not found</div>
  }

  return (
  // <div className='Post'>
  //   <h2>{blog.title}</h2>
  //   <p><strong>Author:</strong> {blog.author}</p>
  //   <p><strong>URL:</strong> {blog.url}</p>
  //   <p><strong>Likes:</strong> {blog.likes}</p>

  //   <LikeBtn updateLikes={() => updateLikes(blog._id || blog.id)} style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}>
  //     Like
  //   </LikeBtn>

  //   <Link to="/" style={{ textDecoration: 'none' }}>
  //     <button style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: 'transparent', color: '#fff', border: '1px solid #007bff', borderRadius: '5px' }}>
  //       Return
  //     </button>
  //   </Link>
  // </div>

    <div className="post-wrapper">
      <div className='Post'>
        <h2>{blog.title}</h2>
        <p><strong>Author:</strong> {blog.author}</p>
        <p><strong>URL:</strong> {blog.url}</p>
        <p><strong>Likes:</strong> {blog.likes}</p>
        <LikeBtn
          updateLikes={() => updateLikes(blog._id || blog.id)}
          style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Like
        </LikeBtn>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: 'transparent',
            color: '#007bff',
            border: '1px solid #007bff',
            borderRadius: '5px'
          }}>
            Return
          </button>
        </Link>
      </div>

      <div className='comments Post'>
        <h3>Comments</h3>

        {blog.comments && blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((commentObj, index) => {
              // Busca el usuario cuyo _id coincide con el del comentario
              const userAuthor = allUsers.find(u => u._id === commentObj.commentAuthor || u.id === commentObj.commentAuthor)
              return (
                <li key={commentObj.commentAuthor || index}>
                  {commentObj.comment}
                  <span style={{ color: '#888', marginLeft: '8px' }}>
          — {userAuthor ? (userAuthor.name || userAuthor.username) : 'Usuario desconocido'}
                  </span>
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
        <form onSubmit={(e) => {
          e.preventDefault()
          const comment = e.target.comment.value
          const commentAuthor = user._id || user.id
          if (comment) {
            // Assuming you have a function to handle adding comments
            addComment(blog._id || blog.id, comment, user, commentAuthor)
            e.target.comment.value = ''
          }
        }}>
          <input type="text" name="comment" placeholder="Add a comment" required />
          <button type="submit" onClick={addComment} style={{
            marginTop: '10px',
            padding: '5px 10px',
            backgroundColor: 'transparent',
            color: '#007bff',
            border: '1px solid #007bff',
            borderRadius: '5px' }}>Submit</button>
        </form>
      </div>

    </div>
  )
}