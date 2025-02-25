<template>
  <div class="content-editor">
    <header class="header">
      <div class="heading">
        <h1 class="fs-heading-4">Welcome, Admin</h1>
      </div>
      <MiniNavBar :navLists="NavLists" />
    </header>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import MiniNavBar from "../../components/MiniNavBar.vue";
import { type NavListsProps } from "../../composables/interfaces/Props";

const NavLists: NavListsProps[] = [
  {
    name: "Home Page",
    path: "home-page-editor",
  },
  {
    name: "Story Page",
    path: "story-page-editor",
  },
];
</script>

<style scoped>
@import "../../styles/variables.css";

.content-editor {
  background-color: var(--white-color);
  height: 100%;
  padding: 2em;
}

.content-editor > .header > .heading,
.content-editor > .header > .nav {
  padding: 2em 2em;
  background-color: white;
  border-radius: 0.5rem;
}

.content-editor > .header > .nav {
  margin-top: 1em;
}

.content-editor > .content {
  margin-top: 2em;
  height: 420px;
  overflow-y: auto;
}
</style>
