<template>
  <section class="section section--how" aria-labelledby="how-heading">
    <div class="section-inner">
      <h2 id="how-heading" class="section-title">How it Works</h2>

      <ol class="process-list">
        <li class="process-step">
          <h3 class="step-title">Translate or Record</h3>
          <p class="step-body">
            Enter text or record speech in the translator, choose source and
            target languages, and get an immediate translation. Use the playback
            controls to hear source or translated text and copy results to your
            clipboard.
          </p>
        </li>

        <li class="process-step">
          <h3 class="step-title">Verify with Dictionary & Stories</h3>
          <p class="step-body">
            Use the searchable dictionary (alphabetical and keyword search) and
            example stories to check usage, register, and context for words and
            phrases before relying on a translation.
          </p>
        </li>

        <li class="process-step">
          <h3 class="step-title">Suggest Corrections</h3>
          <p class="step-body">
            If something looks off, submit a suggestion via the site's contact
            or feedback tools. Suggestions are reviewed by the editorial team so
            errors can be corrected without exposing unpublished edits directly
            on the site.
          </p>
        </li>

        <li class="process-step">
          <h3 class="step-title">Admin Review & Publish</h3>
          <p class="step-body">
            Authenticated admins use the control panel to review, edit, and
            publish dictionary entries and page content. This ensures editorial
            oversight and prevents unauthorized edits.
          </p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
// Presentational only
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.section {
  padding: var(--section-spacing) var(--container-padding);
  background-color: var(--accent-2-color);
  color: var(--text-primary);
}

.section-title {
  font-family: var(--font-heading);
  font-size: var(--fs-heading-3);
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
}

.process-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: var(--spacing-md);
}

.process-step {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.35)
  );
  border-radius: var(--border-radius-md);
  padding: var(--component-padding);
  border: 1px solid var(--border-color);
}

.step-title {
  font-family: var(--font-body-bold);
  font-size: var(--fs-heading-5);
  margin: 0 0 var(--spacing-sm) 0;
  color: var(--text-secondary);
}

.step-body {
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  line-height: var(--line-height-normal);
  margin: 0;
}

@media (min-width: 900px) {
  .process-list {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
