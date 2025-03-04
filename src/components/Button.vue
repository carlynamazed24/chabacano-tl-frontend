<template>
  <button
    class="btn"
    :class="[buttonType, buttonSize]"
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
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter, type Router } from "vue-router";
import { type ButtonProps } from "../composables/interfaces/Props";

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
@import "../styles/variables.css";

.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.sm {
  padding: 0.5em 1em;
}

.btn.md {
  padding: 0.75em 2em;
}

.btn.lg {
  padding: 1em 2.5em;
}

.btn > .slot {
  display: block;
}

.btn:disabled {
  cursor: not-allowed;
}

.btn > .btn-text {
  color: var(--light-color);
  text-align: center;
}

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
}

.btn.btn-outline:hover > .btn-text {
  color: var(--light-color);
}

.btn.btn-secondary {
  border: 1px solid transparent;
  background-color: var(--primary-color);
}

.btn.btn-secondary > .btn-text {
  color: var(--light-color);
}

.btn.btn-secondary:hover {
  border-color: var(--primary-color);
  background-color: transparent;
}

.btn.btn-secondary:hover > .btn-text {
  color: var(--primary-color);
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
