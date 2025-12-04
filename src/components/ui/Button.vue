<template>
  <button
    class="btn"
    :class="[buttonType, buttonSize, { 'btn--loading': loadingState }]"
    @click="routeTo(path)"
    :disabled="loadingState"
  >
    <span v-if="loadingState" class="loading-animation"></span>
    <template v-else>
      <span v-if="buttonText" class="btn-text">{{ buttonText }}</span>
      <span class="slot" v-else>
        <slot></slot>
      </span>
    </template>
    <span class="btn-highlight"></span>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, type Router } from "vue-router";
import { type ButtonProps } from "../../composables/interfaces/Props";

const props = defineProps<ButtonProps>();

const router: Router = useRouter();

const buttonType = ref(props.btnType || "btn-primary");
const buttonText = ref(props.btnText);
const buttonSize = ref(props.size);
const loadingState = ref(props.loadingState);
const path = ref(props.path);

watch(
  () => props.loadingState,
  (newVal) => {
    loadingState.value = newVal;
  }
);

const routeTo = (path: string | undefined) => {
  router.push({ name: path });
};
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  font-weight: var(--fw-semibold);
  overflow: hidden;
  transition: background-color var(--transition-normal) var(--ease-out),
    color var(--transition-normal) var(--ease-out),
    transform var(--transition-fast) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
}

.btn.sm {
  padding: var(--spacing-sm) var(--spacing-md);
}

.btn.md {
  padding: var(--spacing-md) calc(var(--spacing-lg) * 1.25);
}

.btn.lg {
  padding: var(--spacing-lg) var(--spacing-xl);
}

/* Button Content */
.btn > .slot {
  display: block;
  position: relative;
  z-index: 2;
}

.btn > .btn-text {
  position: relative;
  z-index: 2;
  color: var(--light-color);
  text-align: center;
}

/* Modern highlight effect */
.btn-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: scale(0);
  opacity: 0;
  z-index: 1;
  transition: transform var(--transition-fast) var(--ease-out),
    opacity var(--transition-fast) var(--ease-out);
}

.btn:hover .btn-highlight {
  transform: scale(2);
  opacity: 1;
}

.btn:active {
  transform: scale(0.98);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.6;
  background-color: var(--accent-3-color) !important;
  border-color: transparent !important;
}

.btn:disabled > .btn-text,
.btn:disabled:hover > .btn-text {
  color: var(--white-color) !important;
}

/* Button Types */
.btn.btn-primary {
  border: 1px solid var(--light-color);
  background-color: transparent;
}

.btn.btn-primary:hover {
  background-color: var(--light-color);
}

.btn.btn-primary:hover > .btn-text {
  color: var(--dark-color);
}

.btn.btn-outline {
  border: 1px solid var(--primary-color);
  background-color: transparent;
}

.btn.btn-outline > .btn-text {
  color: var(--primary-color);
}

.btn.btn-outline:hover {
  background-color: var(--primary-color);
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.25);
}

.btn.btn-outline:hover > .btn-text {
  color: var(--light-color);
}

.btn.btn-secondary {
  border: 1px solid transparent;
  background-color: var(--primary-color);
  box-shadow: 0 2px 6px rgba(13, 148, 136, 0.15);
}

.btn.btn-secondary > .btn-text {
  color: var(--light-color);
}

.btn.btn-secondary:hover {
  border-color: var(--primary-color);
  background-color: transparent;
  box-shadow: 0 4px 12px rgba(13, 148, 136, 0.2);
}

.btn.btn-secondary:hover > .btn-text {
  color: var(--primary-color);
}

/* Loading Animation */
.btn.btn--loading {
  cursor: wait;
}

.loading-animation {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid currentColor;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 0.8s linear infinite;
}

/* Focus state - accessibility */
.btn:focus-visible {
  outline: 2px solid var(--focus-ring-color);
  outline-offset: 2px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Backward compatibility for older styles */
@media (max-width: 768px) {
  .btn.md {
    padding: var(--spacing-sm) var(--spacing-lg);
  }

  .btn.lg {
    padding: var(--spacing-md) var(--spacing-xl);
  }
}
</style>
