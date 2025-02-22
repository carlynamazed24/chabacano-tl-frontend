<template>
  <button class="btn" :class="buttonType" @click="routeTo(path)">
    <span class="btn-text fs-body-text">{{ buttonText }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter, type Router } from "vue-router";

interface Props {
  btnType?: string;
  btnText: string;
  path?: string;
}

const ButtonProps = defineProps<Props>();

const router: Router = useRouter();

const buttonType = ref(ButtonProps.btnType);
const buttonText = ref(ButtonProps.btnText);
const path = ref(ButtonProps.path);

const routeTo = (path: string | undefined) => {
  router.push({ name: path });
};
</script>

<style scoped>
@import "../styles/variables.css";

.btn {
  padding: 1em 2.5em;
  border: 1px solid var(--light-color);
  background-color: transparent;
  border-radius: 0.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: var(--light-color);
}

.btn:hover > .btn-text {
  color: var(--dark-color);
}

.btn > .btn-text {
  color: var(--light-color);
}
</style>
