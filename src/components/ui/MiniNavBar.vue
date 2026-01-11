<template>
  <nav class="mini-nav">
    <ul class="mini-nav__list">
      <li
        v-for="navList in navLists"
        :key="navList.path"
        class="mini-nav__item"
      >
        <router-link
          :to="{ name: navList.path }"
          class="mini-nav__link fs-body-text"
          :class="{ 'mini-nav__link--active': $route.name === navList.path }"
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
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.mini-nav {
  background: var(--white-color);
  padding: var(--spacing-md) var(--spacing-xl);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}

.mini-nav__list {
  display: flex;
  gap: var(--spacing-xl);
  list-style: none;
  padding: 0;
  margin: 0;
}

.mini-nav__item {
  position: relative;
}

.mini-nav__link {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--primary-color);
  text-decoration: none;
  font-weight: var(--fw-medium);
  border-radius: var(--border-radius-sm);
  transition: color var(--transition-normal) var(--ease-out),
    background-color var(--transition-normal) var(--ease-out);
}

.mini-nav__link::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width var(--transition-normal) var(--ease-out),
    left var(--transition-normal) var(--ease-out);
}

.mini-nav__link:hover {
  color: var(--dark-color);
  background-color: var(--light-color);
}

.mini-nav__link:hover::after {
  width: 80%;
  left: 10%;
}

.mini-nav__link--active {
  color: var(--dark-color);
  background-color: var(--light-color);
}

.mini-nav__link--active::after {
  width: 80%;
  left: 10%;
  background-color: var(--secondary-color);
}
</style>
