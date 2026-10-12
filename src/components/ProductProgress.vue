<script setup>
defineProps({
  current: { type: Number, required: true },
  total: { type: Number, required: true },
})
</script>

<template>
  <!-- Context only, not a control: shows which product this is, so an
       "unavailable" card reads as one item in the list and not its end. -->
  <div class="progress">
    <p class="progress__label">Product {{ current }} of {{ total }}</p>
    <div class="progress__dots" aria-hidden="true">
      <span
        v-for="n in total"
        :key="n"
        class="progress__dot"
        :class="{ 'is-reached': n <= current }"
      />
    </div>
  </div>
</template>

<style scoped>
.progress {
  display: grid;
  justify-items: center;
  gap: 7px;
}

.progress__label {
  font-size: 13px;
  font-weight: 600;
  line-height: 1.2;
  color: var(--secondary-dark);
}

.progress__dots {
  display: flex;
  gap: 4px;
}

.progress__dot {
  width: 5px;
  height: 5px;
  background: color-mix(in srgb, var(--theme-primary) 18%, transparent);
  border-radius: 50%;
}

.progress__dot.is-reached {
  background: var(--theme-primary);
}
</style>
