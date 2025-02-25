<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    :width="iconSize"
    :height="iconSize"
    x="0"
    y="0"
    viewBox="0 0 1000 1000"
    style="enable-background: new 0 0 512 512"
    xml:space="preserve"
    class=""
  >
    <g>
      <path
        d="M619.53 639.36a10 10 0 0 1-7.07-17.07 172.93 172.93 0 0 0 0-244.58 10 10 0 0 1 14.15-14.14 192.94 192.94 0 0 1 0 272.86 10 10 0 0 1-7.08 2.93z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
      <path
        d="M701.94 721.77a10 10 0 0 1-7.07-17.07c112.87-112.87 112.87-296.53 0-409.4A10 10 0 0 1 709 281.16a309.48 309.48 0 0 1 0 437.68 10 10 0 0 1-7.06 2.93z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
      <path
        d="M780 799.79a10 10 0 0 1-7.07-17.07c155.89-155.89 155.89-409.55 0-565.44A10 10 0 0 1 787 203.14a419.46 419.46 0 0 1 0 593.72 10 10 0 0 1-7 2.93zM272.51 692.09H100a10 10 0 0 1-10-10V317.91a10 10 0 0 1 10-10h172.51a10 10 0 0 1 10 10v364.18a10 10 0 0 1-10 10zm-162.51-20h152.51V327.91H110z"
        :fill="iconColor"
        opacity="1"
        data-original="#000000"
      ></path>
      <path
        d="M552.35 895.27a10 10 0 0 1-5.87-1.91L266.63 690.18a10 10 0 0 1-4.12-8.09V317.91a10 10 0 0 1 4.12-8.09l279.85-203.18a10 10 0 0 1 15.87 8.09v770.54a10 10 0 0 1-5.46 8.9 9.87 9.87 0 0 1-4.54 1.1zM282.51 677l259.84 188.65v-731.3L282.51 323z"
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
