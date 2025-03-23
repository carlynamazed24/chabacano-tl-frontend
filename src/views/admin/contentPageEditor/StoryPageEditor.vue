<template>
  <div class="nav-container">
    <MiniNavBar :navLists="NavLists" />
  </div>
  <div class="home-page-editor">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import MiniNavBar from "../../../components/ui/MiniNavBar.vue";
import { type NavListsProps } from "../../../composables/interfaces/Props";

const NavLists: NavListsProps[] = [
  {
    name: "Add New Section",
    path: "new-story",
  },
  {
    name: "Section Lists",
    path: "section-lists",
  },
];
</script>

<style scoped>
@import "../../../styles/variables.css";

.nav-container {
  padding: 2em;
  background-color: white;
  border-radius: 0.5rem;
  margin-bottom: 1em;
}

.home-page-editor {
  display: flex;
  flex-direction: column;
  gap: 2em;
  padding: 2em;
  background-color: white;
  border-radius: 0.5em;
}
</style>
