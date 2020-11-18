export function displayPrice(num) {
  let exponent = Math.pow(10, -2)
  let answer = num * exponent
  return answer.toFixed(2)
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
