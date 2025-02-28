<template>
  <header class="header">
    <div class="header-logo">
      <router-link :to="{ name: 'home' }">
        <img
          src="../assets/images/chabacano_logo.png"
          alt="Chabacano Translator Logo"
        />
      </router-link>
    </div>
    <nav class="nav-container">
      <ul class="nav-lists">
        <li class="nav-item">
          <router-link
            class="nav-link fs-body-text-semibold text-light"
            :to="{ name: 'home' }"
          >
            Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link fs-body-text-semibold text-light"
            :to="{ name: 'story' }"
          >
            Story
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link fs-body-text-semibold text-light"
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
    <div class="nav-hamburger">
      <ButtonIcon @click="isMobileNavOpen = !isMobileNavOpen" />
    </div>

    <div v-if="isMobileNavOpen" class="mobile-nav">
      <MobileNavBar />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  useRoute,
  type RouteLocationNormalizedLoadedGeneric,
} from "vue-router";
import Button from "./Button.vue";
import ButtonIcon from "./ButtonIcon.vue";
import MobileNavBar from "./MobileNavigationBar.vue";

const isMobileNavOpen = ref<boolean>(false);
const route: RouteLocationNormalizedLoadedGeneric = useRoute();

watch(route, () => {
  isMobileNavOpen.value = false;
  document.body.style.overflow = "";
});

watch(isMobileNavOpen, (newValue) => {
  document.body.style.overflow = newValue ? "hidden" : "";
});
</script>

<style scoped>
@import "../styles/variables.css";

.header {
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1em;
  padding: 2em 3em;
  background-color: var(--primary-color);
  color: var(--light-color);
  z-index: 1000;
}

@media (max-width: 521px) {
  .header {
    padding-inline: 1em;
  }
}

.header > .header-logo > a > img {
  width: 300px;
}

@media (max-width: 427px) {
  .header > .header-logo > a > img {
    width: 250px;
    max-width: 200px;
  }
}

.nav-container {
  width: 100%;
}

.nav-container > .nav-lists {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.5em;
}

.nav-container > .nav-lists > .nav-item {
  padding-block: 1em;
  border-bottom: 2px solid transparent;
  transition: border 0.3s ease;
}

.nav-container > .nav-lists > .nav-item > .nav-link {
  margin-block: 1em;
}

.nav-container > .nav-lists > .nav-item:hover {
  border-bottom: 2px solid var(--light-color);
}

.header > .nav-hamburger {
  display: none;
}

.header > .mobile-nav {
  display: none;
}

@media (max-width: 682px) {
  .header > .nav-container,
  .header > .action-btn-nav {
    display: none;
  }
}

@media (max-width: 682px) {
  .header > .nav-hamburger {
    display: block;
  }

  .header > .mobile-nav {
    display: block;
    position: fixed;
    top: 124px;
    left: 0;
    right: 0;
    bottom: 0;
    height: calc(100vh - 125px);
    background-color: var(--primary-color);
    z-index: 999;
  }
}

@media (max-width: 427px) {
  .header > .mobile-nav {
    top: 110px;
    height: calc(100vh - 110px);
  }
}
</style>
