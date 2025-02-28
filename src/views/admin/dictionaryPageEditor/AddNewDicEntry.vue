<template>
  <div class="dictionary-editor">
    <h2 class="fs-heading-6">Add New Entry</h2>
    <div class="container">
      <div class="input-container">
        <label for="chabacano-input" class="fs-body-text">Chabacano</label>
        <input
          type="text"
          id="chabacano-input"
          placeholder="Word or Phrase in Chabacano"
          v-model="chabacaLang"
        />
      </div>

      <div class="input-container">
        <label for="tagalog-input" class="fs-body-text">Tagalog</label>
        <input
          type="text"
          id="tagalog-input"
          placeholder="Word or Phrase in Tagalog"
          v-model="tagalogLang"
        />
      </div>

      <div class="input-container">
        <label for="english-input" class="fs-body-text">English</label>
        <input
          type="text"
          id="english-input"
          placeholder="Word or Phrase in English"
          v-model="englishLang"
        />
      </div>

      <div class="input-container">
        <label for="english-definition" class="fs-body-text">Definition</label>
        <textarea
          id="english-definition"
          placeholder="Definition of the word or phrase in English"
          v-model="definition"
        >
        </textarea>
      </div>
    </div>

    <div class="btn">
      <Button
        size="md"
        btnText="Save Entry"
        btnType="btn-secondary"
        @click="route.params.id ? updateEntry() : addNewEntry()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  RequestToGetDictionaryEntry,
  RequestToAddNewDictionaryEntry,
  RequestToUpdateDictionaryEntry,
} from "../../../composables/API/Dictionary";
import Button from "../../../components/Button.vue";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../../composables/services/notifications";

const route = useRoute();
const router = useRouter();

const chabacaLang = ref<string>("");
const tagalogLang = ref<string>("");
const englishLang = ref<string>("");
const definition = ref<string>("");

const updateEntry = async () => {
  try {
    const payload = {
      id: 0, // This is a dummy value
      chabacanoLang: chabacaLang.value,
      tagalogLang: tagalogLang.value,
      englishLang: englishLang.value,
      definition: definition.value,
    };

    const response = await RequestToUpdateDictionaryEntry(
      payload,
      route.params.id
    );

    if (response.status === "failed") {
      displayErrorNotification("Failed to update entry");
      return;
    }

    displaySuccessNotification("Entry updated successfully");
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
  } finally {
    resetForm();
    router.push({ name: "dic-entry-list" });
  }
};

const addNewEntry = async () => {
  try {
    const payload = {
      id: 0, // This is a dummy value
      chabacanoLang: chabacaLang.value,
      tagalogLang: tagalogLang.value,
      englishLang: englishLang.value,
      definition: definition.value,
    };

    const response = await RequestToAddNewDictionaryEntry(payload);

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    displaySuccessNotification(response.message);
    resetForm();
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
    resetForm();
  }
};

const resetForm = () => {
  chabacaLang.value = "";
  tagalogLang.value = "";
  englishLang.value = "";
  definition.value = "";
};

onMounted(async () => {
  if (route.params.id) {
    const response = await RequestToGetDictionaryEntry(route.params.id);
    if (response.status === "success") {
      chabacaLang.value = response.data.chabacanoLang;
      tagalogLang.value = response.data.tagalogLang;
      englishLang.value = response.data.englishLang;
      definition.value = response.data.definition;
    }
  }
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

.dictionary-editor > .container {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.dictionary-editor > .container > .input-container {
  display: flex;
  flex-direction: column;
  gap: 0.5em;
}

.dictionary-editor > .container > .input-container > label,
.dictionary-editor > .container > .input-container > input,
.dictionary-editor > .container > .input-container > textarea {
  display: block;
}

.dictionary-editor > .container > .input-container > input,
.dictionary-editor > .container > .input-container > textarea {
  padding: 1em;
  outline: 0;
}

.dictionary-editor > .container > .input-container > textarea {
  resize: none;
  height: 120px;
}
</style>
