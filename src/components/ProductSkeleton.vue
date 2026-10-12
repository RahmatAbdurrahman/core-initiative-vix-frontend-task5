<template>
  <!-- Mirrors ProductCard's layout (shared .panel/.product classes) so nothing jumps when data arrives. -->
  <div class="panel product skeleton" aria-hidden="true">
    <div class="product__media">
      <div class="bone image" />
    </div>

    <div class="product__body">
      <div class="bone title" />
      <div class="bone title title--short" />

      <div class="meta">
        <div class="bone line meta__category" />
        <div class="bone line meta__rating" />
      </div>

      <div class="description">
        <div class="bone line" />
        <div class="bone line" />
        <div class="bone line" />
        <div class="bone line description__last" />
      </div>

      <div class="product__footer">
        <div class="bone price" />
        <div class="product__actions">
          <div class="bone button" />
          <div class="bone button" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* the real card fades in once data arrives; the placeholder appears immediately */
.skeleton {
  animation: none;
}

.bone {
  background: linear-gradient(90deg, #ececec 25%, #f6f6f6 50%, #ececec 75%);
  background-size: 200% 100%;
  border-radius: 0.3em;
  animation: shimmer 1.4s ease-in-out infinite;
}

.line {
  height: 1.1em;
}

.image {
  width: 100%;
  max-width: 16em;
  height: 19.8em;
  border-radius: 0.5em;
}

.title {
  height: 1.7em;
}

.title--short {
  width: 60%;
  margin-top: 0.4em;
}

.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.9em;
  padding-bottom: 0.6em;
  border-bottom: 1px solid var(--gray);
}

.meta__category {
  width: 28%;
}

.meta__rating {
  width: 34%;
}

.description {
  display: grid;
  gap: 0.7em;
  margin: 1.2em 0 1.4em;
}

.description__last {
  width: 70%;
}

.price {
  width: 22%;
  height: 1.7em;
}

.button {
  height: 2.2em;
}

@keyframes shimmer {
  from {
    background-position: 200% 0;
  }

  to {
    background-position: -200% 0;
  }
}

@media (max-width: 639px) {
  .button {
    height: 3em;
  }
}
</style>
