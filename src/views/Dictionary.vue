<template>
  <div class="story">
    <!-- Heading Section -->
    <div class="heading">
      <h1 class="fs-heading-4">Chabacano Dictionary</h1>
      <p class="fs-body-text">
        Explore the Chabacano dictionary with translations in Tagalog and
        English.
      </p>
    </div>

    <!-- Search Input -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search in Chabacano, Tagalog, or English..."
        class="search-input"
        @input="filterEntries"
      />
    </div>

    <!-- Alphabet Navigation -->
    <div class="nav">
      <span
        v-for="(letter, index) in alphabets"
        :key="index"
        class="fs-body-text nav-item"
        :class="{ active: selectedLetter === letter }"
        @click="filterByLetter(letter)"
      >
        {{ index === 0 ? letter : ` / ${letter}` }}
      </span>
    </div>

    <!-- Dictionary Results -->
    <div class="contents">
      <h2 class="fs-heading-6">Results:</h2>

      <div v-if="loading" class="loading">Loading...</div>
      <div v-else class="results">
        <div v-if="filteredEntries.length">
          <div v-for="entry in filteredEntries" :key="entry.id" class="result">
            <h3 class="fs-body-text-semibold">
              {{ entry.chabacanoLang }} / {{ entry.tagalogLang }} /
              {{ entry.englishLang }}
            </h3>
            <p class="fs-body-text">{{ entry.definition }}</p>
          </div>
        </div>
        <p v-else class="no-results">No results found.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RequestToGetDictionaryEntries } from "../composables/API/Dictionary";

interface DictionaryEntry {
  id: number;
  chabacano: string;
  chabacanoLang: string;
  tagalogLang: string;
  englishLang: string;
  definition: string;
}

// Alphabet letters
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Dictionary data
const dictionaryEntries = ref<DictionaryEntry[]>([]);
const filteredEntries = ref<DictionaryEntry[]>([]);
const selectedLetter = ref("");
const searchQuery = ref("");
const loading = ref(false);

// Fetch dictionary data
const fetchDictionary = async () => {
  loading.value = true;
  try {
    const response = await RequestToGetDictionaryEntries();
    dictionaryEntries.value = response.data || [];
    filteredEntries.value = dictionaryEntries.value; // Default: show all
  } catch (error) {
    console.error("Error fetching dictionary:", error);
  } finally {
    loading.value = false;
  }
};

// Filter by first letter
const filterByLetter = (letter: string) => {
  selectedLetter.value = letter;
  filterEntries();
};

// Filter entries based on search query and selected letter
const filterEntries = () => {
  let filtered = [...dictionaryEntries.value];

  // Apply letter filter if selected
  if (selectedLetter.value) {
    filtered = filtered.filter((entry) => {
      return (
        entry.chabacanoLang.charAt(0).toLowerCase() ===
        selectedLetter.value.toLowerCase()
      );
    });
  }

  // Apply search query filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter((entry) => {
      return (
        entry.chabacanoLang.toLowerCase().includes(query) ||
        entry.tagalogLang.toLowerCase().includes(query) ||
        entry.englishLang.toLowerCase().includes(query) ||
        entry.definition.toLowerCase().includes(query)
      );
    });
  }

  filteredEntries.value = filtered;
};

// Fetch on mount
onMounted(fetchDictionary);
</script>

<style scoped>
@import "../styles/variables.css";

.story {
  max-width: 1000px;
  padding-inline: 1.5em;
  margin-top: 2em;
  margin-inline: auto;
}

.story > .heading {
  padding: 1.5em 0;
  border-bottom: 1px solid var(--primary-color);
}

.story > .heading > p {
  margin-top: 1em;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 1em 0;
}

.nav-item {
  cursor: pointer;
  transition: color 0.2s;
  color: var(--accent-3-color);
}

.nav-item:hover,
.active {
  color: var(--primary-color);
  font-weight: bold;
}

.loading,
.no-results {
  text-align: center;
  margin-top: 10px;
  font-size: 1.2rem;
}

.results > div {
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin-top: 1em;
}

.search-container {
  margin: 1em 0;
}

.search-input {
  width: 100%;
  padding: 0.8em;
  border: 1px solid var(--accent-3-color);
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}
</style>
