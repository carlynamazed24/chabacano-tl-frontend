<template>
  <div class="home-page-editor">
    <div class="section-content">
      <h2 class="fs-heading-6">Edit Hero Content</h2>
      <div class="input-container">
        <input type="text" v-model="heroTitle" />
      </div>

      <div class="input-container">
        <textarea v-model="heroContent"></textarea>
      </div>
    </div>

    <div class="section-content">
      <h2 class="fs-heading-6">Edit About Us Content</h2>
      <div class="input-container">
        <input type="text" v-model="aboutUsTitle" />
      </div>

      <div class="input-container">
        <textarea v-model="aboutUsContent"></textarea>
      </div>
    </div>

    <div class="section-content">
      <h2 class="fs-heading-6">Our Mission Content</h2>
      <div class="input-container">
        <input type="text" v-model="ourMissionTitle" />
      </div>

      <div class="input-container">
        <textarea v-model="ourMissionContent"></textarea>
      </div>
    </div>

    <div class="section-content">
      <h2 class="fs-heading-6">Our Vission Content</h2>
      <div class="input-container">
        <input type="text" v-model="ourVisionTitle" />
      </div>

      <div class="input-container">
        <textarea v-model="ourVisionContent"></textarea>
      </div>
    </div>

    <div class="section-content">
      <h2 class="fs-heading-6">Why Chabacano Content</h2>
      <div class="input-container">
        <input type="text" v-model="whyChabacanoTitle" />
      </div>

      <div class="input-container">
        <textarea v-model="whyChabacanoContent"></textarea>
      </div>
    </div>

    <Button
      style="width: 10%"
      size="lg"
      btnText="Save"
      btnType="btn-secondary"
      @click="updateHomepageContent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  RequestToGetHomepageContent,
  RequestToUpdateHomepageContent,
} from "../../../composables/API/Homepage";

import Button from "../../../components/ui/Button.vue";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../composables/services/notifications";

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

// Store initial data to compare changes
const initialData = ref<Record<string, string>>({});

const getHomepageContent = async () => {
  try {
    const response = await RequestToGetHomepageContent();

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

    // Store initial values for change tracking
    initialData.value = { ...response.data };
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.log(error);
  }
};

// Check if changes were made
const isChanged = computed(() => {
  return (
    heroTitle.value !== initialData.value.heroTitle ||
    heroContent.value !== initialData.value.heroContent ||
    aboutUsTitle.value !== initialData.value.aboutUsTitle ||
    aboutUsContent.value !== initialData.value.aboutUsContent ||
    ourMissionTitle.value !== initialData.value.ourMissionTitle ||
    ourMissionContent.value !== initialData.value.ourMissionContent ||
    ourVisionTitle.value !== initialData.value.ourVisionTitle ||
    ourVisionContent.value !== initialData.value.ourVisionContent ||
    whyChabacanoTitle.value !== initialData.value.whyChabacanoTitle ||
    whyChabacanoContent.value !== initialData.value.whyChabacanoContent
  );
});

const updateHomepageContent = async () => {
  if (!isChanged.value) {
    return displaySuccessNotification("No changes made");
  }

  try {
    const payload = {
      heroTitle: heroTitle.value,
      heroContent: heroContent.value,
      aboutUsTitle: aboutUsTitle.value,
      aboutUsContent: aboutUsContent.value,
      ourMissionTitle: ourMissionTitle.value,
      ourMissionContent: ourMissionContent.value,
      ourVisionTitle: ourVisionTitle.value,
      ourVisionContent: ourVisionContent.value,
      whyChabacanoTitle: whyChabacanoTitle.value,
      whyChabacanoContent: whyChabacanoContent.value,
    };

    const response = await RequestToUpdateHomepageContent(payload);

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    displaySuccessNotification("Homepage content updated successfully");
    await getHomepageContent();
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.log(error);
  }
};

onMounted(async () => {
  await getHomepageContent();
});
</script>

<style scoped>
@import "../../../styles/variables.css";

.home-page-editor {
  display: flex;
  flex-direction: column;
  gap: 3em;
  padding: 2em;
  background-color: white;
  border-radius: 0.5em;
}

.home-page-editor > .section-content {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.home-page-editor > .section-content > .input-container > input {
  width: 100%;
  padding: 1em;
  outline: 0;
  border: 1px solid var(--dark-color);
  font-size: 1em;
}

.home-page-editor > .section-content > .input-container > textarea {
  resize: none;
  width: 100%;
  height: 100px;
  padding: 1em;
  outline: 0;
  font-size: 1.3em;
}
</style>
