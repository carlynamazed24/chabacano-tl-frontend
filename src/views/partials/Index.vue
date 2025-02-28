<template>
  <Hero :title="heroTitle" :tagline="heroContent" />
  <AboutUs
    :aboutUsTitle="aboutUsTitle"
    :aboutUsContent="aboutUsContent"
    :ourMissionTitle="ourMissionTitle"
    :ourMissionContent="ourMissionContent"
    :ourVisionTitle="ourVisionTitle"
    :ourVisionContent="ourVisionContent"
    :whyChabacanoTitle="whyChabacanoTitle"
    :whyChabacanoContent="whyChabacanoContent"
  />
  <CTA />
  <Footer />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RequestToGetHomepageContent } from "../../composables/API/Homepage";
import Hero from "./Hero.vue";
import AboutUs from "./AboutUs.vue";
import CTA from "./CTA.vue";
import Footer from "./Footer.vue";

const heroTitle = ref<string>("");
const heroContent = ref<string>("");
const aboutUsTitle = ref<string>("");
const aboutUsContent = ref<string>("");
const ourMissionTitle = ref<string>("");
const ourMissionContent = ref<string>("");
const ourVisionTitle = ref<string>("");
const ourVisionContent = ref<string>("");
const whyChabacanoTitle = ref<string>("");
const whyChabacanoContent = ref<string>("");

onMounted(async () => {
  const response = await RequestToGetHomepageContent();

  if (response.status === "failed") {
    console.log("Error fetching homepage content");
    return;
  }

  heroTitle.value = response.data.heroTitle;
  heroContent.value = response.data.heroContent;
  aboutUsTitle.value = response.data.aboutUsTitle;
  aboutUsContent.value = response.data.aboutUsContent;
  ourMissionTitle.value = response.data.ourMissionTitle;
  ourMissionContent.value = response.data.ourMissionContent;
  ourVisionTitle.value = response.data.ourVisionTitle;
  ourVisionContent.value = response.data.ourVisionContent;
  whyChabacanoTitle.value = response.data.whyChabacanoTitle;
  whyChabacanoContent.value = response.data.whyChabacanoContent;
});
</script>
