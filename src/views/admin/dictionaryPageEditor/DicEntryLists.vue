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
          <tr v-for="(entry, index) in entries" :key="index">
            <td class="fs-body-text">{{ entry.chabacano }}</td>
            <td class="fs-body-text">{{ entry.tagalog }}</td>
            <td class="fs-body-text">{{ entry.english }}</td>
            <td class="fs-body-text">{{ entry.definition }}</td>
            <td class="actions">
              <Button size="sm" :withIcon="true" class="edit-btn">
                <EditIcon :size="20" color="#000" />
              </Button>
              <Button size="sm" :withIcon="true" class="delete-btn">
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
import { ref } from "vue";
import Button from "../../../components/Button.vue";
import EditIcon from "../../../components/icons/EditIcon.vue";
import DeleteIcon from "../../../components/icons/DeleteIcon.vue";
const entries = ref([
  {
    chabacano: "Buenas dias",
    tagalog: "Magandang Umaga",
    english: "Good Morning",
    definition: "A morning greeting",
  },
  {
    chabacano: "Buenas dias",
    tagalog: "Magandang Umaga",
    english: "Good Morning",
    definition: "A morning greeting",
  },
  {
    chabacano: "Buenas dias",
    tagalog: "Magandang Umaga",
    english: "Good Morning",
    definition: "A morning greeting",
  },
  {
    chabacano: "Buenas dias",
    tagalog: "Magandang Umaga",
    english: "Good Morning",
    definition: "A morning greeting",
  },
  {
    chabacano: "Buenas dias",
    tagalog: "Magandang Umaga",
    english: "Good Morning",
    definition: "A morning greeting",
  },
]);
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
