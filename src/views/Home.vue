<template>
  <div class="page-container">
    <NavigationBar />
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import NavigationBar from "../components/ui/NavigationBar.vue";
</script>

<style scoped>
@import "../styles/tokens/colors.css";
@import "../styles/tokens/animations.css";

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Page transition animations */
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
</style>
