// Overridable for local testing, e.g. VITE_API_BASE_URL=http://localhost:4010
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'https://fakestoreapi.com').replace(/\/+$/, '')

/**
 * GET {API_BASE_URL}/products/{id}
 * Rejects with a user-presentable Error on network failure, non-2xx status,
 * or a body that is not a product. Aborts are re-thrown untouched.
 */
export async function fetchProduct(id, { signal } = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}/products/${id}`, { signal })
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error('Could not reach the store API.')
  }

  if (!response.ok) {
    throw new Error(`The store API answered with status ${response.status}.`)
  }

  let product
  try {
    product = await response.json()
  } catch (error) {
    if (signal?.aborted) throw error
    throw new Error('The store API sent an unreadable response.')
  }

  if (!product || typeof product !== 'object' || product.id == null) {
    throw new Error(`No product found for id ${id}.`)
  }

  return product
}
