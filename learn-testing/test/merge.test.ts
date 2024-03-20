import { test, expect } from 'vitest'
import { deepMerge } from '../src/main'

test.each([
  { first: { a: 1 }, second: { b: 2 }, expected: { a: 1, b: 2 } },
  { first: { a: 'Name' }, second: { b: 2 }, expected: { a: 'Name', b: 2  } },
])('testing merge with simple object', ({ first, second, expected}) => {
  const value = deepMerge(first, second)

  expect(value).toEqual(expected)
})

test('can merge arrays', () => {
  const value = deepMerge([1,2,3], [4,5,6])

  expect(value).toEqual([1,2,3,4,5,6])
})

test('can deep merge arrays', () => {
  const value = deepMerge({
    a: [1,2,3]},
    {
    a: [4,5,6]
  })

  expect(value).toEqual({
    a: [1,2,3,4,5,6]
  })
})