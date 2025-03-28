<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 128 128"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class=""
  >
    <g>
      <path
        d="M95.331 27.471H81.083v-4.516a5.712 5.712 0 0 0-5.7-5.7H52.621a5.712 5.712 0 0 0-5.705 5.7v4.516H32.668a5.425 5.425 0 0 0-5.419 5.419v5.857a5.426 5.426 0 0 0 5.419 5.419h.071v59.041a7.551 7.551 0 0 0 7.542 7.543h47.437a7.551 7.551 0 0 0 7.542-7.543V44.166h.071a5.425 5.425 0 0 0 5.418-5.419V32.89a5.424 5.424 0 0 0-5.418-5.419zm-44.915-4.516a2.207 2.207 0 0 1 2.205-2.2h22.757a2.207 2.207 0 0 1 2.2 2.2v4.516H50.416zm41.344 80.252a4.047 4.047 0 0 1-4.042 4.043H40.281a4.047 4.047 0 0 1-4.042-4.043V44.166H91.76zm5.489-64.46a1.92 1.92 0 0 1-1.918 1.919H32.668a1.921 1.921 0 0 1-1.919-1.919V32.89a1.921 1.921 0 0 1 1.919-1.919h62.663a1.92 1.92 0 0 1 1.918 1.919z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
      <path
        d="M64 95.541a1.749 1.749 0 0 0 1.75-1.75V57.625a1.75 1.75 0 1 0-3.5 0v36.166a1.75 1.75 0 0 0 1.75 1.75zM79.333 95.541a1.75 1.75 0 0 0 1.75-1.75V57.625a1.75 1.75 0 0 0-3.5 0v36.166a1.75 1.75 0 0 0 1.75 1.75zM48.666 95.541a1.75 1.75 0 0 0 1.75-1.75V57.625a1.75 1.75 0 0 0-3.5 0v36.166a1.75 1.75 0 0 0 1.75 1.75z"
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
