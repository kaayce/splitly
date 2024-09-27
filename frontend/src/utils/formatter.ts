export function toCents(amount: number, factor = 100) {
  return Math.round(amount * factor)
}

export function fromCents(cents: number): string {
  const dollars = cents / 100
  const formattedDollars = dollars.toFixed(2) // Format to 2 decimal places
  return formattedDollars
}

export function formatAccountNumber(num: string): string {
  if (!num) {
    return ''
  }

  const strNum = num.padStart(11, '0')
  const firstPart = strNum.slice(-2)
  const secondPart = strNum.slice(-4, -2)
  const thirdPart = strNum.slice(-6, -4)
  const remainingPart = strNum.slice(0, -6)

  return `${firstPart}-${secondPart}-${thirdPart}-${remainingPart}` || num
}
