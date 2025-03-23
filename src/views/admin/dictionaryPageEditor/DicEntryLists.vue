<template>
  <div class="dictionary-editor">
    <h2 class="fs-heading-6">Dictionary Entries</h2>
    <div class="container">
      <table class="dictionary-table">
        <thead>
          <tr>
            <th class="fs-body-text">Chabacano</th>
            <th class="fs-body-text">Tagalog</th>
            <th class="fs-body-text">English</th>
            <th class="fs-body-text">Definition</th>
            <th class="fs-body-text">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in dictionaryEntries" :key="index">
            <td class="fs-body-text">{{ entry.chabacanoLang }}</td>
            <td class="fs-body-text">{{ entry.tagalogLang }}</td>
            <td class="fs-body-text">{{ entry.englishLang }}</td>
            <td class="fs-body-text">{{ entry.definition }}</td>
            <td class="actions">
              <Button
                size="sm"
                :withIcon="true"
                class="edit-btn"
                @click="editEntry(entry.id)"
              >
                <EditIcon :size="20" color="#000" />
              </Button>
              <Button
                size="sm"
                :withIcon="true"
                class="delete-btn"
                @click="confirmDeleteEntry(entry.id)"
              >
                <DeleteIcon :size="20" color="#000" />
              </Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  RequestToGetDictionaryEntries,
  RequestToDeleteDictionaryEntry,
} from "../../../composables/API/Dictionary";
import { type Dictionary } from "../../../composables/interfaces/Component";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../composables/services/notifications";
import { displayConfirmDialog } from "../../../composables/services/notifications";

import Button from "../../../components/ui/Button.vue";
import EditIcon from "../../../components/icons/EditIcon.vue";
import DeleteIcon from "../../../components/icons/DeleteIcon.vue";

const router = useRouter();

const dictionaryEntries = ref<Dictionary[]>([]);

const getDictionaryEntries = async () => {
  try {
    const response = await RequestToGetDictionaryEntries();

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    dictionaryEntries.value = response.data;
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
  }
};

const confirmDeleteEntry = (id: number) => {
  displayConfirmDialog("Are you sure you want to delete this entry?", () => {
    deleteEntry(id);
  });
};

const editEntry = async (id: number) => {
  if (id) {
    router.push({ name: "add-dic-entry", params: { id } });
  }
};

const deleteEntry = async (id: number) => {
  try {
    const response = await RequestToDeleteDictionaryEntry(id);

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    displaySuccessNotification("Entry deleted successfully");
    getDictionaryEntries();
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
  }
};

onMounted(async () => {
  await getDictionaryEntries();
});
</script>

<style scoped>
@import "../../../styles/variables.css";
.dictionary-editor {
  display: flex;
  flex-direction: column;
  gap: 3em;
  padding: 2em;
  background-color: white;
  border-radius: 0.5em;
}

.dictionary-table {
  width: 100%;
  border-collapse: collapse;
}

.dictionary-table th,
.dictionary-table td {
  padding: 0.75em;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.dictionary-table th {
  font-weight: 600;
}

.actions {
  display: flex;
  gap: 0.5em;
}

.edit-btn,
.delete-btn {
  padding: 0.25em 1em;
  border: none;
  border-radius: 0.25em;
  cursor: pointer;
  font-weight: 600;
  color: white;
}

.edit-btn {
  background-color: #6b7280;
}

.delete-btn {
  background-color: #4b5563;
}
</style>
