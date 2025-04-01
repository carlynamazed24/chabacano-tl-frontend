<template>
  <Hero :title="heroTitle" :tagline="heroContent" />
  <CTA />
  <Footer />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RequestToGetHomepageContent } from "../../composables/API/Homepage";
import Hero from "./Hero.vue";
import CTA from "./CTA.vue";
import Footer from "./Footer.vue";

const heroTitle = ref<string>("");
const heroContent = ref<string>("");

onMounted(async () => {
  const response = await RequestToGetHomepageContent();

  if (response.status === "failed") {
    console.log("Error fetching homepage content");
    return;
  }

  heroTitle.value = response.data.heroTitle;
  heroContent.value = response.data.heroContent;
});
</script>
