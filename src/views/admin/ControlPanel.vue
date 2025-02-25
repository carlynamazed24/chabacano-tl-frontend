<template>
  <div class="panel">
    <Sidebar />
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../../components/Sidebar.vue";
</script>

<style scoped>
.panel {
  display: flex;
}

.content {
  flex: 1;
}
</style>
