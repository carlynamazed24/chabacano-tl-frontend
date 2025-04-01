<template>
  <section class="about-us">
    <div class="about">
      <div class="about-title text-center">
        <h1 class="fs-heading-3">{{ aboutUsTitle }}</h1>
        <p class="fs-small-text">{{ aboutUsContent }}</p>
      </div>

      <div class="about-content">
        <div class="col">
          <h2 class="fs-heading-5">{{ ourMissionTitle }}</h2>
          <p class="fs-small-text">{{ ourMissionContent }}</p>
        </div>

        <div class="col">
          <h2 class="fs-heading-5">{{ ourVisionTitle }}</h2>
          <p class="fs-small-text">{{ ourVisionContent }}</p>
        </div>
      </div>

      <div class="about-dev-btn">
        <Button
          size="lg"
          btnText="About Developers"
          btnType="btn-secondary"
          @click="toggleModal"
        />
      </div>
    </div>
    <DevelopersModal v-if="showModal" @close-modal="toggleModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RequestToGetHomepageContent } from "../composables/API/Homepage";
import Button from "../components/ui/Button.vue";
import DevelopersModal from "../components/ui/DevelopersModal.vue";

const showModal = ref<Boolean>(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const heroTitle = ref<string>("");
const heroContent = ref<string>("");
const aboutUsTitle = ref<string>("");
const aboutUsContent = ref<string>("");
const ourMissionTitle = ref<string>("");
const ourMissionContent = ref<string>("");
const ourVisionTitle = ref<string>("");
const ourVisionContent = ref<string>("");

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
});
</script>

<style scoped>
@import "../styles/variables.css";

.about-us {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5em 2em;
  background-color: var(--accent-2-color);
}

.about-us > .about {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4em;
  width: 60%;
}

.about-us > .about > .about-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.about-us > .about > .about-title > p {
  margin-top: 1em;
  width: 500px;
}

.about-us > .about > .about-content {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5em;
}

.about-us > .about > .about-content > .col {
  padding: 1em 0;
  border-bottom: 1px solid var(--primary-color);
}

.about-us > .about > .about-content > .col > h2 {
  margin-bottom: 0.5em;
}

@media screen and (max-width: 480px) {
  .about-us > .about > .about-title > p {
    margin-top: 1em;
    width: 100%;
  }

  .about-us > .about > .about-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5em;
  }
}
</style>
