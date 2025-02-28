<template>
  <section class="about-us">
    <div class="about">
      <div class="col">
        <h1 class="fs-heading-3">{{ aboutUsTitle }}</h1>
        <p class="fs-body-text">
          {{ aboutUsContent }}
        </p>
      </div>

      <div class="col">
        <h2 class="fs-heading-6">{{ ourMissionTitle }}</h2>
        <p class="fs-small-text">
          {{ ourMissionContent }}
        </p>
      </div>

      <div class="col">
        <h2 class="fs-heading-6">{{ ourVisionTitle }}</h2>
        <p class="fs-small-text">
          {{ ourVisionContent }}
        </p>
      </div>

      <div class="col">
        <h2 class="fs-heading-6">{{ whyChabacanoTitle }}</h2>
        <p class="fs-small-text">
          {{ whyChabacanoContent }}
        </p>
      </div>
    </div>
    <div class="img">
      <img
        src="../../assets/images/monument_about_us_pic.png"
        alt="Cavite Monument"
        loading="lazy"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { toRefs, watch } from "vue";

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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5em;
  padding: 5em 2em;
  background-color: var(--accent-2-color);
}

.about-us > .about {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-us > .about > .col > p {
  margin-block: 1em;
}

@media (max-width: 768px) {
  .about-us {
    flex-direction: column-reverse;
  }

  .about-us > .img > img {
    width: 100%;
  }
}
</style>
