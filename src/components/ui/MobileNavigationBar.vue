<template>
  <div class="mobile-menu">
    <nav class="mobile-menu__nav" aria-label="Mobile navigation">
      <ul class="mobile-menu__list">
        <li
          v-for="(link, index) in navLinks"
          :key="`mobile-nav-${index}`"
          class="mobile-menu__item"
        >
          <router-link
            class="mobile-menu__link fs-heading-6 text-light"
            :to="{ name: link.route }"
            :class="{ 'mobile-menu__link--active': route.name === link.route }"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="mobile-menu__action fade-in" style="animation-delay: 0.4s">
      <Button
        class="btn-secondary"
        :btnText="'Translator'"
        :path="'translator'"
        size="lg"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useRoute,
  type RouteLocationNormalizedLoadedGeneric,
} from "vue-router";
import Button from "./Button.vue";

const route: RouteLocationNormalizedLoadedGeneric = useRoute();

// Navigation links - same as main navigation
const navLinks = [
  { text: "Home", route: "home" },
  { text: "Story", route: "story" },
  { text: "Dictionary", route: "dictionary" },
];
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.mobile-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  gap: var(--spacing-3xl);
  padding: var(--spacing-xl) var(--spacing-md);
}

.mobile-menu__nav {
  width: 100%;
}

.mobile-menu__list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xl);
  padding: 0;
  margin: 0;
  list-style: none;
}

.mobile-menu__item {
  width: 100%;
  text-align: center;
  animation: fadeInUp var(--transition-normal) var(--ease-out) forwards;
  opacity: 0;
}

.mobile-menu__link {
  position: relative;
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  font-family: var(--font-heading);
  text-decoration: none;
  transition: transform var(--transition-normal) var(--ease-out),
    color var(--transition-normal) var(--ease-out);
}

.mobile-menu__link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--light-color);
  transition: width var(--transition-normal) var(--ease-out);
}

.mobile-menu__link:hover {
  transform: translateY(-2px);
}

.mobile-menu__link:hover::after,
.mobile-menu__link--active::after {
  width: 100%;
}

.mobile-menu__action {
  margin-top: var(--spacing-lg);
}

/* Animation for closing the menu */
@keyframes slideOut {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-20px);
    opacity: 0;
  }
}

.mobile-menu--closing .mobile-menu__item {
  animation: slideOut var(--transition-normal) var(--ease-in) forwards;
}

@media (max-width: 480px) {
  .mobile-menu {
    gap: var(--spacing-xl);
    padding: var(--spacing-lg) var(--spacing-sm);
  }

  .mobile-menu__list {
    gap: var(--spacing-lg);
  }
}
</style>
