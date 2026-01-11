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

    <div class="form-body">
      <!-- Main Section -->
      <div class="form-section form-section--main">
        <div class="form-section__header">
          <span class="form-section__badge">Main Section</span>
        </div>
        <div class="form-section__body">
          <div class="form-field">
            <label class="form-field__label fs-body-text">Section Header</label>
            <input
              type="text"
              class="form-field__input"
              placeholder="Enter section header"
              v-model="sectionContent.headingTitle"
            />
          </div>
          <div class="form-field">
            <label class="form-field__label fs-body-text"
              >Section Description</label
            >
            <textarea
              class="form-field__textarea"
              placeholder="Enter section description"
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
            <label class="form-field__label fs-body-text"
              >Subheader Title (Optional)</label
            >
            <input
              type="text"
              class="form-field__input"
              placeholder="Enter subheader title"
              v-model="subHeader.subHeadingTitle"
            />
          </div>
          <div class="form-field">
            <label class="form-field__label fs-body-text"
              >Subheader Content (Optional)</label
            >
            <textarea
              class="form-field__textarea"
              placeholder="Enter subheader content"
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
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../composables/services/notifications";

const router = useRouter();
const route = useRoute();

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
    const response = await RequestToGetStorySectionContent(route.params.id);

    if (response.status === "failed") {
      resetForm();
      return displayErrorNotification(response.message);
    }

    sectionContent.value = response.data;
  }
});
</script>

<style scoped>
@import "../../../styles/variables.css";

.container {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.container > .content {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.container > .content > .input-container > input {
  width: 100%;
  padding: 1em;
  outline: 0;
  border: 1px solid var(--dark-color);
  font-size: 1em;
}

.container > .content > .input-container > textarea {
  resize: none;
  width: 100%;
  height: 100px;
  padding: 1em;
  outline: 0;
  font-size: 1.3em;
}

.btn {
  display: flex;
  gap: 1em;
}
</style>
