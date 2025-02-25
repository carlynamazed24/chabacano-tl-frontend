<template>
  <section class="hero section-bg">
    <div class="hero-title">
      <h1 class="fs-heading-1 text-light">Chabacano Translator</h1>
    </div>
    <div class="hero-tagline">
      <p class="fs-body-text text-light">
        Si quiere, mucho que di podé hacé. Si no quiere, mucho razon que di
        dale.
      </p>
    </div>

    <div class="hero-action">
      <Button
        class="btn-primary"
        :btnText="'Translate Now'"
        :path="'translator'"
        size="lg"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from "../../components/Button.vue";
</script>

<style scoped>
@import "../../styles/variables.css";

.hero > .hero-title,
.hero > .hero-tagline,
.hero > .hero-action {
  z-index: 2;
}

.hero > .hero-tagline {
  width: 20%;
  text-align: center;
  margin-block: 2em;
}

@media (max-width: 925px) {
  .hero > .hero-title {
    text-align: center;
  }

  .hero > .hero-tagline {
    width: 50%;
  }
}
</style>
