<template>
  <section class="section section--faq" aria-labelledby="faq-heading">
    <div class="section-inner">
      <h2 id="faq-heading" class="section-title">Frequently Asked Questions</h2>

      <div class="faq-list">
        <details class="faq-item">
          <summary class="faq-question">Who can edit the dictionary?</summary>
          <p class="faq-answer">
            Only authenticated admins can create, edit, or publish dictionary
            entries via the admin control panel. If you'd like to suggest a
            correction or addition, please use the site's contact or feedback
            tools so the editorial team can review it.
          </p>
        </details>

        <details class="faq-item">
          <summary class="faq-question">
            How are translation choices decided?
          </summary>
          <p class="faq-answer">
            Decisions are made using source examples, community feedback, and
            editorial guidelines to preserve tone, register, and cultural
            meaning.
          </p>
        </details>

        <details class="faq-item">
          <summary class="faq-question">
            How can I get involved or report issues?
          </summary>
          <p class="faq-answer">
            Use the site's feedback or contact tools to reach the editorial
            team. Contributions and reports are evaluated and acknowledged
            during review.
          </p>
        </details>

        <details class="faq-item">
          <summary class="faq-question">How is contributed data used?</summary>
          <p class="faq-answer">
            Contributed examples and edits are used to improve dictionary
            entries and translations. Personal data is handled according to the
            site's privacy practices.
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Presentational
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
}

.faq-list {
  display: grid;
  gap: var(--spacing-md);
}

.faq-item {
  background: linear-gradient(
    180deg,
    var(--accent-2-color),
    var(--light-color)
  );
  border: 1px solid var(--border-color);
  padding: var(--component-padding);
  border-radius: var(--border-radius-md);
}

.faq-question {
  font-family: var(--font-body-bold);
  font-size: var(--fs-body-text);
  cursor: pointer;
  color: var(--text-secondary);
}

.faq-answer {
  margin-top: var(--spacing-sm);
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
}
</style>
