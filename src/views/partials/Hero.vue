<template>
  <section class="hero section-bg">
    <div class="hero-title">
      <h1 class="fs-heading-1 text-light">{{ title }}</h1>
    </div>
    <div class="hero-tagline">
      <p class="fs-body-text text-light">
        {{ tagline }}
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
import { toRefs, watch } from "vue";
import Button from "../../components/ui/Button.vue";

const props = defineProps({
  title: String,
  tagline: String,
});

let { title, tagline } = toRefs(props);

watch([title, tagline], ([newTitle, newTagline]) => {
  title = newTitle;
  tagline = newTagline;
});
</script>

<style scoped>
@import "../../styles/variables.css";

.hero > .hero-title,
.hero > .hero-tagline,
.hero > .hero-action {
  z-index: 2;
}

.hero > .hero-title > h1 {
  font-size: 7rem;
}

.hero > .hero-tagline {
  width: 60%;
  text-align: center;
  margin-block: 2em;
}

.hero > .hero-tagline > p {
  font-size: 3rem;
}

@media (max-width: 925px) {
  .hero > .hero-title {
    text-align: center;
  }

  .hero > .hero-tagline {
    width: 50%;
  }
}

@media (max-width: 768px) {
  .hero > .hero-title > h1 {
    font-size: 4rem;
  }

  .hero > .hero-tagline {
    width: 75%;
  }

  .hero > .hero-tagline > p {
    font-size: 2rem;
  }
}

@media screen and (max-width: 480px) {
  .hero > .hero-title > h1 {
    font-size: 3rem;
  }

  .hero > .hero-tagline > p {
    font-size: 1.5rem;
  }
  .hero > .hero-tagline {
    width: 90%;
  }
}
</style>
