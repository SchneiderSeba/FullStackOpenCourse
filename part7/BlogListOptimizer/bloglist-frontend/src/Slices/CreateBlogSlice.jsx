
import { createSlice } from '@reduxjs/toolkit'

const createBlogSlice = createSlice({
  name: 'createNewBlog',
  initialState: {
    _id: '',
    title: '',
    author: '',
    user: '',
    url: '',
    likes: 0
  },
  reducers: {
    setNewBlog: (state, action) => {
      const { _id, title, author, user, url, likes } = action.payload
      state._id = _id
      state.title = title
      state.author = author
      state.user = user
      state.url = url
      state.likes = likes
    },
    clearNewBlog: (state) => {
      state._id = ''
      state.title = ''
      state.author = ''
      state.user = ''
      state.url = ''
      state.likes = 0
    }
  }
})

export const { setNewBlog, clearNewBlog } = createBlogSlice.actions
export default createBlogSlice.reducer