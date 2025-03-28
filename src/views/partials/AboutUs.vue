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
import { ref, toRefs, watch } from "vue";

import Button from "../../components/ui/Button.vue";
import DevelopersModal from "../../components/ui/DevelopersModal.vue";

const props = defineProps({
  aboutUsTitle: String,
  aboutUsContent: String,
  ourMissionTitle: String,
  ourMissionContent: String,
  ourVisionTitle: String,
  ourVisionContent: String,
  whyChabacanoTitle: String,
  whyChabacanoContent: String,
});

let {
  aboutUsTitle,
  aboutUsContent,
  ourMissionTitle,
  ourMissionContent,
  ourVisionTitle,
  ourVisionContent,
  whyChabacanoTitle,
  whyChabacanoContent,
} = toRefs(props);

const showModal = ref<Boolean>(false);

const toggleModal = () => {
  showModal.value = !showModal.value;
};

watch(
  [
    aboutUsTitle,
    aboutUsContent,
    ourMissionTitle,
    ourMissionContent,
    ourVisionTitle,
    ourVisionContent,
    whyChabacanoTitle,
    whyChabacanoContent,
  ],
  ([
    newAboutUs,
    newAboutUsContent,
    newOurMissionTitle,
    newOurMissionContent,
    newOurVisionTitle,
    newOurVisionContent,
    newWhyChabacanoTitle,
    newWhyChabacanoContent,
  ]) => {
    aboutUsTitle = newAboutUs;
    aboutUsContent = newAboutUsContent;
    ourMissionTitle = newOurMissionTitle;
    ourMissionContent = newOurMissionContent;
    ourVisionTitle = newOurVisionTitle;
    ourVisionContent = newOurVisionContent;
    whyChabacanoTitle = newWhyChabacanoTitle;
    whyChabacanoContent = newWhyChabacanoContent;
  }
);
</script>

<style scoped>
@import "../../styles/variables.css";

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
