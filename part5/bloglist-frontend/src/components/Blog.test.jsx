import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import { FormNewBlog } from './BlogSection'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('Blog component', () => {

  test('renders blog likes', async () => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'Test url',
      likes: 0,
      user: {
        id: 'testId'
      }
    }

    const mockHandler = vi.fn()
    const mockUpdateHandler = vi.fn().mockResolvedValue({ likes: 1 })

    const user = userEvent.setup({ user: { id : 'testId' } })

    render(<Blog blog={blog} onClick={mockHandler} handleUpdateBlog={mockUpdateHandler} user={user}/>)

    const buttonView = screen.getByRole('button', { name: /view/i })
    expect(buttonView).toBeInTheDocument()
    await user.click(buttonView)

    const buttonLike = screen.getByText('Like 👍')
    await user.click(buttonLike)

    // screen.debug()

    const element = screen.getByText('Test blog')

    expect(element).toBeInTheDocument()

    expect(mockUpdateHandler).toHaveBeenCalledTimes(1)
  })

})

describe('ToggleFunction', () => {

  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'Test url',
    likes: 0
  }

  const user = userEvent.setup({ user: { id : 'testId' } })

  const mockHandler = vi.fn()

  let container

  beforeEach(() => {
    container = render(<Blog blog={blog} onClick={mockHandler} user={user}/>).container
  })

  test('before Click is not visible', async () => {
    const div = container.querySelector('.blogContent')
    expect(div).toBeNull()
  })

  test('after Click is visible', async () => {
    const button = container.querySelector('.toggleButton')
    await userEvent.click(button)

    // screen.debug()

    const div = container.querySelector('.blogContent')
    expect(div).not.toBeNull()
  })
})

describe('Form check', () => {

  test('<FormNewBlog /> updates parent state and calls onSubmit', async () => {
    const handleCreateBlog = vi.fn()
    const user = userEvent.setup({ user: { id : ' testId' } })

    const component = render(<FormNewBlog handleCreateBlog={handleCreateBlog} />)

    screen.debug()

    const inputTitle = component.getByPlaceholderText('Title')
    const inputAuthor = component.getByPlaceholderText('Author')
    const inputUrl = component.getByPlaceholderText('URL')
    // const createBtn = component.getByRole('button', { name: 'Create' })

    await userEvent.type(inputTitle, 'Test title')
    await userEvent.type(inputAuthor, 'Test author')
    await userEvent.type(inputUrl, 'Test url')
    await userEvent.click(component.getByRole('button', { name: 'Create' }))

    expect(handleCreateBlog).toHaveBeenCalledTimes(1)
    expect(handleCreateBlog.mock.calls[0][0]).toEqual({
      title: 'Test title',
      author: 'Test author',
      url: 'Test url'
    })
  })
})