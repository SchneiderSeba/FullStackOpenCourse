

export const UniqueUser = ({ user, blogs }) => {
  return (
    <ul>
      {blogs.map(blog => {
        if (user._id === blog.user) {
          return (
            <li key={blog.id}>
              <span>{blog.title}</span>
            </li>
          )
        }
        return null
      })}
    </ul>
  )
}