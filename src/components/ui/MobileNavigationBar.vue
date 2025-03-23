<template>
  <div class="container">
    <nav class="nav-container">
      <ul class="nav-lists">
        <li class="nav-item">
          <router-link
            class="nav-link fs-heading-6 text-semibold text-light"
            :to="{ name: 'home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link fs-heading-6 text-semibold text-light"
            :to="{ name: 'story' }"
          >
            Story
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link fs-heading-6 text-semibold text-light"
            :to="{ name: 'dictionary' }"
          >
            Dictionary
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="action-btn-nav">
      <Button
        class="btn-primary"
        :btnText="'Translator'"
        :path="'translator'"
        size="lg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
</script>

<style scoped>
@import "../../styles/variables.css";

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 5em;
}

.container > .nav-container > .nav-lists {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4em;
}

.container > .nav-container > .nav-lists > .nav-item {
  border-bottom: 1px solid transparent;
  padding-bottom: 1em;
  transition: border 0.3s ease;
}

.container > .nav-container > .nav-lists > .nav-item:hover {
  border-bottom-color: var(--light-color);
}
</style>
