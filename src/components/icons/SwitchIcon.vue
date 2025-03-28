<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 24 24"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class=""
  >
    <g>
      <path
        :fill="iconColor"
        fill-rule="evenodd"
        d="M7.854 3.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L4.707 8H20.5a.5.5 0 0 0 0-1H4.707l3.147-3.146a.5.5 0 0 0 0-.708zm8.292 9a.5.5 0 0 0 0 .708L19.293 16H3.5a.5.5 0 0 0 0 1h15.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708 0z"
        clip-rule="evenodd"
        opacity="1"
        data-original="#292d3d"
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
