<template>
  <div class="homepage-editor">
    <LoadingIndicator
      v-if="isLoading"
      label="Loading"
      variant="panel"
    />

    <template v-else>
      <div class="form-section">
        <div class="form-section__header">
          <h2 class="form-section__title fs-heading-6">Edit Hero Content</h2>
        </div>
        <div class="form-section__body">
          <div class="form-field">
            <label class="form-field__label fs-body-text">Title</label>
            <input
              type="text"
              v-model="heroTitle"
              class="form-field__input"
              placeholder="Enter hero title"
            />
          </div>
          <div class="form-field">
            <label class="form-field__label fs-body-text">Content</label>
            <textarea
              v-model="heroContent"
              class="form-field__textarea"
              placeholder="Enter hero content"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-section__header">
          <h2 class="form-section__title fs-heading-6">
            Edit About Us Content
          </h2>
        </div>
        <div class="form-section__body">
          <div class="form-field">
            <label class="form-field__label fs-body-text">Title</label>
            <input
              type="text"
              v-model="aboutUsTitle"
              class="form-field__input"
              placeholder="Enter about us title"
            />
          </div>
          <div class="form-field">
            <label class="form-field__label fs-body-text">Content</label>
            <textarea
              v-model="aboutUsContent"
              class="form-field__textarea"
              placeholder="Enter about us content"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-section__header">
          <h2 class="form-section__title fs-heading-6">Our Mission Content</h2>
        </div>
        <div class="form-section__body">
          <div class="form-field">
            <label class="form-field__label fs-body-text">Title</label>
            <input
              type="text"
              v-model="ourMissionTitle"
              class="form-field__input"
              placeholder="Enter mission title"
            />
          </div>
          <div class="form-field">
            <label class="form-field__label fs-body-text">Content</label>
            <textarea
              v-model="ourMissionContent"
              class="form-field__textarea"
              placeholder="Enter mission content"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-section__header">
          <h2 class="form-section__title fs-heading-6">Our Vision Content</h2>
        </div>
        <div class="form-section__body">
          <div class="form-field">
            <label class="form-field__label fs-body-text">Title</label>
            <input
              type="text"
              v-model="ourVisionTitle"
              class="form-field__input"
              placeholder="Enter vision title"
            />
          </div>
          <div class="form-field">
            <label class="form-field__label fs-body-text">Content</label>
            <textarea
              v-model="ourVisionContent"
              class="form-field__textarea"
              placeholder="Enter vision content"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <Button
          size="lg"
          btnText="Save Changes"
          btnType="btn-secondary"
          @click="updateHomepageContent"
        />
      </div>
    </template>
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
import LoadingIndicator from "../../../components/ui/LoadingIndicator.vue";

const heroTitle = ref<string>("");
const heroContent = ref<string>("");
const aboutUsTitle = ref<string>("");
const aboutUsContent = ref<string>("");
const ourMissionTitle = ref<string>("");
const ourMissionContent = ref<string>("");
const ourVisionTitle = ref<string>("");
const ourVisionContent = ref<string>("");
const whyChabacanoTitle = ref<string>("This has been removed from the UI");
const whyChabacanoContent = ref<string>("This has been removed from the UI");
const isLoading = ref(true);

// Store initial data to compare changes
const initialData = ref<Record<string, string>>({});

const getHomepageContent = async () => {
  isLoading.value = true;
  try {
    const response = await RequestToGetHomepageContent();

    if (response.status !== "success" || !response.data) {
      return displayErrorNotification(
        response.message || "Something went wrong"
      );
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

    // Store initial values for change tracking
    initialData.value = { ...response.data };
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.log(error);
  } finally {
    isLoading.value = false;
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
@import "../../../styles/tokens/colors.css";
@import "../../../styles/tokens/typography.css";
@import "../../../styles/tokens/spacing.css";
@import "../../../styles/tokens/animations.css";

.homepage-editor {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.form-section {
  background: var(--light-color);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  border: 1px solid rgba(13, 148, 136, 0.1);
}

.form-section__header {
  background: var(--gradient-primary);
  padding: var(--spacing-md) var(--spacing-lg);
}

.form-section__title {
  color: var(--light-color);
  margin: 0;
}

.form-section__body {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.form-field__label {
  color: var(--dark-color);
  font-weight: var(--fw-medium);
}

.form-field__input,
.form-field__textarea {
  width: 100%;
  padding: var(--spacing-md);
  border: 2px solid var(--light-color);
  border-radius: var(--border-radius-md);
  font-size: var(--fs-body-text);
  font-family: var(--font-body);
  background: var(--white-color);
  transition: border-color var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
}

.form-field__input:focus,
.form-field__textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring-color);
}

.form-field__textarea {
  resize: vertical;
  min-height: 120px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: var(--spacing-md);
}
</style>
