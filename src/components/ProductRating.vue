<script setup>
import { computed } from 'vue'

const props = defineProps({
  rate: { type: [Number, String], default: 0 },
  max: { type: Number, default: 5 },
})

const value = computed(() => Number(props.rate) || 0)
const filled = computed(() => Math.min(props.max, Math.max(0, Math.round(value.value))))
</script>

<template>
  <div class="rating" role="img" :aria-label="`Rated ${value} out of ${max}`">
    <span class="rating__value" aria-hidden="true">{{ value }}/{{ max }}</span>
    <span class="rating__dots" aria-hidden="true">
      <span
        v-for="n in max"
        :key="n"
        class="rating__dot"
        :class="{ 'is-filled': n <= filled }"
      />
    </span>
  </div>
</template>

<style scoped>
.rating {
  display: inline-flex;
  align-items: center;
  gap: 0.5em;
  white-space: nowrap;
}

.rating__dots {
  display: inline-flex;
}

/* dots touch each other in the design */
.rating__dot {
  width: 1.1em;
  height: 1.1em;
  background: var(--white);
  border: max(1px, 0.1em) solid var(--theme-primary);
  border-radius: 50%;
}

.rating__dot.is-filled {
  background: var(--theme-primary);
}
</style>
