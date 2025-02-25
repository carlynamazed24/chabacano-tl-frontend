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
      <g :fill="iconColor">
        <path
          fill-rule="evenodd"
          d="m48.83 12.832 2.342 2.341v-.002a4 4 0 0 1 0 5.657L32.127 39.873a6.006 6.006 0 0 1-2.664 1.546l-6.083 1.66c-.181.05-.36.072-.535.072-1.265 0-2.28-1.218-1.92-2.53l1.656-6.05a6 6 0 0 1 1.54-2.656l19.05-19.08c.783-.784 1.809-1.175 2.832-1.175s2.047.391 2.828 1.172zm-19.893 26.66a4.007 4.007 0 0 0 1.776-1.032l14.165-14.166-5.165-5.165-14.176 14.2a4.01 4.01 0 0 0-1.027 1.77l-1.656 6.051zM46.293 22.88l3.465-3.465v.001c.78-.779.78-2.048 0-2.828l-2.341-2.34c-.378-.379-.88-.587-1.414-.587s-1.037.208-1.415.587l-3.461 3.466z"
          clip-rule="evenodd"
          :fill="iconColor"
          opacity="1"
          data-original="#000000"
          class=""
        ></path>
        <path
          d="M49 29.93a1 1 0 1 1 2 0V44c0 3.859-3.14 7-7 7H20c-3.86 0-7-3.141-7-7V20c0-3.859 3.14-7 7-7h14a1 1 0 1 1 0 2H20c-2.757 0-5 2.243-5 5v24c0 2.757 2.243 5 5 5h24c2.757 0 5-2.243 5-5z"
          :fill="iconColor"
          opacity="1"
          data-original="#000000"
          class=""
        ></path>
      </g>
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
