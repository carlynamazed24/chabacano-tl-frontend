<template>
  <div class="dictionary-entry-form">
    <div class="form-header">
      <h2 class="form-header__title fs-heading-5">
        {{ route.params.id ? "Edit Entry" : "Add New Entry" }}
      </h2>
      <p class="form-header__subtitle fs-body-text">
        {{
          route.params.id
            ? "Update the dictionary entry details"
            : "Fill in the translation details below"
        }}
      </p>
    </div>

    <div class="form-body">
      <div class="form-row">
        <div class="form-field">
          <label for="chabacano-input" class="form-field__label fs-body-text"
            >Chabacano</label
          >
          <input
            type="text"
            id="chabacano-input"
            class="form-field__input"
            placeholder="Word or Phrase in Chabacano"
            v-model="chabacaLang"
          />
        </div>

        <div class="form-field">
          <label for="tagalog-input" class="form-field__label fs-body-text"
            >Tagalog</label
          >
          <input
            type="text"
            id="tagalog-input"
            class="form-field__input"
            placeholder="Word or Phrase in Tagalog"
            v-model="tagalogLang"
          />
        </div>

        <div class="form-field">
          <label for="english-input" class="form-field__label fs-body-text"
            >English</label
          >
          <input
            type="text"
            id="english-input"
            class="form-field__input"
            placeholder="Word or Phrase in English"
            v-model="englishLang"
          />
        </div>
      </div>

      <div class="form-field">
        <label for="english-definition" class="form-field__label fs-body-text"
          >Definition</label
        >
        <textarea
          id="english-definition"
          class="form-field__textarea"
          placeholder="Definition of the word or phrase in English"
          v-model="definition"
        ></textarea>
      </div>
    </div>

    <div class="form-actions">
      <Button
        size="md"
        btnText="Cancel"
        btnType="btn-outline"
        @click="resetForm"
      />
      <Button
        size="md"
        :btnText="route.params.id ? 'Update Entry' : 'Save Entry'"
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
import Button from "../../../components/ui/Button.vue";
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
@import "../../../styles/tokens/colors.css";
@import "../../../styles/tokens/typography.css";
@import "../../../styles/tokens/spacing.css";
@import "../../../styles/tokens/animations.css";

.dictionary-entry-form {
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

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-lg);
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
  min-height: 150px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-md);
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--light-color);
}
</style>
