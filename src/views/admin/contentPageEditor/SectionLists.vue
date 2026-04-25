<template>
  <h2 class="fs-heading-6">Section Lists</h2>
  <LoadingIndicator
    v-if="isLoading"
    label="Loading"
    variant="panel"
  />
  <div v-else class="container">
    <div v-for="section in sectionLists" :key="section.id" class="section">
      <div class="header">
        <div class="heading">
          <h3 class="fs-heading-6">{{ section.headingTitle }}</h3>
          <div class="actions">
            <Button
              :withIcon="true"
              size="sm"
              @click="
                changeSectionOrder(section.id, 'up', section.sectionOrder)
              "
            >
              <ArrowIcon :size="20" :color="'#000'" direction="up" />
            </Button>
            <Button
              :withIcon="true"
              size="sm"
              @click="
                changeSectionOrder(section.id, 'down', section.sectionOrder)
              "
            >
              <ArrowIcon :size="20" :color="'#000'" direction="down" />
            </Button>
            <Button :withIcon="true" size="sm" @click="editSection(section.id)">
              <EditIcon :size="20" :color="'#000'" />
            </Button>

            <Button
              :withIcon="true"
              size="sm"
              @click="confirmDelete(section.id)"
            >
              <DeleteIcon :size="20" :color="'#000'" />
            </Button>
          </div>
        </div>
        <p class="fs-body-text">
          {{ section.headingContent }}
        </p>
      </div>

      <div class="subheaders">
        <div
          v-for="subheader in section.subHeaders"
          :key="subheader.id"
          class="subhead-item"
        >
          <h3 class="fs-body-text-semibold">{{ subheader.subHeadingTitle }}</h3>
          <p class="fs-body-text">
            {{ subheader.subHeadingContent }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  RequestToGetStorypageContents,
  RequestToDeleteStory,
  RequestToChangeSectionOrder,
} from "../../../composables/API/Storypage";
import { type StorypageContent } from "../../../composables/interfaces/Component";
import {
  displayErrorNotification,
  displayConfirmDialog,
  displaySuccessNotification,
} from "../../../composables/services/notifications";

import Button from "../../../components/ui/Button.vue";
import ArrowIcon from "../../../components/icons/ArrowIcon.vue";
import DeleteIcon from "../../../components/icons/DeleteIcon.vue";
import EditIcon from "../../../components/icons/EditIcon.vue";
import LoadingIndicator from "../../../components/ui/LoadingIndicator.vue";

const router = useRouter();

const sectionLists = ref<StorypageContent[]>([]);
const isLoading = ref(true);

const getStoryContents = async () => {
  isLoading.value = true;
  try {
    const response = await RequestToGetStorypageContents();

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    const formatData = response.data.sort(
      (a: StorypageContent, b: StorypageContent) =>
        (a.sectionOrder ?? 0) - (b.sectionOrder ?? 0)
    );

    sectionLists.value = formatData;
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const confirmDelete = (id: number) => {
  if (id) {
    displayConfirmDialog("Are you sure you want to delete this story?", () => {
      deleteStory(id);
    });
  }
};

const deleteStory = async (id: number) => {
  try {
    const response = await RequestToDeleteStory(id);

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    displaySuccessNotification("Story deleted successfully");
    await getStoryContents();
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.log(error);
  }
};

const changeSectionOrder = async (
  id: number,
  direction: "up" | "down",
  orderSection: number | undefined
) => {
  try {
    const payload = {
      orderSection,
      direction,
    };

    const response = await RequestToChangeSectionOrder(payload, id);

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    displaySuccessNotification("Section order changed successfully");
    await getStoryContents();
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.log(error);
  }
};

const editSection = (id: number) => {
  if (id) {
    router.push({ name: "new-story", params: { id } });
  }
};

onMounted(async () => {
  await getStoryContents();
});
</script>

<style scoped>
@import "../../../styles/variables.css";

.container {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.container > .section {
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em 1.5em;
  border-radius: 0.5rem;
  border: 1px solid var(--primary-color);
}

.container > .section > .header > .heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

.container > .section > .header > .heading > .actions {
  display: flex;
  gap: 0.5em;
}

.container > .section > .subheaders {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.container > .section > .subheaders > .subhead-item > h3 {
  margin-bottom: 0.5em;
}
</style>
