import './Blog.css'

export const Blog = ({ blog }) => (
  <div className="blog-ind">
    {blog.title} {blog.author}
  </div>  
)