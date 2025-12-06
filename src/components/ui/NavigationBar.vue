<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header-logo fade-in">
      <router-link :to="{ name: 'home' }" aria-label="Go to home page">
        <img
          src="../../assets/images/chabacano_logo_white.png"
          alt="Chabacano Translator Logo"
          class="header-logo__image"
        />
      </router-link>
    </div>
    <nav class="nav-container" aria-label="Main navigation">
      <ul class="nav-lists">
        <li
          class="nav-item"
          v-for="(link, index) in navLinks"
          :key="`nav-link-${index}`"
        >
          <router-link
            class="nav-link fs-body-text-semibold text-light"
            :to="{ name: link.route }"
            :class="{ 'nav-link--active': route.name === link.route }"
          >
            {{ link.text }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="action-btn-nav slide-in-right">
      <Button
        class="btn-primary"
        :btnText="'Translator'"
        :path="'translator'"
        size="md"
      />
    </div>
    <div class="nav-hamburger">
      <Button
        @click="isMobileNavOpen = !isMobileNavOpen"
        size="sm"
        :aria-expanded="isMobileNavOpen"
        aria-controls="mobile-menu"
        aria-label="Toggle navigation menu"
      >
        <HamburgerIcon :size="20" color="#ffffff" />
      </Button>
    </div>

    <div v-if="isMobileNavOpen" id="mobile-menu" class="mobile-nav">
      <MobileNavBar />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import {
  useRoute,
  type RouteLocationNormalizedLoadedGeneric,
} from "vue-router";
import Button from "./Button.vue";
import MobileNavBar from "./MobileNavigationBar.vue";
import HamburgerIcon from "../icons/HamburgerIcon.vue";

const isMobileNavOpen = ref<boolean>(false);
const isScrolled = ref<boolean>(false);
const route: RouteLocationNormalizedLoadedGeneric = useRoute();

// Navigation links
const navLinks = [
  { text: "Home", route: "home" },
  { text: "Story", route: "story" },
  { text: "History", route: "history" },
  { text: "Dictionary", route: "dictionary" },
];

// Close mobile nav when route changes
watch(route, () => {
  isMobileNavOpen.value = false;
  document.body.style.overflow = "";
});

// Toggle body scroll when mobile nav is open
watch(isMobileNavOpen, (newValue) => {
  document.body.style.overflow = newValue ? "hidden" : "";
});

// Add scroll effect to navbar
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

function handleScroll() {
  isScrolled.value = window.scrollY > 30;
}
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";
@import "../../styles/tokens/breakpoints.css";

.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-md);
  padding: var(--spacing-sm) var(--spacing-2xl);
  background-color: var(--primary-color);
  color: var(--light-color);
  z-index: 1000;
  transition: padding var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out),
    background-color var(--transition-normal) var(--ease-out);
}

/* Scrolled header state */
.header--scrolled {
  padding: var(--spacing-xs) var(--spacing-2xl);
  background-color: rgba(13, 148, 136, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

/* Logo styling */
.header-logo {
  transition: transform var(--transition-normal) var(--ease-out);
}

.header-logo__image {
  width: 110px;
  transition: width var(--transition-normal) var(--ease-out);
}

.header--scrolled .header-logo__image {
  width: 150px;
}

/* Navigation container */
.nav-container {
  width: 100%;
}

.nav-lists {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xl);
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.nav-item {
  position: relative;
  padding: var(--spacing-sm) 0;
}

.nav-link {
  position: relative;
  padding: var(--spacing-xs) var(--spacing-sm);
  text-decoration: none;
  transition: color var(--transition-normal) var(--ease-out);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--light-color);
  transition: width var(--transition-normal) var(--ease-out);
}

.nav-link:hover::after,
.nav-link--active::after {
  width: 100%;
}

.action-btn-nav {
  margin-left: var(--spacing-md);
}

/* Mobile navigation */
.nav-hamburger {
  display: none;
  transition: transform var(--transition-normal) var(--ease-out);
}

.nav-hamburger:hover {
  transform: scale(1.05);
}

.mobile-nav {
  display: none;
  animation: fadeIn var(--transition-normal) var(--ease-out);
}

/* Responsive styling */
@media (max-width: 1024px) {
  .header {
    padding: var(--spacing-md) var(--spacing-lg);
  }

  .header--scrolled {
    padding: var(--spacing-sm) var(--spacing-lg);
  }

  .header-logo__image {
    width: 80px;
  }

  .header--scrolled .header-logo__image {
    width: 70px;
  }

  .nav-lists {
    gap: var(--spacing-lg);
  }
}

@media (max-width: 768px) {
  .header {
    padding: var(--spacing-md) var(--spacing-md);
  }

  .nav-container,
  .action-btn-nav {
    display: none;
  }

  .nav-hamburger {
    display: block;
  }

  .mobile-nav {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100vh;
    padding-top: 80px;
    background-color: rgba(13, 148, 136, 0.98);
    backdrop-filter: blur(8px);
    z-index: 999;
  }
}

@media (max-width: 480px) {
  .header {
    padding: var(--spacing-sm) var(--spacing-md);
  }

  .header-logo__image {
    width: 50px;
  }

  .header--scrolled .header-logo__image {
    width: 40px;
  }
}
</style>
