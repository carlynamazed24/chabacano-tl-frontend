<template>
  <footer class="footer">
    <div class="footer-nav">
      <div class="footer-logo">
        <router-link :to="{ name: 'home' }">
          <img
            src="../../assets/images/chabacano_logo_white.png"
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
              :to="{ name: 'about-us' }"
            >
              About Us
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

          <li class="nav-item">
            <router-link
              class="nav-link fs-body-text-semibold text-light"
              :to="{ name: 'translator' }"
            >
              Translator
            </router-link>
          </li>
        </ul>
      </nav>
    </div>

    <div class="footer-cr">
      <p class="fs-small-text text-light">
        &copy; 2025 Chabacano Translator. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped>
@import "../../styles/variables.css";

.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3em 0;
  background-color: var(--primary-color);
}

.footer > .footer-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin-bottom: 2em;
  border-bottom: 1px solid var(--light-color);
}

.footer > .footer-nav > .footer-logo > a > img {
  width: 80px;
}

.footer > .footer-nav > .nav-container > .nav-lists {
  display: flex;
  gap: 5em;
}

@media (max-width: 768px) {
  .footer > .footer-nav {
    flex-direction: column;
    margin-bottom: 1em;
    padding-bottom: 1em;
  }

  .footer > .footer-nav > .footer-logo {
    width: 100%;
  }

  .footer > .footer-nav > .nav-container {
    width: 100%;
  }

  .footer > .footer-nav > .nav-container > .nav-lists {
    flex-direction: column;
    gap: 1em;
  }
}

@media (max-width: 306px) {
  .footer > .footer-cr > p {
    text-align: center;
  }
}
</style>
