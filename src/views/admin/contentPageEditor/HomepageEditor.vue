<template>
  <div class="home-page-editor">
    <div class="section-content">
      <h2 class="fs-heading-6">Edit Hero Content</h2>
      <div class="input-container">
        <input type="text" />
      </div>

      <div class="input-container">
        <textarea></textarea>
      </div>
    </div>

    <div class="section-content">
      <h2 class="fs-heading-6">Edit About Us Content</h2>
      <div class="input-container">
        <input type="text" />
      </div>

      <div class="input-container">
        <textarea></textarea>
      </div>
    </div>

    <div class="section-content">
      <h2 class="fs-heading-6">Our Mission Content</h2>
      <div class="input-container">
        <input type="text" />
      </div>

      <div class="input-container">
        <textarea></textarea>
      </div>
    </div>

    <div class="section-content">
      <h2 class="fs-heading-6">Our Vission Content</h2>
      <div class="input-container">
        <input type="text" />
      </div>

      <div class="input-container">
        <textarea></textarea>
      </div>
    </div>

    <div class="section-content">
      <h2 class="fs-heading-6">Why Chabacano Content</h2>
      <div class="input-container">
        <input type="text" />
      </div>

      <div class="input-container">
        <textarea></textarea>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@import "../../../styles/variables.css";

.home-page-editor {
  display: flex;
  flex-direction: column;
  gap: 3em;
  padding: 2em;
  background-color: white;
  border-radius: 0.5em;
}

.home-page-editor > .section-content {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.home-page-editor > .section-content > .input-container > input {
  width: 100%;
  padding: 1em;
  outline: 0;
  border: 1px solid var(--dark-color);
  font-size: 1em;
}

.home-page-editor > .section-content > .input-container > textarea {
  resize: none;
  width: 100%;
  height: 100px;
  padding: 1em;
  outline: 0;
  font-size: 1.3em;
}
</style>
