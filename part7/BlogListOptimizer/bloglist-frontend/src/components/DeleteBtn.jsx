import './Blog.css'

export const DeleteBtn = ({ handleDeleteBlog }) => {
  return (
    <button className="deleteBtn" onClick={handleDeleteBlog}>
      Delete 🗑️
    </button>
  )
}
