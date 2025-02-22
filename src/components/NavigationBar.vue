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
            :to="{ name: 'home' }"
          >
            About Us
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link fs-body-text-semibold text-light"
            :to="{ name: 'home' }"
          >
            Story
          </router-link>
        </li>
        <li class="nav-item">
          <router-link
            class="nav-link fs-body-text-semibold text-light"
            :to="{ name: 'home' }"
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
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import Button from "./Button.vue";
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

.header > .header-logo > a > img {
  width: 300px;
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
</style>
