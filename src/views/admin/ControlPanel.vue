<template>
  <div class="panel">
    <Sidebar />
    <main class="panel__content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../../components/ui/Sidebar.vue";
</script>

<style scoped>
@import "../../styles/tokens/colors.css";

.panel {
  display: flex;
  min-height: 100vh;
  background-color: var(--light-color);
}

.panel__content {
  flex: 1;
  overflow-y: auto;
}
</style>
