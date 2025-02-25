<template>
  <nav class="nav">
    <ul class="nav-lists">
      <li v-for="navList in navLists" class="nav-item">
        <router-link
          :to="{ name: navList.path }"
          class="fs-body-text"
          :class="{ active: $route.name === navList.path }"
        >
          {{ navList.name }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface NavList {
  name: string;
  path: string;
}

interface Props {
  navLists: NavList[];
}

const props = defineProps<Props>();

const navLists = ref(props.navLists);
</script>

<style scoped>
@import "../styles/variables.css";

.nav > .nav-lists {
  display: flex;
  gap: 2em;
}

.nav > .nav-lists > .nav-item > a {
  color: var(--accent-3-color);
  border-bottom: 1px solid transparent;
  transition: all 0.3s ease;
  padding: 0.5em 0;
}

.nav > .nav-lists > .nav-item > a:hover {
  border-color: var(--primary-color);
}

.nav > .nav-lists > .nav-item > a.active {
  color: black;
  border-bottom: 1px solid var(--primary-color);
}
</style>
