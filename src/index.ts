export function add(a: number, b: number): number {
  return a + b
}

export function safeDivide(a: number, b: number): number | undefined {
  if (b === 0) return undefined
  return a / b
}
