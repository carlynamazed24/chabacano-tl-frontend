<template>
  <div class="dictionary-admin fade-in">
    <header class="dictionary-admin__header">
      <div class="dictionary-admin__welcome">
        <h1 class="dictionary-admin__title fs-heading-4">Dictionary Manager</h1>
        <p class="dictionary-admin__subtitle fs-body-text">
          Add and manage dictionary entries
        </p>
      </div>
      <MiniNavBar :navLists="NavLists" />
    </header>
    <div class="dictionary-admin__body">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import MiniNavBar from "../../components/ui/MiniNavBar.vue";
import { type NavListsProps } from "../../composables/interfaces/Props";

const NavLists: NavListsProps[] = [
  {
    name: "Manage Dictionary",
    path: "add-dic-entry",
  },
  {
    name: "Dictionary Entries",
    path: "dic-entry-list",
  },
];
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.dictionary-admin {
  min-height: 100vh;
  padding: var(--spacing-xl);
  background-color: var(--light-color);
}

.dictionary-admin__header {
  margin-bottom: var(--spacing-xl);
}

.dictionary-admin__welcome {
  background: var(--white-color);
  padding: var(--spacing-xl) var(--spacing-2xl);
  border-radius: var(--border-radius-lg);
  margin-bottom: var(--spacing-lg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.dictionary-admin__title {
  color: var(--dark-color);
  margin-bottom: var(--spacing-xs);
}

.dictionary-admin__subtitle {
  color: var(--primary-color);
  opacity: 0.8;
}

.dictionary-admin__body {
  background: var(--white-color);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-xl);
  min-height: 500px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
</style>
