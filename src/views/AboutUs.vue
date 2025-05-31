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
@import "../styles/tokens/colors.css";
@import "../styles/tokens/typography.css";
@import "../styles/tokens/spacing.css";
@import "../styles/tokens/animations.css";
@import "../styles/tokens/breakpoints.css";

.about-us {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: var(--spacing-3xl) var(--spacing-xl);
  background-color: var(--accent-2-color);
  background-image: linear-gradient(to bottom, var(--accent-2-color), var(--white-color));
  overflow: hidden;
}

.about-us::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('../assets/images/pattern.png');
  background-size: 300px;
  opacity: 0.05;
  pointer-events: none;
}

.about {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2xl);
  width: 70%;
  max-width: 1200px;
  animation: fadeInUp var(--transition-slow) var(--ease-out);
}

.about-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.about-title h1 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  font-family: var(--font-heading);
  position: relative;
  padding-bottom: var(--spacing-md);
}

.about-title h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: var(--secondary-color);
}

.about-title p {
  margin-top: var(--spacing-md);
  max-width: 600px;
  line-height: var(--line-height-loose);
  color: var(--dark-color);
  font-size: clamp(1rem, 2vw, 1.1rem);
}

.about-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-2xl);
  width: 100%;
}

.about-content .col {
  flex: 1;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-lg);
  border-bottom: 2px solid var(--primary-color);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: var(--border-radius-md);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform var(--transition-normal) var(--ease-out);
}

.about-content .col:hover {
  transform: translateY(-5px);
}

.about-content .col h2 {
  color: var(--primary-color);
  margin-bottom: var(--spacing-md);
  font-family: var(--font-heading);
  position: relative;
  display: inline-block;
}

.about-content .col h2::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 50%;
  height: 2px;
  background-color: var(--secondary-color);
  transition: width var(--transition-normal) var(--ease-out);
}

.about-content .col:hover h2::after {
  width: 100%;
}

.about-content .col p {
  line-height: var(--line-height-normal);
  color: var(--dark-color);
}

.about-dev-btn {
  margin-top: var(--spacing-xl);
  animation: fadeIn var(--transition-normal) var(--ease-out) 0.5s both;
}

/* Responsive styling */
@media screen and (max-width: 1024px) {
  .about {
    width: 80%;
  }
}

@media screen and (max-width: 768px) {
  .about {
    width: 90%;
  }
  
  .about-content {
    flex-direction: column;
    gap: var(--spacing-xl);
  }
  
  .about-content .col {
    width: 100%;
  }
}

@media screen and (max-width: 480px) {
  .about-us {
    padding: var(--spacing-2xl) var(--spacing-md);
  }
  
  .about {
    width: 100%;
    gap: var(--spacing-xl);
  }
  
  .about-title h1::after {
    width: 60px;
  }
  
  .about-title p {
    width: 100%;
    font-size: var(--fs-small-text);
  }
}
</style>
