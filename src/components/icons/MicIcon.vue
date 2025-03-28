<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 100 100"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class=""
  >
    <g>
      <path
        d="M49.99 65.34c8.11 0 14.72-6.6 14.72-14.72V27.54c0-8.11-6.6-14.72-14.72-14.72s-14.72 6.6-14.72 14.72v23.08c0 8.12 6.6 14.72 14.72 14.72zm-11.72-37.8c0-6.46 5.26-11.72 11.72-11.72S61.7 21.08 61.7 27.54v23.08c0 6.46-5.26 11.72-11.72 11.72s-11.72-5.26-11.72-11.72V27.54z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
      <path
        d="M71.6 50.8c-.83 0-1.5.67-1.5 1.5 0 11.09-9.02 20.11-20.11 20.11S29.88 63.39 29.88 52.3c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5c0 12.24 9.56 22.28 21.61 23.05v8.39H37.94c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5h24.09c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5H51.49v-8.39C63.53 74.58 73.1 64.54 73.1 52.3c0-.82-.68-1.5-1.5-1.5z"
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
const iconColor = ref<string | undefined>(props.color);
</script>
