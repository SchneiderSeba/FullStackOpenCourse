import { Blog } from './Blog'

export const BlogSection = ({ blogs }) => {
    return (
        <div>
            <h2>Blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog._id} blog={blog} />
            )}
        </div>
    )
}