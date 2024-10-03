import './Blog.css'

export const Blog = ({ blog }) => (
  <div className="blog-ind">
    <p>Titulo : {blog.title}<br/></p>
    <p>Author : {blog.author}</p>
  </div>  
)