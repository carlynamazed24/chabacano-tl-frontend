<template>
  <h2 class="fs-heading-6">Add New Section</h2>
  <div class="container">
    <div class="header-content content">
      <div class="input-container">
        <input
          type="text"
          placeholder="New Section Header"
          v-model="sectionContent.headerTitle"
        />
      </div>

      <div class="input-container">
        <textarea
          placeholder="New Section description"
          v-model="sectionContent.headerDescription"
        ></textarea>
      </div>
    </div>

    <div
      v-for="subHeader in sectionContent.subHeaders"
      :key="subHeader.subHeaderTitle"
      class="subheader-content content"
    >
      <div class="input-container">
        <input
          type="text"
          placeholder="New Section Subheader(Optional)"
          v-model="subHeader.subHeaderTitle"
        />
      </div>

      <div class="input-container">
        <textarea
          placeholder="New Section description (Optional) "
          v-model="subHeader.subHeaderDescription"
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
      @click="addNewSection"
      :disabled="isHeaderEmpty"
      size="md"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import Button from "../../../components/Button.vue";

interface SubHeader {
  subHeaderTitle: string;
  subHeaderDescription: string;
}

interface Sections {
  headerTitle: string;
  headerDescription: string;
  subHeaders?: SubHeader[];
}

const sectionContent = ref<Sections>({
  headerTitle: "",
  headerDescription: "",
  subHeaders: [
    {
      subHeaderTitle: "",
      subHeaderDescription: "",
    },
  ],
});

const isHeaderEmpty = computed(() => {
  return (
    sectionContent.value.headerTitle === "" ||
    sectionContent.value.headerDescription === ""
  );
});

const addNewSubHeader = () => {
  sectionContent.value.subHeaders?.push({
    subHeaderTitle: "",
    subHeaderDescription: "",
  });
};

const addNewSection = () => {};
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
