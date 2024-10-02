export const reverse = (string) => {
  return string
    .split('')
    .reverse()
    .join('')
}

export const average = (array) => {
  const reducer = (sum, item) => {
    return sum + item
  }

  return array.reduce(reducer, 0) / array.length
}
