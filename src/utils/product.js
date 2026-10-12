export const TOTAL_PRODUCTS = 20

const MEN_CATEGORY = "men's clothing"
const WOMEN_CATEGORY = "women's clothing"

/** 1 -> 2 -> ... -> 20 -> 1 */
export function getNextIndex(current) {
  return (current % TOTAL_PRODUCTS) + 1
}

/** Maps an API category to a visual theme; `null` means "unavailable to show". */
export function getTheme(category) {
  if (category === MEN_CATEGORY) return 'men'
  if (category === WOMEN_CATEGORY) return 'women'
  return null
}

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(value) {
  const amount = Number(value)
  return Number.isFinite(amount) ? priceFormatter.format(amount) : ''
}
