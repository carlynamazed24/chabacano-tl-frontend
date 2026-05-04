<template>
  <section class="section section--features" aria-labelledby="features-heading">
    <div class="section-inner">
      <h2 id="features-heading" class="section-title">Features</h2>

      <div class="features-grid">
        <article class="feature-item">
          <h3 class="feature-title">Instant Text Translation</h3>
          <p class="feature-body">
            Translate between Chabacano, Tagalog, and English with immediate
            results. The translator supports switching source/target languages
            and shows live translated text.
          </p>
        </article>

        <article class="feature-item">
          <h3 class="feature-title">Speech Input &amp; Playback</h3>
          <p class="feature-body">
            Record speech with the built-in microphone or play back source and
            translated text using text‑to‑speech. Handy controls for recording,
            speaking, and copying text are provided.
          </p>
        </article>

        <article class="feature-item">
          <h3 class="feature-title">Searchable Multilingual Dictionary</h3>
          <p class="feature-body">
            Browse and search dictionary entries by alphabet or keyword. Each
            entry shows Chabacano, Tagalog, and English variants with
            definitions to help verification and learning.
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Pure presentational component
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.section {
  padding: var(--section-spacing) var(--container-padding);
  background-color: var(--surface-primary);
  color: var(--text-primary);
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--fs-heading-3);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  line-height: var(--line-height-tight);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--grid-gap);
}

.feature-item {
  background: linear-gradient(
    180deg,
    var(--surface-secondary) 0%,
    var(--accent-2-color) 100%
  );
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  padding: var(--component-padding);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  transition: transform var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
}

.feature-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.06);
}

.feature-title {
  font-family: var(--font-body-bold);
  font-size: var(--fs-heading-5);
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-secondary);
}

.feature-body {
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
  margin: 0;
}

@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
