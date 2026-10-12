<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { fetchProduct } from '../api/products'
import { TOTAL_PRODUCTS, getNextIndex, getTheme } from '../utils/product'
import BackgroundPattern from './BackgroundPattern.vue'
import ProductCard from './ProductCard.vue'
import ProductError from './ProductError.vue'
import ProductProgress from './ProductProgress.vue'
import ProductSkeleton from './ProductSkeleton.vue'
import UnavailableProduct from './UnavailableProduct.vue'

const product = ref(null)
const currentIndex = ref(1)
const loading = ref(true) // the first product is requested as soon as we mount
const error = ref(null)

// Page colour. Kept while loading so the background doesn't flash between products.
const stageTheme = ref('neutral')
const stage = ref(null)

const theme = computed(() => (product.value ? getTheme(product.value.category) : null))

const statusMessage = computed(() => {
  if (loading.value) return 'Loading product…'
  if (error.value) return 'We could not load the product.'
  if (!product.value) return ''
  return theme.value
    ? `Showing ${product.value.title}`
    : `Product ${currentIndex.value} of ${TOTAL_PRODUCTS} is unavailable to show.`
})

// Only the latest request may update state; starting a new one aborts the previous.
let activeRequest = null

async function loadProduct() {
  activeRequest?.abort()
  const request = new AbortController()
  activeRequest = request

  // The button that was just pressed is replaced by the skeleton; remember to hand focus on.
  const hadFocus = stage.value?.contains(document.activeElement)

  loading.value = true
  error.value = null

  try {
    const result = await fetchProduct(currentIndex.value, { signal: request.signal })
    if (activeRequest !== request) return // superseded while the response was in flight

    product.value = result
    stageTheme.value = getTheme(result.category) ?? 'neutral'
  } catch (err) {
    if (request.signal.aborted) return // a newer request owns the state now

    product.value = null
    stageTheme.value = 'neutral'
    error.value = err instanceof Error ? err.message : String(err)
  } finally {
    if (activeRequest === request) {
      activeRequest = null
      loading.value = false
      if (hadFocus) focusNextButton()
    }
  }
}

async function focusNextButton() {
  await nextTick()
  stage.value?.querySelector('[data-next]')?.focus({ preventScroll: true })
}

function nextProduct() {
  currentIndex.value = getNextIndex(currentIndex.value)
  return loadProduct()
}

onMounted(loadProduct)
onBeforeUnmount(() => activeRequest?.abort())
</script>

<template>
  <main ref="stage" class="stage" :class="`theme-${stageTheme}`">
    <div class="stage__backdrop" aria-hidden="true">
      <BackgroundPattern v-if="stageTheme !== 'neutral'" />
    </div>

    <p class="sr-only" role="status">{{ statusMessage }}</p>

    <div class="stage__view">
      <ProductSkeleton v-if="loading" />
      <ProductError v-else-if="error" :message="error" @retry="loadProduct" @next="nextProduct" />
      <ProductCard v-else-if="theme" :product="product" :theme="theme" @next="nextProduct" />
      <UnavailableProduct v-else-if="product" @next="nextProduct" />
    </div>

    <ProductProgress class="stage__progress" :current="currentIndex" :total="TOTAL_PRODUCTS" />
  </main>
</template>

<style scoped>
.stage {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  /* equal rows above and below keep the card exactly centred, as in the design */
  grid-template-rows: 1fr auto 1fr;
  justify-items: center;
  align-items: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 32px 24px;
  overflow: hidden;
  isolation: isolate;
  background: var(--white);
}

/* Coloured upper two-thirds; the lower third stays white (as in the design). */
.stage__backdrop {
  position: absolute;
  inset: 0 0 auto;
  height: 66.667%;
  z-index: -1;
  background: var(--theme-bg);
  transition: background-color 0.3s ease;
}

.stage__view {
  display: grid;
  grid-row: 2;
  justify-items: center;
  width: 100%;
}

/* the counter sits in the free space below the card */
.stage__progress {
  grid-row: 3;
  align-self: start;
  margin-top: 20px;
}

@media (max-width: 639px) {
  .stage {
    grid-template-rows: auto auto;
    align-content: center;
    padding: 24px 16px;
  }

  .stage__view {
    grid-row: 1;
  }

  .stage__progress {
    grid-row: 2;
    margin-top: 16px;
  }
}
</style>
