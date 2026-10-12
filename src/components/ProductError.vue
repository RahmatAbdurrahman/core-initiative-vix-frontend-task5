<script setup>
defineProps({
  message: { type: String, default: '' },
})

defineEmits(['retry', 'next'])
</script>

<template>
  <section class="panel error" role="alert">
    <h1 class="error__title">We couldn't load this product</h1>
    <p class="error__text">Please check your connection and try again.</p>
    <p v-if="message" class="error__detail">{{ message }}</p>

    <div class="error__actions">
      <button type="button" class="btn btn--solid" @click="$emit('retry')">Try again</button>
      <button type="button" class="btn" data-next @click="$emit('next')">Next product</button>
    </div>
  </section>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.4em 1.5em;
  text-align: center;
}

.error__title {
  font-size: 1.35em;
  font-weight: 600;
  line-height: 1.3;
}

.error__text {
  margin-top: 0.5em;
  color: var(--secondary-dark);
}

.error__detail {
  margin-top: 0.3em;
  font-size: 0.8em;
  color: var(--secondary-dark);
}

.error__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8em;
  margin-top: 1.5em;
}

.error__actions .btn {
  min-width: 11em;
}

@media (max-width: 639px) {
  .error {
    min-height: 20em;
  }
}
</style>
