<template>
  <h2 class="fs-heading-6">
    {{ route.params.id ? "Edit" : "Add New" }} Section
  </h2>
  <div class="container">
    <div class="header-content content">
      <div class="input-container">
        <input
          type="text"
          placeholder="New Section Header"
          v-model="sectionContent.headingTitle"
        />
      </div>

      <div class="input-container">
        <textarea
          placeholder="New Section description"
          v-model="sectionContent.headingContent"
        ></textarea>
      </div>
    </div>

    <div
      v-for="subHeader in sectionContent.subHeaders"
      :key="subHeader.subHeadingTitle"
      class="subheader-content content"
    >
      <div class="input-container">
        <input
          type="text"
          placeholder="New Section Subheader(Optional)"
          v-model="subHeader.subHeadingTitle"
        />
      </div>

      <div class="input-container">
        <textarea
          placeholder="New Section description (Optional) "
          v-model="subHeader.subHeadingContent"
        ></textarea>
      </div>
    </div>
  </div>

  <div class="btn">
    <Button
      btnType="btn-outline"
      btnText="Add Subheader"
      @click="addNewSubHeader"
      size="md"
    />
    <Button
      btnType="btn-secondary"
      btnText="Submit"
      @click="route.params.id ? updateStorySection() : addNewStorySection()"
      :disabled="isHeaderEmpty"
      size="md"
    />
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
import Button from "../../../components/Button.vue";
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
