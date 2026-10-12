<script setup>
import { computed } from 'vue'
import { formatPrice } from '../utils/product'
import ProductRating from './ProductRating.vue'

const props = defineProps({
  product: { type: Object, required: true },
  theme: { type: String, required: true, validator: (value) => ['men', 'women'].includes(value) },
})

defineEmits(['next'])

const price = computed(() => formatPrice(props.product.price))
</script>

<template>
  <article class="panel product" :class="`theme-${theme}`">
    <div class="product__media">
      <img class="product__image" :src="product.image" :alt="product.title" />
    </div>

    <div class="product__body">
      <h1 class="title">{{ product.title }}</h1>

      <div class="meta">
        <span class="meta__category">{{ product.category }}</span>
        <ProductRating :rate="product.rating?.rate" />
      </div>

      <p class="description">{{ product.description }}</p>

      <div class="product__footer">
        <p class="price">{{ price }}</p>
        <div class="product__actions">
          <button type="button" class="btn btn--solid">Buy now</button>
          <button type="button" class="btn" data-next @click="$emit('next')">Next product</button>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped>
/* Sizes are em of the card (1em = 10px of the 540px design), measured from the
   Figma screenshots: positions, text widths and line breaks match the reference. */
.title {
  font-size: 1.45em;
  font-weight: 600;
  line-height: 1.2;
  color: var(--theme-primary);
  overflow-wrap: anywhere;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8em;
  margin-top: 0.9em;
  padding-bottom: 0.45em;
  font-size: 0.95em;
  line-height: 1.2;
  color: var(--secondary-dark);
  border-bottom: 1px solid var(--gray);
}

.description {
  margin: 1.02em 0 1.39em;
  font-size: 1.08em;
  line-height: 1.2;
  color: var(--dark);
  overflow-wrap: anywhere;
}

.price {
  font-size: 1.4em;
  font-weight: 700;
  line-height: 1.2;
  color: var(--theme-primary);
}

/* The women's screenshot has a little more air between the (two-line) title, the
   category row and the description than the men's one, and a slightly tighter line
   pitch (12.7px vs 13px). Measured from the PNG pixels; only the two-column layout. */
@media (min-width: 640px) {
  .theme-women .meta {
    margin-top: 1.37em;
    padding-bottom: 0.63em;
  }

  .theme-women .description {
    margin-top: 1.32em;
    line-height: 1.17;
  }
}

@media (max-width: 639px) {
  .description {
    line-height: 1.35;
  }
}
</style>
