import { describe, it, expect } from 'vitest'
import { add, safeDivide } from '../src/index'

describe('math utils', () => {
  it('adds numbers', () => {
    expect(add(2, 3)).toBe(5)
  })
  it('safeDivide returns undefined on zero divisor', () => {
    expect(safeDivide(1, 0)).toBeUndefined()
  })
})
