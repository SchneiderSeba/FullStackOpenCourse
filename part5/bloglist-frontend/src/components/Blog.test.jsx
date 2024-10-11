import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import { expect, test, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

test('renders blog title', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'Test url',
    likes: 0
  }

  const mockHandler = vi.fn()
  const mockUpdateHandler = vi.fn().mockResolvedValue({ likes: 1 })

  render(<Blog blog={blog} onClick={mockHandler} handleUpdateBlog={mockUpdateHandler}/>)

  const user = userEvent.setup()
  const buttonView = screen.getByRole('button', { name: /view/i })
  expect(buttonView).toBeInTheDocument()
  await user.click(buttonView)

  const buttonLike = screen.getByText('Like 👍')
  await user.click(buttonLike)

  screen.debug()

  const element = screen.getByText('Test blog')

  expect(element).toBeInTheDocument()

  expect(mockUpdateHandler).toHaveBeenCalledTimes(1)
})

