<template>
  <RouterView v-slot="{ Component }">
    <transition name="page" mode="out-in">
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

<script setup lang="ts">
// App-level setup
</script>

<style>
@import "./styles/tokens/animations.css";

/* Page Transition Effects */
.page-enter-active,
.page-leave-active {
  transition: opacity var(--transition-normal) var(--ease-out),
    transform var(--transition-normal) var(--ease-out);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Focus styling for accessibility */
*:focus-visible {
  outline: 2px solid var(--focus-ring-color);
  outline-offset: 2px;
}
</style>
