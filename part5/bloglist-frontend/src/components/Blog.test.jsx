import { render, screen } from '@testing-library/react'
import { Blog } from './Blog'
import { expect, test } from 'vitest'

test('renders blog title', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test author',
    url: 'Test url'
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Test blog')

  expect(element).toBeInTheDocument()
})

