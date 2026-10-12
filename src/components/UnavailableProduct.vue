<script setup>
defineEmits(['next'])
</script>

<template>
  <section class="panel unavailable">
    <!-- Decorative sad face: two slanted brows, two eyes, a big frown. -->
    <svg class="face" viewBox="0 0 395 206" aria-hidden="true" focusable="false">
      <path d="M40 16 Q91 -6 140 0 L140 13 Q93 9 40 30 Z" />
      <path d="M355 16 Q304 -6 255 0 L255 13 Q302 9 355 30 Z" />
      <circle cx="110" cy="56" r="28" />
      <circle cx="285" cy="56" r="28" />
      <path d="M0 176 Q197.5 60 395 176 L395 206 Q197.5 74 0 206 Z" />
    </svg>

    <div class="content">
      <h1 class="message">This product is unavailable to show</h1>
      <button type="button" class="btn next" data-next @click="$emit('next')">Next product</button>
    </div>
  </section>
</template>

<style scoped>
.unavailable {
  display: grid;
  place-items: center;
  padding: 2.45em 1.5em 3.1em; /* the extra bottom space puts the message where the design has it */
  overflow: hidden;
}

.face {
  position: absolute;
  top: 53%;
  left: 50%;
  width: 73%;
  height: auto;
  fill: #e6e6e6;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.content {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 0.6em;
  width: 100%;
}

.message {
  font-size: 1.03em;
  font-weight: 400;
  line-height: 1.4;
  text-align: center;
  color: var(--dark);
}

.next {
  width: min(100%, 23.1em); /* 243px of the 540px design (the button's own font is 1.05em) */
  color: var(--dark);
  border-color: var(--dark);
}

@media (max-width: 639px) {
  .unavailable {
    min-height: 26em;
  }

  .face {
    width: 92%;
  }
}
</style>
