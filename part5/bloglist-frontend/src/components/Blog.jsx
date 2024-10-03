import './Blog.css'

export const Blog = ({ blog }) => (
  <div className="blog-ind">
    Titulo : {blog.title}<br/>
    Author : {blog.author}
  </div>  
)