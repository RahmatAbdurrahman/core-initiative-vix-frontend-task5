<template>
  <!-- Faint circles / squares / triangles tiled over the coloured part of the page.
       Purely decorative. The tile is 23em x 17em and scales with the card. -->
  <svg class="pattern" aria-hidden="true" focusable="false" width="100%" height="100%">
    <defs>
      <pattern id="shape-tile" width="23em" height="17em" viewBox="0 0 230 170" patternUnits="userSpaceOnUse">
        <g fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round">
          <path d="M44 22 L44 40 L28 31 Z" />
          <circle cx="112" cy="20" r="8" />
          <rect x="168" y="30" width="15" height="15" rx="2" />
          <path d="M20 112 L36 112 L28 98 Z" />
          <circle cx="86" cy="118" r="7" />
          <path d="M130 96 L130 114 L114 105 Z" />
          <rect x="176" y="104" width="13" height="13" rx="2" />
          <circle cx="205" cy="150" r="6" />
          <rect x="52" y="152" width="11" height="11" rx="2" />
        </g>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#shape-tile)" />
  </svg>
</template>

<style scoped>
.pattern {
  position: absolute;
  inset: 0;
  font-size: calc(var(--card-width) / 54); /* same unit as the card: 1em = 10px of the design */
  color: color-mix(in srgb, var(--theme-primary) 10%, transparent);
  pointer-events: none;
}

@media (max-width: 639px) {
  .pattern {
    font-size: 11px;
  }
}
</style>
