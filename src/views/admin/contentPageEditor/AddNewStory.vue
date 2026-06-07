<template>
  <div class="story-form">
    <div class="form-header">
      <h2 class="form-header__title fs-heading-5">
        {{ route.params.id ? "Edit" : "Add New" }} Section
      </h2>
      <p class="form-header__subtitle fs-body-text">
        {{
          route.params.id
            ? "Update the section details"
            : "Create a new story section"
        }}
      </p>
    </div>

    <LoadingIndicator
      v-if="isLoading"
      label="Loading"
      variant="panel"
    />

    <template v-else>
      <div class="form-body">
        <!-- Main Section -->
        <div class="form-section form-section--main">
          <div class="form-section__header">
            <span class="form-section__badge">Main Section</span>
          </div>
          <div class="form-section__body">
            <div class="form-field">
              <label
                for="section-header"
                class="form-field__label fs-body-text"
                >Section Header</label
              >
              <input
                id="section-header"
                type="text"
                class="form-field__input"
                :placeholder="storyPlaceholders.sectionHeader"
                v-model="sectionContent.headingTitle"
              />
            </div>
            <div class="form-field">
              <label
                for="section-description"
                class="form-field__label fs-body-text"
                >Section Description</label
              >
              <textarea
                id="section-description"
                class="form-field__textarea"
                :placeholder="storyPlaceholders.sectionDescription"
                v-model="sectionContent.headingContent"
              ></textarea>
            </div>
          </div>
        </div>

        <!-- Sub Headers -->
        <div
          v-for="(subHeader, index) in sectionContent.subHeaders"
          :key="index"
          class="form-section form-section--sub"
        >
          <div class="form-section__header">
            <span class="form-section__badge form-section__badge--secondary"
              >Subheader {{ index + 1 }}</span
            >
          </div>
          <div class="form-section__body">
            <div class="form-field">
              <label
                :for="`subheader-title-${index}`"
                class="form-field__label fs-body-text"
                >Subheader Title (Optional)</label
              >
              <input
                :id="`subheader-title-${index}`"
                type="text"
                class="form-field__input"
                :placeholder="storyPlaceholders.subheaderTitle"
                v-model="subHeader.subHeadingTitle"
              />
            </div>
            <div class="form-field">
              <label
                :for="`subheader-content-${index}`"
                class="form-field__label fs-body-text"
                >Subheader Content (Optional)</label
              >
              <textarea
                :id="`subheader-content-${index}`"
                class="form-field__textarea"
                :placeholder="storyPlaceholders.subheaderContent"
                v-model="subHeader.subHeadingContent"
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <Button
          btnType="btn-outline"
          btnText="Add Subheader"
          @click="addNewSubHeader"
          size="md"
        />
        <Button
          btnType="btn-secondary"
          :btnText="route.params.id ? 'Update Section' : 'Create Section'"
          @click="route.params.id ? updateStorySection() : addNewStorySection()"
          :disabled="isHeaderEmpty"
          size="md"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  RequestToAddNewStory,
  RequestToGetStorySectionContent,
  RequestToUpdateStory,
} from "../../../composables/API/Storypage";
import { type StorypageContent } from "../../../composables/interfaces/Component";
import Button from "../../../components/ui/Button.vue";
import LoadingIndicator from "../../../components/ui/LoadingIndicator.vue";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../composables/services/notifications";

const router = useRouter();
const route = useRoute();
const isLoading = ref(Boolean(route.params.id));
const storyPlaceholders = {
  sectionHeader: "Enter section header",
  sectionDescription: "Enter section description",
  subheaderTitle: "Enter subheader title",
  subheaderContent: "Enter subheader content",
};

const sectionContent = ref<StorypageContent>({
  id: 0,
  headingTitle: "",
  headingContent: "",
  subHeaders: [
    {
      subHeadingTitle: "",
      subHeadingContent: "",
    },
  ],
});

const isHeaderEmpty = computed(() => {
  return (
    sectionContent.value.headingTitle === "" ||
    sectionContent.value.headingContent === ""
  );
});

const addNewSubHeader = () => {
  sectionContent.value.subHeaders?.push({
    subHeadingTitle: "",
    subHeadingContent: "",
  });
};

const addNewStorySection = async () => {
  try {
    const payload = {
      id: 0, // This is a dummy value
      headingTitle: sectionContent.value.headingTitle,
      headingContent: sectionContent.value.headingContent,
      subHeaders: sectionContent.value.subHeaders || [],
    };

    const response = await RequestToAddNewStory(payload);

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    displaySuccessNotification(response.message);
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
  } finally {
    resetForm();
  }
};

const updateStorySection = async () => {
  try {
    const payload = {
      id: 0, // This is a dummy value
      headingTitle: sectionContent.value.headingTitle,
      headingContent: sectionContent.value.headingContent,
      subHeaders: sectionContent.value.subHeaders || [],
    };

    const response = await RequestToUpdateStory(route.params.id, payload);

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    displaySuccessNotification(response.message);
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
  } finally {
    router.push({ name: "section-lists" });
    resetForm();
  }
};

const resetForm = () => {
  sectionContent.value = {
    id: 0,
    headingTitle: "",
    headingContent: "",
    subHeaders: [
      {
        subHeadingTitle: "",
        subHeadingContent: "",
      },
    ],
  };
};

onMounted(async () => {
  if (route.params.id) {
    try {
      const response = await RequestToGetStorySectionContent(route.params.id);

      if (response.status === "failed") {
        resetForm();
        return displayErrorNotification(response.message);
      }

      sectionContent.value = response.data;
    } catch (error) {
      displayErrorNotification("Something went wrong");
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }
});
</script>

<style scoped>
@import "../../../styles/tokens/colors.css";
@import "../../../styles/tokens/typography.css";
@import "../../../styles/tokens/spacing.css";
@import "../../../styles/tokens/animations.css";

.story-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.form-header {
  border-bottom: 1px solid var(--light-color);
  padding-bottom: var(--spacing-lg);
}

.form-header__title {
  color: var(--dark-color);
  margin-bottom: var(--spacing-xs);
}

.form-header__subtitle {
  color: var(--primary-color);
  opacity: 0.8;
}

.form-body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.form-section {
  background: var(--light-color);
  border: 1px solid rgba(13, 148, 136, 0.1);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.form-section__header {
  background: var(--gradient-primary);
  padding: var(--spacing-md) var(--spacing-lg);
}

.form-section--sub .form-section__header {
  background: var(--white-color);
  border-bottom: 1px solid rgba(13, 148, 136, 0.12);
}

.form-section__badge {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  color: var(--light-color);
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  font-weight: var(--fw-semibold);
}

.form-section__badge--secondary {
  color: var(--primary-color);
}

.form-section__body {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
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
  background: var(--white-color);
  color: var(--dark-color);
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  line-height: var(--line-height-normal);
  transition: border-color var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
}

.form-field__input:focus,
.form-field__textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring-color);
}

.form-field__input::placeholder,
.form-field__textarea::placeholder {
  color: var(--accent-3-color);
  opacity: 0.75;
}

.form-field__textarea {
  min-height: 140px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--light-color);
}

@media (max-width: 640px) {
  .form-section__body {
    padding: var(--spacing-md);
  }

  .form-actions {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
