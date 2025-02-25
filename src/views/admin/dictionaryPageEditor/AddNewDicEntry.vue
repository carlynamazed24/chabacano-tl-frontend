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
        />
      </div>

      <div class="input-container">
        <label for="tagalog-input" class="fs-body-text">Tagalog</label>
        <input
          type="text"
          id="tagalog-input"
          placeholder="Word or Phrase in Tagalog"
        />
      </div>

      <div class="input-container">
        <label for="english-input" class="fs-body-text">English</label>
        <input
          type="text"
          id="english-input"
          placeholder="Word or Phrase in English"
        />
      </div>

      <div class="input-container">
        <label for="english-definition" class="fs-body-text">Definition</label>
        <textarea
          id="english-definition"
          placeholder="Definition of the word or phrase in English"
        >
        </textarea>
      </div>
    </div>

    <div class="btn">
      <Button size="md" btnText="Add New Entry" btnType="btn-secondary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../../../components/Button.vue";
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
