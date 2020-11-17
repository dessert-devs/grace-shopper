export function displayPrice(num) {
  let exponent = Math.pow(10, -2)
  return num * exponent
}

export function formatInput(e) {
  //this prevents unwanted input in add to cart field
  let checkIfNum
  if (e.key !== undefined) {
    checkIfNum =
      e.key === 'e' || e.key === '.' || e.key === '+' || e.key === '-'
  }
  return checkIfNum && e.preventDefault()
}
