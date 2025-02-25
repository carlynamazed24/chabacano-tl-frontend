<template>
  <h2 class="fs-heading-6">Section Lists</h2>
  <div class="container">
    <div v-for="section in sectionLists" :key="section.id" class="section">
      <div class="header">
        <div class="heading">
          <h3 class="fs-heading-6">{{ section.header }}</h3>
          <div class="actions">
            <Button :withIcon="true" size="sm">
              <ArrowIcon :size="20" :color="'#000'" direction="up" />
            </Button>
            <Button :withIcon="true" size="sm">
              <ArrowIcon :size="20" :color="'#000'" direction="down" />
            </Button>
            <Button :withIcon="true" size="sm">
              <EditIcon :size="20" :color="'#000'" />
            </Button>
            <Button :withIcon="true" size="sm">
              <DeleteIcon :size="20" :color="'#000'" />
            </Button>
          </div>
        </div>
        <p class="fs-body-text">
          {{ section.description }}
        </p>
      </div>

      <div class="subheaders">
        <div
          v-for="subheader in section.subheaders"
          :key="subheader.id"
          class="subhead-item"
        >
          <h3 class="fs-heading-6">{{ subheader.title }}</h3>
          <p class="fs-body-text">
            {{ subheader.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "../../../components/Button.vue";
import ArrowIcon from "../../../components/icons/ArrowIcon.vue";
import DeleteIcon from "../../../components/icons/DeleteIcon.vue";
import EditIcon from "../../../components/icons/EditIcon.vue";

interface Subheader {
  id: string;
  title: string;
  description: string;
}

interface Section {
  id: string;
  header: string;
  description: string;
  subheaders: Subheader[];
}

const sectionLists = ref<Section[]>([]);
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
