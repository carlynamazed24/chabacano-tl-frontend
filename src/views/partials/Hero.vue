<template>
  <section class="hero">
    <div class="hero__background">
      <div class="hero__overlay"></div>
    </div>

    <div class="hero__content">
      <LoadingIndicator
        v-if="loading"
        label="Loading"
        variant="panel"
        tone="light"
      />

      <template v-else>
        <div class="hero__title fade-in">
          <h1 class="fs-heading-1 text-light">{{ title }}</h1>
        </div>
        <div class="hero__tagline slide-up">
          <p class="fs-body-text text-light">{{ tagline }}</p>
        </div>

        <div class="hero__action scale-in">
          <Button
            class="btn-primary hero__button"
            :btnText="'Translate Now'"
            :path="'translator'"
            size="lg"
          />
        </div>
      </template>
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from "../../components/ui/Button.vue";
import LoadingIndicator from "../../components/ui/LoadingIndicator.vue";

withDefaults(
  defineProps<{
    title?: string;
    tagline?: string;
    loading?: boolean;
  }>(),
  {
    title: "",
    tagline: "",
    loading: false,
  }
);
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";
@import "../../styles/tokens/breakpoints.css";

.hero {
  position: relative;
  height: 100vh;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: var(--light-color);
  isolation: isolate;
}

.hero__background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("../../assets/images/chabacano_translator_hero_bg.png") center
    center/cover no-repeat;
  z-index: 0;
}

.hero__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--gradient-hero);
  z-index: 1;
}

.hero__content {
  position: relative;
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--spacing-2xl) var(--spacing-xl);
  z-index: 2;
}

.hero__title {
  margin-bottom: var(--spacing-xl);
}

.hero__title h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: var(--fw-bold);
  line-height: var(--line-height-tight);
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.hero__tagline {
  width: 70%;
  max-width: 800px;
  margin-bottom: var(--spacing-2xl);
}

.hero__tagline p {
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: var(--fw-light);
  line-height: var(--line-height-normal);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero__action {
  animation-delay: 0.5s;
}

.hero__button {
  transform-origin: center;
  transition: all var(--transition-normal) var(--ease-out);
}

.hero__button:hover {
  transform: scale(1.05) translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

/* Responsive styling */
@media (max-width: 768px) {
  .hero {
    min-height: 600px;
  }

  .hero__title {
    margin-bottom: var(--spacing-lg);
  }

  .hero__tagline {
    width: 85%;
    margin-bottom: var(--spacing-xl);
  }
}

@media screen and (max-width: 480px) {
  .hero {
    min-height: 500px;
  }

  .hero__content {
    padding: var(--spacing-xl) var(--spacing-md);
  }

  .hero__tagline {
    width: 100%;
  }
}
</style>
