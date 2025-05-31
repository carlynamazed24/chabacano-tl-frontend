<template>
  <div class="dictionary fade-in">
    <!-- Heading Section -->
    <div class="dictionary__heading">
      <h1 class="fs-heading-4 slide-up">Chabacano Dictionary</h1>
      <p class="fs-body-text slide-up" style="animation-delay: 0.1s">
        Explore the Chabacano dictionary with translations in Tagalog and
        English.
      </p>
    </div>

    <!-- Search Input -->
    <div class="dictionary__search slide-up" style="animation-delay: 0.2s">
      <div class="search-container">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Search in Chabacano, Tagalog, or English..."
          class="search-input"
          @input="filterEntries"
          aria-label="Search dictionary"
        />
        <div class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
    </div>

    <!-- Alphabet Navigation -->
    <div class="dictionary__nav slide-up" style="animation-delay: 0.3s">
      <div class="nav">
        <button
          v-for="(letter, index) in alphabets"
          :key="index"
          class="nav-item fs-body-text"
          :class="{ 'nav-item--active': selectedLetter === letter }"
          @click="filterByLetter(letter)"
          :aria-pressed="selectedLetter === letter"
          :aria-label="`Filter by letter ${letter}`"
        >
          {{ letter }}
        </button>
      </div>
    </div>

    <!-- Dictionary Results -->
    <div class="dictionary__contents slide-up" style="animation-delay: 0.4s">
      <h2 class="dictionary__results-heading fs-heading-6">
        Results: <span class="dictionary__results-count">{{ filteredEntries.length }}</span>
      </h2>

      <div v-if="loading" class="dictionary__loading">
        <div class="loading-spinner"></div>
        <span>Loading dictionary entries...</span>
      </div>
      
      <div v-else class="dictionary__results">
        <div v-if="filteredEntries.length" class="dictionary__entries">
          <div 
            v-for="(entry, index) in filteredEntries" 
            :key="entry.id" 
            class="dictionary__entry"
            :style="{ animationDelay: `${0.1 + (index * 0.05)}s` }"
          >
            <h3 class="dictionary__entry-title fs-body-text-semibold">
              <span class="dictionary__entry-lang">{{ entry.chabacanoLang }}</span> / 
              <span class="dictionary__entry-lang">{{ entry.tagalogLang }}</span> /
              <span class="dictionary__entry-lang">{{ entry.englishLang }}</span>
            </h3>
            <p class="dictionary__entry-definition fs-body-text">{{ entry.definition }}</p>
          </div>
        </div>
        <div v-else class="dictionary__no-results">
          <p>No results found.</p>
          <button @click="resetFilters" class="btn btn-outline btn--sm">
            <span class="btn-text">Clear filters</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RequestToGetDictionaryEntries } from "../composables/API/Dictionary";
import Button from "../components/ui/Button.vue";

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
  // Toggle letter selection if already selected
  if (selectedLetter.value === letter) {
    selectedLetter.value = "";
  } else {
    selectedLetter.value = letter;
  }
  filterEntries();
};

// Reset all filters
const resetFilters = () => {
  selectedLetter.value = "";
  searchQuery.value = "";
  filteredEntries.value = [...dictionaryEntries.value];
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
@import "../styles/tokens/colors.css";
@import "../styles/tokens/typography.css";
@import "../styles/tokens/spacing.css";
@import "../styles/tokens/animations.css";
@import "../styles/tokens/breakpoints.css";

.dictionary {
  max-width: 1000px;
  padding: var(--spacing-lg) var(--spacing-xl);
  margin: var(--spacing-2xl) auto;
  animation-duration: var(--transition-normal);
}

/* Heading Section */
.dictionary__heading {
  padding: var(--spacing-lg) 0;
  border-bottom: 1px solid var(--primary-color);
  margin-bottom: var(--spacing-lg);
}

.dictionary__heading h1 {
  color: var(--primary-color);
}

.dictionary__heading p {
  margin-top: var(--spacing-md);
  max-width: 36rem;
  color: var(--text-secondary);
}

/* Search Section */
.dictionary__search {
  margin: var(--spacing-md) 0 var(--spacing-lg);
}

.search-container {
  position: relative;
}

.search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  padding-right: calc(var(--spacing-lg) * 2);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-md);
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  color: var(--text-primary);
  background-color: rgba(255, 255, 255, 0.8);
  transition: all var(--transition-normal) var(--ease-out);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.search-icon {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-3-color);
  pointer-events: none;
  transition: color var(--transition-normal) var(--ease-out);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 4px 10px rgba(142, 125, 107, 0.15);
}

.search-input:focus + .search-icon {
  color: var(--primary-color);
}

/* Alphabet Navigation */
.dictionary__nav {
  margin: var(--spacing-lg) 0;
}

.nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  justify-content: center;
}

.nav-item {
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  background: none;
  border: none;
  color: var(--accent-3-color);
  transition: all var(--transition-normal) var(--ease-out);
  font-family: var(--font-body-semibold);
  border-radius: var(--border-radius-sm);
}

.nav-item:hover {
  color: var(--primary-color);
  background-color: rgba(142, 125, 107, 0.1);
  transform: translateY(-1px);
}

.nav-item--active {
  color: var(--light-color);
  background-color: var(--primary-color);
  font-weight: var(--fw-bold);
}

.nav-item--active:hover {
  color: var(--light-color);
  background-color: var(--primary-color);
  box-shadow: 0 2px 8px rgba(142, 125, 107, 0.3);
}

/* Dictionary Results */
.dictionary__contents {
  padding: var(--spacing-md) 0;
}

.dictionary__results-heading {
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
}

.dictionary__results-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  margin-left: var(--spacing-sm);
  padding: 0 var(--spacing-xs);
  font-size: var(--fs-small-text);
  font-weight: var(--fw-bold);
  color: var(--light-color);
  background-color: var(--primary-color);
  border-radius: var(--border-radius-pill);
}

.dictionary__entries {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.dictionary__entry {
  padding: var(--spacing-md);
  border-radius: var(--border-radius-md);
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all var(--transition-normal) var(--ease-out);
  animation: fadeInUp var(--transition-normal) var(--ease-out) forwards;
  opacity: 0;
}

.dictionary__entry:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.dictionary__entry-title {
  margin-bottom: var(--spacing-sm);
  color: var(--primary-color);
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid var(--accent-2-color);
}

.dictionary__entry-lang {
  display: inline-block;
}

.dictionary__entry-definition {
  color: var(--dark-color);
  line-height: var(--line-height-normal);
}

/* Loading State */
.dictionary__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-xl);
  color: var(--accent-3-color);
  gap: var(--spacing-md);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--accent-2-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* No Results */
.dictionary__no-results {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--accent-3-color);
  animation: fadeIn var(--transition-normal) var(--ease-out);
}

.dictionary__no-results p {
  margin-bottom: var(--spacing-md);
  font-size: var(--fs-body-text);
}

/* Responsive Styles */
@media (max-width: 768px) {
  .dictionary {
    padding: var(--spacing-md) var(--spacing-md);
    margin-top: var(--spacing-xl);
  }
  
  .dictionary__entries {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  
  .search-input {
    padding: var(--spacing-sm) var(--spacing-md);
  }
  
  .nav {
    gap: 4px;
  }
  
  .nav-item {
    padding: var(--spacing-xs) calc(var(--spacing-xs) + 2px);
    font-size: calc(var(--fs-small-text) * 1.1);
  }
}

@media (max-width: 480px) {
  .dictionary {
    padding: var(--spacing-sm);
  }
  
  .dictionary__heading {
    padding: var(--spacing-md) 0;
  }
  
  .dictionary__entry {
    padding: var(--spacing-sm);
  }
}
</style>
