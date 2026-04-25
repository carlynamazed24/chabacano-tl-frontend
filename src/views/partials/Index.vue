<template>
  <Hero :title="heroTitle" :tagline="heroContent" :loading="isLoading" />
  <FeaturesSection />
  <HowItWorks />
  <FAQSection />
  <CTA />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RequestToGetHomepageContent } from "../../composables/API/Homepage";
import Hero from "./Hero.vue";
import FeaturesSection from "../../components/ui/FeaturesSection.vue";
import HowItWorks from "../../components/ui/HowItWorks.vue";
import FAQSection from "../../components/ui/FAQSection.vue";
import CTA from "./CTA.vue";

const heroTitle = ref<string>("");
const heroContent = ref<string>("");
const isLoading = ref(true);

onMounted(async () => {
  try {
    const response = await RequestToGetHomepageContent();

    if (response.status !== "success" || !response.data) {
      console.log("Error fetching homepage content");
      return;
    }

    heroTitle.value = response.data.heroTitle;
    heroContent.value = response.data.heroContent;
  } finally {
    isLoading.value = false;
  }
});
</script>
