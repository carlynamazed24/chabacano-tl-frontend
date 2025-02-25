<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 64 64"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class=""
  >
    <g>
      <path
        d="M50.864 4H20a1 1 0 0 0 0 2h30.864a2.003 2.003 0 0 1 2 2v41a1 1 0 0 0 2 0V8a4.004 4.004 0 0 0-4-4z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
      <path
        d="M44.078 10.786H13.136a4.004 4.004 0 0 0-4 4V56a4.004 4.004 0 0 0 4 4h30.942a4.004 4.004 0 0 0 4-4V14.786a4.004 4.004 0 0 0-4-4zm2 45.214a2.003 2.003 0 0 1-2 2H13.136a2.003 2.003 0 0 1-2-2V14.786a2.003 2.003 0 0 1 2-2h30.942a2.003 2.003 0 0 1 2 2z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
    </g>
  </svg>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { type IconProps } from "../../composables/interfaces/Props";

const props = defineProps<IconProps>();

const iconSize = ref<number>(props.size);
const iconColor = ref<string>(props.color);
</script>
