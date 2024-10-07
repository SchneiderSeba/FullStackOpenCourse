import { useState } from 'react'
import { Blog } from './Blog'
import './BlogSection.css'

export const BlogSection = ({ blogs, viewContent, handleView, handleUpdateBlog, handleDeleteBlog, user }) => {
    return (
        <div className='blogSection'>
            <h2>Blogs</h2>
            {blogs.map(blog =>
                <Blog key={blog._id} blog={blog} viewContent={viewContent} handleView={handleView} handleUpdateBlog={handleUpdateBlog} handleDeleteBlog={handleDeleteBlog} user={user}/>
            )}
        </div>
    )
}

export const ShowCreateBlog = ({ showCreateForm }) => {

    return (
        <div className={!showCreateForm ? 'createFormOff' : 'createFormOn'}>
            <button>{showCreateForm ? 'Cancel' : 'Create'}</button>
        </div>
    )
}

export const FormNewBlog = ({ handleCreateBlog }) => {

    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: ''
    })

    const onSubmit = (event) => {
        event.preventDefault()
        console.log('Creating new blog:', newBlog)
        handleCreateBlog(newBlog)
        setNewBlog({ title: '', author: '', url: '' })
    }

    const handleNewBlog = (event) => {
        const { name, value } = event.target
        setNewBlog({ ...newBlog, [name]: value })
    }

    return (
    <form onSubmit={onSubmit}>
      <div className='createForm'>
      <h2>Create new blog</h2>
        <input type="text" name='title' value={newBlog.title} onChange={handleNewBlog} placeholder='Title'/>
        <input type="text" name='author' value={newBlog.author} onChange={handleNewBlog} placeholder='Author'/>
        <input type="text" name='url' value={newBlog.url} onChange={handleNewBlog} placeholder='URL'/>
        <button type="submit">Create</button>
      </div>
    </form>

    ) 
}