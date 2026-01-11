<template>
  <div class="content-editor fade-in">
    <header class="content-editor__header">
      <div class="content-editor__welcome">
        <h1 class="content-editor__title fs-heading-4">Welcome, Admin</h1>
        <p class="content-editor__subtitle fs-body-text">
          Manage your content pages
        </p>
      </div>
      <MiniNavBar :navLists="NavLists" />
    </header>
    <div class="content-editor__body">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import MiniNavBar from "../../components/ui/MiniNavBar.vue";
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
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.content-editor {
  min-height: 100vh;
  padding: var(--spacing-xl);
  background-color: var(--light-color);
}

.content-editor__header {
  margin-bottom: var(--spacing-xl);
}

.content-editor__welcome {
  background: var(--white-color);
  padding: var(--spacing-xl) var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.content-editor__title {
  color: var(--dark-color);
  margin-bottom: var(--spacing-xs);
}

.content-editor__subtitle {
  color: var(--primary-color);
  opacity: 0.8;
}

.content-editor__body {
  background: var(--white-color);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  min-height: 500px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
</style>
