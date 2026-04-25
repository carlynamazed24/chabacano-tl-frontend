<template>
  <div
    class="loading-indicator"
    :class="[`loading-indicator--${variant}`, `loading-indicator--${tone}`]"
    role="status"
    aria-live="polite"
    :aria-label="label"
  >
    <div class="loading-indicator__spinner" aria-hidden="true"></div>
    <p class="loading-indicator__label">{{ label }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string;
    variant?: "section" | "inline" | "panel";
    tone?: "default" | "light";
  }>(),
  {
    label: "Loading",
    variant: "section",
    tone: "default",
  }
);
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  color: var(--text-primary);
  text-align: center;
}

.loading-indicator--section,
.loading-indicator--panel {
  width: 100%;
  min-height: 96px;
  padding: var(--spacing-lg);
}

.loading-indicator--panel {
  min-height: 64px;
}

.loading-indicator--inline {
  min-height: 40px;
  padding: var(--spacing-sm);
}

.loading-indicator--light {
  color: var(--light-color);
}

.loading-indicator--light.loading-indicator--section,
.loading-indicator--light.loading-indicator--panel {
  background: transparent;
}

.loading-indicator__spinner {
  position: relative;
  flex: 0 0 auto;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 3px solid rgba(13, 148, 136, 0.22);
  border-top-color: var(--primary-color);
  animation: loadingSpin 0.8s linear infinite;
}

.loading-indicator--light .loading-indicator__spinner {
  border-color: rgba(255, 255, 255, 0.28);
  border-top-color: var(--light-color);
}

.loading-indicator__label {
  margin: 0;
}

.loading-indicator__label {
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  font-weight: var(--fw-semibold);
  color: currentColor;
}

@keyframes loadingSpin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .loading-indicator {
    flex-direction: column;
    text-align: center;
  }

  .loading-indicator--section,
  .loading-indicator--panel {
    padding: var(--spacing-xl);
  }
}
</style>
