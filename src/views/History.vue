<template>
  <div class="history-page fade-in">
    <!-- Hero Banner Section -->
    <section class="history-page__hero-section">
      <div class="history-page__hero-content">
        <!-- Hero Image -->
        <div class="history-page__hero-image-container">
          <img
            src="../assets/images/cavite_historical_site_bg.png"
            alt="The Metropolitan Museum"
            loading="lazy"
            class="history-page__hero-image"
          />
        </div>

        <!-- Hero Text -->
        <div class="history-page__hero-text">
          <h2 class="history-page__hero-subtitle fs-body-text">
            Ternate, Cavite Heritage
          </h2>
          <h1 class="history-page__hero-title">
            Discover the Rich Legacy of Ternate's Merdicas and Chabacano Culture
          </h1>
          <p class="history-page__hero-description fs-body-text">
            Journey through the fascinating history of Ternate, from the 1663
            arrival of the Merdicas from the Moluccas to the present day.
            Explore how this unique community from Indonesia's Ternate and
            Tidore islands settled in Cavite, bringing with them their Catholic
            faith, rich traditions, and the distinctive Ternateño Chabacano
            language that continues to thrive today.
          </p>
          <button class="history-page__hero-btn">Explore History</button>
        </div>
      </div>
    </section>

    <!-- Most Viewed Posts Section -->
    <section class="history-page__featured-section">
      <div class="history-page__container">
        <h2 class="history-page__section-title">Most Viewed Posts:</h2>

        <!-- Search Bar (shown when searching) -->
        <div v-if="searchQuery" class="history-page__search-section">
          <div class="history-page__search-wrapper">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Search historical events, people, or places..."
              class="history-page__search-input fs-body-text"
              aria-label="Search history"
            />
            <svg
              class="history-page__search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
        </div>

        <!-- No Results (when searching) -->
        <div
          v-if="searchQuery && filteredHistory.length === 0"
          class="history-page__no-results"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="11" y1="16" x2="11.01" y2="16"></line>
          </svg>
          <p class="fs-body-text">No results found for "{{ searchQuery }}"</p>
        </div>

        <!-- Search Results -->
        <div
          v-if="searchQuery && filteredHistory.length > 0"
          class="history-page__search-results"
        >
          <article
            v-for="item in filteredHistory"
            :key="item.id"
            class="history-page__result-card"
          >
            <div class="history-page__card-header">
              <div class="history-page__card-meta">
                <span
                  class="history-page__card-type"
                  :class="`type--${item.type}`"
                >
                  {{ item.type }}
                </span>
                <span class="history-page__card-date">{{ item.date }}</span>
              </div>
              <span
                v-if="item.status"
                class="history-page__card-status"
                :class="`status--${item.status}`"
              >
                {{ item.status }}
              </span>
            </div>
            <h3 class="history-page__card-title fs-heading-6">
              {{ item.title }}
            </h3>
            <p class="history-page__card-description fs-body-text">
              {{ item.description }}
            </p>
            <div v-if="item.tags" class="history-page__card-tags">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="history-page__card-tag"
                >{{ tag }}</span
              >
            </div>
          </article>
        </div>

        <!-- Featured Posts Grid (when not searching) -->
        <div v-if="!searchQuery" class="history-page__featured-grid">
          <article
            v-for="item in featuredPosts"
            :key="item.id"
            class="history-page__featured-card"
            :class="{ 'history-page__featured-card--large': item.id === 1 }"
            @click="openModal(item)"
          >
            <div class="history-page__featured-image">
              <img
                :src="item.image"
                :alt="item.title"
                class="history-page__featured-img"
              />
              <div class="history-page__featured-overlay"></div>
            </div>
            <div class="history-page__featured-content">
              <h3 class="history-page__featured-title">{{ item.title }}</h3>
              <p class="history-page__featured-excerpt">{{ item.excerpt }}</p>
              <button
                class="history-page__featured-btn"
                @click.stop="openModal(item)"
              >
                More...
              </button>
            </div>
          </article>
        </div>

        <!-- Detail Modal -->
        <div
          v-if="selectedPost"
          class="history-page__modal"
          @click="closeModal"
        >
          <div class="history-page__modal-content" @click.stop>
            <button class="history-page__modal-close" @click="closeModal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div class="history-page__modal-image">
              <img :src="selectedPost.image" :alt="selectedPost.title" />
            </div>
            <div class="history-page__modal-body">
              <h2 class="history-page__modal-title fs-heading-4">
                {{ selectedPost.title }}
              </h2>
              <p class="history-page__modal-description fs-body-text">
                {{ selectedPost.fullDescription }}
              </p>
              <div
                v-if="selectedPost.details"
                class="history-page__modal-details"
              >
                <h3 class="fs-heading-6">Key Details</h3>
                <ul>
                  <li
                    v-for="(detail, index) in selectedPost.details"
                    :key="index"
                  >
                    {{ detail }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Gallery Section -->
        <section
          v-if="!searchQuery"
          class="history-page__gallery"
          id="gallery-section"
        >
          <h2 class="history-page__section-title fs-heading-5">
            Historical Gallery
          </h2>
          <p class="history-page__gallery-description fs-body-text">
            Explore the rich visual heritage of Cavite and Chabacano culture
            through these images.
          </p>
          <div class="history-page__gallery-grid">
            <div class="history-page__gallery-item" v-for="n in 6" :key="n">
              <div class="history-page__gallery-placeholder">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span>Image {{ n }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- References Section -->
        <section v-if="!searchQuery" class="history-page__references">
          <h2 class="history-page__section-title fs-heading-5">
            References & Sources
          </h2>
          <p class="fs-body-text history-page__references-intro">
            Learn more about Ternate, Cavite and Chabacano history from these
            authoritative sources:
          </p>
          <ul class="history-page__references-list">
            <li
              v-for="reference in references"
              :key="reference.id"
              class="history-page__reference-item"
            >
              <a
                :href="reference.url"
                target="_blank"
                rel="noopener noreferrer"
                class="history-page__reference-link"
              >
                <div class="history-page__reference-content">
                  <h3
                    class="history-page__reference-title fs-body-text-semibold"
                  >
                    {{ reference.title }}
                  </h3>
                  <p class="history-page__reference-description fs-small-text">
                    {{ reference.description }}
                  </p>
                  <span class="history-page__reference-source fs-small-text">{{
                    reference.source
                  }}</span>
                </div>
                <svg
                  class="history-page__reference-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  ></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            </li>
          </ul>
        </section>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface HistoryItem {
  id: number;
  type: "event" | "person" | "place" | "cultural";
  date: string;
  title: string;
  description: string;
  tags?: string[];
  status?: "verified" | "documented" | "archived";
}

interface FeaturedPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  fullDescription: string;
  details?: string[];
}

const searchQuery = ref<string>("");
const selectedPost = ref<FeaturedPost | null>(null);

const openModal = (post: FeaturedPost) => {
  selectedPost.value = post;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedPost.value = null;
  document.body.style.overflow = "";
};

// Featured Posts - Ternate, Cavite Historical Highlights
const featuredPosts = ref<FeaturedPost[]>([
  {
    id: 1,
    title: "The Merdicas Migration (1663)",
    excerpt:
      "The arrival of Catholic natives from Ternate and Tidore islands in the Moluccas, who were resettled in Cavite to defend Manila, marking the birth of Ternate municipality.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "In 1663, a pivotal moment in Philippine history unfolded when the Merdicas (also spelled Mardicas or Mardikas), Catholic natives from the islands of Ternate and Tidore in the Moluccas, were resettled near the mouth of the Maragondon River in Cavite. These people had been converted to Christianity by Portuguese Jesuit missionaries during the Portuguese occupation of their homeland. When the Spanish garrison in Ternate was forced to withdraw to defend Manila against an impending invasion by Chinese warlord Koxinga, the Merdicas volunteered to relocate. Among them was their ruler, Sultan Said Din Burkat, who was deported to Manila with his entourage and family, later converting to Christianity. Though Koxinga's invasion never materialized due to his illness and death, the Merdicas community remained in Cavite, establishing what would become the municipality of Ternate.",
    details: [
      "The Merdicas were of mixed Mexican-Filipino-Spanish and Papuan-Indonesian-Portuguese descent",
      "They settled in a sandbar known as Bahra de Maragondon",
      "The area was previously called 'Wawa' by native Tagalogs, meaning 'river mouth'",
      "Sultan Said Din Burkat led his people in their resettlement",
      "The community volunteered to help defend Manila from Koxinga's threatened invasion",
    ],
  },
  {
    id: 2,
    title: "Ternateño Chabacano Language",
    excerpt:
      "A unique Spanish-based creole with Portuguese and Papuan influences, locally called 'Bahra', spoken by descendants of the Merdicas community for over 360 years.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "Ternateño Chabacano, locally known simply as 'Bahra', is a Spanish-based creole language with distinctive Portuguese and Papuan influences that has been spoken by the descendants of the Merdicas community for over 360 years. This unique linguistic heritage reflects the complex history of the Ternate community, combining elements from their Indonesian origins, the Spanish colonial presence, Portuguese missionary influence, and interaction with local Tagalog speakers. Despite the passage of centuries and the dominance of Tagalog in the region, the Ternateño Chabacano language continues to be used by the community today, serving as a living link to their remarkable history and cultural identity.",
    details: [
      "Locally called 'Bahra' by native speakers",
      "Contains vocabulary from Spanish, Portuguese, Papuan languages, and Tagalog",
      "Different from other Chabacano variants like Zamboangueño",
      "Continues to be spoken by descendants of the original Merdicas settlers",
      "Represents over 360 years of continuous linguistic tradition",
      "One of several Spanish-based creole varieties found in the Philippines",
    ],
  },
  {
    id: 3,
    title: "Municipal Independence (1857)",
    excerpt:
      "On March 31, 1857, Ternate became the first barrio to gain independence from Maragondon, establishing itself as a distinct municipality with its own identity.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "On March 31, 1857, Ternate achieved a significant milestone by becoming the first barrio to attain full independence from the municipality of Maragondon. This historic agreement was signed on behalf of the residents of Ternate by five distinguished community leaders: Tomás de León, Félix Nigosa, Pablo de León, Florencio Nino Franco, and Juan Ramos. The establishment of Ternate as an independent municipality recognized the unique character and historical significance of the Merdicas community. However, during the American colonial period, Act No. 947 merged Ternate with Naic on October 15, 1903, as part of a consolidation that reduced Cavite's twenty-three municipalities to eleven. This merger proved temporary, and by virtue of Executive Order No. 96 issued in November 1915 (effective January 1, 1916), Ternate was separated from Naic and re-established as an independent municipality, a status it maintains to this day.",
    details: [
      "Independence achieved on March 31, 1857",
      "First barrio in Maragondon to gain municipal status",
      "Agreement signed by Tomás de León, Félix Nigosa, Pablo de León, Florencio Nino Franco, and Juan Ramos",
      "Temporarily merged with Naic in 1903 under American colonial rule",
      "Re-established as independent municipality on January 1, 1916",
      "Currently has 10 barangays and a population of approximately 24,891 (2024)",
    ],
  },
  {
    id: 4,
    title: "Bahra de Maragondon Settlement",
    excerpt:
      "The sandbar near Maragondon River where the Merdicas first settled, originally known as 'Wawa' by native Tagalogs, meaning river mouth or river delta.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "The Bahra de Maragondon, a sandbar formation near the mouth of the Maragondon River, served as the initial settlement location for the Merdicas community when they arrived in Cavite in 1663. Prior to the arrival of the migrants, this area was known as 'Wawa' by the native Tagalog population, a term derived from the Tagalog language meaning 'river mouth' or 'river delta'. The strategic location near the river and Manila Bay made it suitable for the community's needs while allowing them to maintain a degree of separation from the existing settlements. Over time, this settlement grew and evolved into what is now the municipality of Ternate. The name 'Bahra' continues to be used by locals as an alternative name for both the town and their language, serving as a linguistic connection to this historic settlement site.",
    details: [
      "Located near the mouth of the Maragondon River",
      "Originally called 'Wawa' by native Tagalogs (meaning river mouth/delta)",
      "Sandbar formation provided suitable land for settlement",
      "Strategic location near Manila Bay and Tanza, Cavite",
      "The term 'Bahra' is still used locally to refer to Ternate and its language",
      "Site evolved from temporary settlement to permanent municipality",
    ],
  },
]);

// Historical data about Ternate, Cavite
const historyItems = ref<HistoryItem[]>([
  {
    id: 1,
    type: "event",
    date: "1663",
    title: "Arrival of the Merdicas",
    description:
      "Catholic natives from Ternate and Tidore islands of the Moluccas, converted by Jesuit missionaries, were resettled near Maragondon River after Spanish garrison pulled out from Ternate to defend Manila against Koxinga's invasion.",
    tags: ["Merdicas", "Spanish Colonial", "Migration"],
    status: "documented",
  },
  {
    id: 2,
    type: "person",
    date: "1663",
    title: "Sultan Said Din Burkat",
    description:
      "The ruler of Ternate who was deported to Manila with his entourage and family, later converting to Christianity. He led his people in their resettlement to Cavite.",
    tags: ["Leadership", "Conversion", "Royalty"],
    status: "documented",
  },
  {
    id: 3,
    type: "place",
    date: "Historical",
    title: "Bahra de Maragondon",
    description:
      "The sandbar near the mouth of the Maragondon River where the Merdicas community first settled. Originally known as 'Wawa' by native Tagalogs, meaning 'river mouth' or 'river delta'.",
    tags: ["Settlement", "Geography"],
    status: "verified",
  },
  {
    id: 4,
    type: "cultural",
    date: "1600s-Present",
    title: "Ternateño Chabacano Language",
    description:
      "A Spanish creole with Portuguese and Papuan influences, spoken by descendants of the Merdicas. Locally known as 'Bahra', this unique language continues to be used by the community today.",
    tags: ["Language", "Heritage", "Creole"],
    status: "verified",
  },
  {
    id: 5,
    type: "event",
    date: "March 31, 1857",
    title: "Independence from Maragondon",
    description:
      "Ternate became the first barrio to attain full independence from Maragondon. The agreement was signed by Tomás de León, Félix Nigosa, Pablo de León, Florencio Nino Franco, and Juan Ramos.",
    tags: ["Independence", "Municipality"],
    status: "documented",
  },
  {
    id: 6,
    type: "event",
    date: "October 15, 1903",
    title: "Merger with Naic",
    description:
      "Ternate was merged with Naic by virtue of Act No. 947, reducing the twenty-three municipalities of Cavite to eleven during the American colonial period.",
    tags: ["American Period", "Administrative"],
    status: "documented",
  },
  {
    id: 7,
    type: "event",
    date: "January 1, 1916",
    title: "Separation from Naic",
    description:
      "Ternate was separated from Naic by virtue of Executive Order No. 96 issued in November 1915, becoming an independent municipality once again.",
    tags: ["Independence", "Municipality"],
    status: "documented",
  },
  {
    id: 8,
    type: "place",
    date: "Historical",
    title: "Fort San Felipe",
    description:
      "Historical fortification in nearby Cavite City that played a role in Spanish colonial defense. Connected to the broader history of the region and the Merdicas settlement.",
    tags: ["Spanish Colonial", "Fortification"],
    status: "archived",
  },
  {
    id: 9,
    type: "cultural",
    date: "1600s-Present",
    title: "Merdicas Heritage",
    description:
      "The unique mixed heritage of Mexican-Filipino-Spanish and Papuan-Indonesian-Portuguese descent that characterizes the Ternateño people, making them distinct from other Filipino communities.",
    tags: ["Heritage", "Identity", "Culture"],
    status: "verified",
  },
  {
    id: 10,
    type: "person",
    date: "1663",
    title: "Jesuit Missionaries",
    description:
      "Portuguese Jesuit missionaries who converted the natives of Ternate and Tidore islands to Catholicism during the Portuguese occupation, laying the foundation for the community's Christian faith.",
    tags: ["Religion", "Conversion", "Portuguese"],
    status: "documented",
  },
]);

const references = ref([
  {
    id: 1,
    title: "Ternate, Cavite - Wikipedia",
    description:
      "Comprehensive encyclopedia article covering the history, geography, demographics, and culture of Ternate municipality in Cavite province.",
    source: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Ternate,_Cavite",
  },
  {
    id: 2,
    title: "Chabacano Language and Heritage",
    description:
      "Information about the Chavacano/Chabacano Spanish-based creole languages of the Philippines, including the Ternateño variant.",
    source: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Chabacano",
  },
  {
    id: 3,
    title: "Spanish in the Pacific (PDF)",
    description:
      "Academic paper by John M. Lipski discussing Spanish language influences in the Pacific, including the Ternate settlement and Chabacano development.",
    source: "Research Paper",
    url: "https://johnlipski.github.io/pacific.pdf",
  },
  {
    id: 4,
    title: "Municipality of Ternate Official Website",
    description:
      "Official local government website with current information about Ternate's governance, services, and community programs.",
    source: "Local Government",
    url: "https://lgu201.dilg.gov.ph/view.php?r=04&p=21&m=21",
  },
]);

const filteredHistory = computed(() => {
  if (!searchQuery.value) {
    return historyItems.value;
  }

  const query = searchQuery.value.toLowerCase().trim();
  return historyItems.value.filter((item) => {
    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.type.toLowerCase().includes(query) ||
      item.date.toLowerCase().includes(query) ||
      item.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });
});
</script>

<style scoped>
@import "../styles/tokens/colors.css";
@import "../styles/tokens/typography.css";
@import "../styles/tokens/spacing.css";
@import "../styles/tokens/animations.css";
@import "../styles/tokens/breakpoints.css";

/* ===== Page Layout ===== */
.history-page {
  min-height: 100vh;
  background-color: var(--background-color);
  padding-bottom: 0;
}

/* ===== Hero Section ===== */
.history-page__hero-section {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--secondary-color) 100%
  );
  padding: var(--spacing-3xl) var(--spacing-lg);
  color: var(--light-color);
}

.history-page__hero-content {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.history-page__hero-image-container {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.history-page__hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.history-page__hero-text {
  color: var(--light-color);
}

.history-page__hero-subtitle {
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  color: var(--light-color);
  margin-bottom: var(--spacing-sm);
  opacity: 0.9;
  font-weight: var(--fw-regular);
}

.history-page__hero-title {
  font-family: var(--font-heading);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: var(--fw-bold);
  line-height: 1.2;
  margin-bottom: var(--spacing-lg);
  color: var(--light-color);
}

.history-page__hero-description {
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  line-height: 1.7;
  margin-bottom: var(--spacing-xl);
  color: var(--light-color);
  opacity: 0.95;
}

.history-page__hero-btn {
  padding: 12px 32px;
  background-color: rgba(255, 255, 255, 0.2);
  color: var(--light-color);
  border: 2px solid var(--light-color);
  border-radius: 6px;
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  font-weight: var(--fw-semibold);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.history-page__hero-btn:hover {
  background-color: var(--light-color);
  color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* ===== Featured Section ===== */
.history-page__featured-section {
  background-color: var(--background-color);
  padding: var(--spacing-3xl) var(--spacing-lg);
  min-height: 70vh;
}

.history-page__container {
  max-width: 1400px;
  margin: 0 auto;
}

.history-page__section-title {
  font-family: var(--font-heading);
  font-size: var(--fs-heading-4);
  font-weight: var(--fw-bold);
  color: var(--dark-color);
  margin-bottom: var(--spacing-2xl);
}

/* ===== Featured Grid ===== */
.history-page__featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-lg);
}

.history-page__featured-card {
  background-color: var(--light-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform var(--transition-fast),
    box-shadow var(--transition-fast);
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.history-page__featured-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
}

.history-page__featured-card--large {
  grid-column: span 1;
  grid-row: span 2;
}

.history-page__featured-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.history-page__featured-card--large .history-page__featured-image {
  height: 100%;
  min-height: 400px;
}

.history-page__featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.history-page__featured-card:hover .history-page__featured-img {
  transform: scale(1.05);
}

.history-page__featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.4) 100%
  );
}

.history-page__featured-content {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--light-color);
  color: var(--dark-color);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.history-page__featured-title {
  font-family: var(--font-heading);
  font-size: var(--fs-heading-6);
  font-weight: var(--fw-bold);
  color: var(--dark-color);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.history-page__featured-excerpt {
  font-family: var(--font-body);
  font-size: var(--fs-small-text);
  color: var(--text-color);
  line-height: 1.5;
  margin-bottom: var(--spacing-md);
  opacity: 0.9;
  flex: 1;
}

.history-page__featured-btn {
  align-self: flex-start;
  padding: 6px 20px;
  background-color: var(--primary-color);
  color: var(--light-color);
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-family: var(--font-body);
  font-size: var(--fs-small-text);
  font-weight: var(--fw-medium);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.history-page__featured-btn:hover {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  transform: translateY(-1px);
}

/* ===== Modal ===== */
.history-page__modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--spacing-lg);
  animation: fadeIn var(--transition-fast);
  overflow-y: auto;
}

.history-page__modal-content {
  background-color: var(--light-color);
  border-radius: 12px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUpFade var(--transition-normal) var(--ease-out);
}

.history-page__modal-close {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  background-color: rgba(0, 0, 0, 0.5);
  color: var(--light-color);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  z-index: 10;
}

.history-page__modal-close:hover {
  background-color: rgba(0, 0, 0, 0.8);
  transform: rotate(90deg);
}

.history-page__modal-image {
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
}

.history-page__modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.history-page__modal-body {
  padding: var(--spacing-2xl);
}

.history-page__modal-title {
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  color: var(--dark-color);
  margin-bottom: var(--spacing-lg);
}

.history-page__modal-description {
  font-family: var(--font-body);
  color: var(--text-color);
  line-height: 1.8;
  margin-bottom: var(--spacing-xl);
}

.history-page__modal-details {
  background-color: var(--background-color);
  padding: var(--spacing-lg);
  border-radius: 8px;
  border-left: 4px solid var(--primary-color);
}

.history-page__modal-details h3 {
  font-family: var(--font-heading);
  color: var(--dark-color);
  margin-bottom: var(--spacing-md);
}

.history-page__modal-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-page__modal-details li {
  font-family: var(--font-body);
  color: var(--text-color);
  padding: var(--spacing-xs) 0;
  padding-left: var(--spacing-lg);
  position: relative;
  line-height: 1.6;
}

.history-page__modal-details li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: var(--fw-bold);
  font-size: 1.2em;
}

/* ===== Search Section ===== */
.history-page__search-section {
  margin: 0 auto var(--spacing-3xl);
  max-width: 600px;
}

.history-page__search-wrapper {
  position: relative;
  width: 100%;
}

.history-page__search-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md)
    var(--spacing-3xl);
  border: 2px solid var(--accent-2-color);
  border-radius: 50px;
  font-family: var(--font-body);
  color: var(--dark-color);
  background-color: var(--light-color);
  transition: border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  outline: none;
}

.history-page__search-input::placeholder {
  color: var(--accent-3-color);
}

.history-page__search-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(13, 110, 253, 0.1);
}

.history-page__search-icon {
  position: absolute;
  left: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-3-color);
  pointer-events: none;
}

/* ===== Content Area ===== */
.history-page__content {
  animation: fadeIn var(--transition-slow) var(--ease-out);
}

/* ===== Empty State ===== */
.history-page__empty-state {
  text-align: center;
  padding: var(--spacing-4xl) var(--spacing-lg);
  color: var(--accent-3-color);
}

.history-page__empty-state svg {
  margin-bottom: var(--spacing-lg);
  color: var(--accent-2-color);
}

.history-page__empty-state h3 {
  color: var(--dark-color);
  margin-bottom: var(--spacing-sm);
  font-family: var(--font-heading);
}

.history-page__empty-state p {
  color: var(--accent-3-color);
  max-width: 400px;
  margin: 0 auto;
  line-height: 1.6;
}

/* ===== No Results ===== */
.history-page__no-results {
  text-align: center;
  padding: var(--spacing-3xl) var(--spacing-lg);
  color: var(--accent-3-color);
}

.history-page__no-results svg {
  margin-bottom: var(--spacing-md);
  color: var(--accent-2-color);
}

.history-page__no-results p {
  color: var(--dark-color);
}

/* ===== Search Results ===== */
.history-page__search-results {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
  margin-bottom: var(--spacing-3xl);
}

.history-page__result-card {
  background-color: var(--light-color);
  border: 1px solid var(--accent-2-color);
  border-radius: 12px;
  padding: var(--spacing-lg);
  transition: transform var(--transition-fast),
    box-shadow var(--transition-fast), border-color var(--transition-fast);
  animation: fadeInUp var(--transition-normal) var(--ease-out);
}

.history-page__result-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: var(--primary-color);
}

.history-page__card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.history-page__card-meta {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.history-page__card-type {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: var(--fs-small-text);
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.type--event {
  background-color: rgba(13, 110, 253, 0.1);
  color: var(--primary-color);
}

.type--person {
  background-color: rgba(111, 66, 193, 0.1);
  color: #6f42c1;
}

.type--place {
  background-color: rgba(32, 201, 151, 0.1);
  color: #20c997;
}

.type--cultural {
  background-color: rgba(253, 126, 20, 0.1);
  color: #fd7e14;
}

.history-page__card-date {
  font-size: var(--fs-small-text);
  color: var(--accent-3-color);
  font-weight: var(--fw-medium);
  font-family: var(--font-body);
}

.history-page__card-status {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: var(--fw-semibold);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status--verified {
  background-color: rgba(25, 135, 84, 0.1);
  color: #198754;
}

.status--documented {
  background-color: rgba(13, 110, 253, 0.1);
  color: var(--primary-color);
}

.status--archived {
  background-color: rgba(108, 117, 125, 0.1);
  color: #6c757d;
}

.history-page__card-title {
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  color: var(--dark-color);
  margin-bottom: var(--spacing-sm);
  line-height: 1.3;
}

.history-page__card-description {
  font-family: var(--font-body);
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: var(--spacing-md);
}

.history-page__card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
}

.history-page__card-tag {
  display: inline-block;
  padding: 4px 10px;
  background-color: var(--accent-2-color);
  color: var(--accent-3-color);
  border-radius: 6px;
  font-size: var(--fs-small-text);
  font-weight: var(--fw-medium);
  font-family: var(--font-body);
}

/* ===== Gallery Section ===== */
.history-page__gallery {
  margin-top: var(--spacing-3xl);
  padding-top: var(--spacing-2xl);
  border-top: 2px solid var(--accent-2-color);
}

.history-page__section-title {
  font-family: var(--font-heading);
  font-weight: var(--fw-bold);
  color: var(--dark-color);
  margin-bottom: var(--spacing-md);
}

.history-page__gallery-description {
  color: var(--text-color);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.history-page__gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.history-page__gallery-item {
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.history-page__gallery-item:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.history-page__gallery-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-2-color) 0%, #e5e7eb 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  color: var(--accent-3-color);
  border: 2px dashed #d1d5db;
  border-radius: 12px;
}

.history-page__gallery-placeholder svg {
  opacity: 0.5;
}

.history-page__gallery-placeholder span {
  font-size: var(--fs-small-text);
  font-weight: var(--fw-medium);
}

/* ===== References Section ===== */
.history-page__references {
  margin-top: var(--spacing-3xl);
  padding-top: var(--spacing-2xl);
  border-top: 2px solid var(--accent-2-color);
}

.history-page__references-intro {
  color: var(--text-color);
  margin-bottom: var(--spacing-xl);
  line-height: 1.6;
}

.history-page__references-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.history-page__reference-item {
  animation: fadeInUp var(--transition-normal) var(--ease-out);
}

.history-page__reference-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-lg);
  background-color: var(--light-color);
  border: 1px solid var(--accent-2-color);
  border-radius: 12px;
  text-decoration: none;
  transition: transform var(--transition-fast),
    box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.history-page__reference-link:hover {
  transform: translateX(4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: var(--primary-color);
}

.history-page__reference-link:hover .history-page__reference-icon {
  transform: translate(2px, -2px);
  color: var(--primary-color);
}

.history-page__reference-content {
  flex: 1;
}

.history-page__reference-title {
  font-family: var(--font-heading);
  color: var(--dark-color);
  margin-bottom: var(--spacing-xs);
}

.history-page__reference-description {
  color: var(--text-color);
  line-height: 1.5;
  margin-bottom: var(--spacing-xs);
}

.history-page__reference-source {
  color: var(--accent-3-color);
  font-style: italic;
}

.history-page__reference-icon {
  flex-shrink: 0;
  color: var(--accent-3-color);
  transition: transform var(--transition-fast), color var(--transition-fast);
}

/* ===== Responsive Design ===== */
@media (max-width: 1024px) {
  .history-page__hero-content {
    grid-template-columns: 250px 1fr;
    gap: var(--spacing-2xl);
  }

  .history-page__hero-image-container {
    height: 350px;
  }

  .history-page__featured-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .history-page__featured-card--large {
    grid-column: span 1;
    grid-row: span 1;
  }

  .history-page__featured-card--large .history-page__featured-image {
    height: 200px;
    min-height: 200px;
  }
}

@media (max-width: 768px) {
  .history-page__hero-section {
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  .history-page__hero-content {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .history-page__hero-image-container {
    height: 250px;
  }

  .history-page__hero-title {
    font-size: var(--fs-heading-4);
  }

  .history-page__featured-section {
    padding: var(--spacing-2xl) var(--spacing-md);
  }

  .history-page__container {
    padding: 0 var(--spacing-md);
  }

  .history-page__search-section {
    margin-bottom: var(--spacing-2xl);
  }

  .history-page__featured-grid {
    grid-template-columns: 1fr;
  }

  .history-page__gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .history-page__result-card {
    padding: var(--spacing-md);
  }

  .history-page__reference-link {
    flex-direction: column;
    align-items: flex-start;
  }

  .history-page__reference-icon {
    align-self: flex-end;
  }

  .history-page__modal {
    padding: var(--spacing-md);
  }

  .history-page__modal-image {
    height: 200px;
  }

  .history-page__modal-body {
    padding: var(--spacing-lg);
  }
}

@media (max-width: 480px) {
  .history-page__hero-section {
    padding: var(--spacing-xl) var(--spacing-sm);
  }

  .history-page__hero-image-container {
    height: 200px;
  }

  .history-page__hero-title {
    font-size: var(--fs-heading-5);
  }

  .history-page__hero-description {
    font-size: var(--fs-small-text);
  }

  .history-page__featured-section {
    padding: var(--spacing-xl) var(--spacing-sm);
  }

  .history-page__container {
    padding: 0 var(--spacing-sm);
  }

  .history-page__search-input {
    padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm)
      var(--spacing-2xl);
    font-size: var(--fs-small-text);
  }

  .history-page__search-icon {
    left: var(--spacing-sm);
    width: 18px;
    height: 18px;
  }

  .history-page__gallery-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }

  .history-page__gallery-item {
    aspect-ratio: 16/9;
  }

  .history-page__card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .history-page__empty-state,
  .history-page__no-results {
    padding: var(--spacing-2xl) var(--spacing-sm);
  }

  .history-page__modal {
    padding: var(--spacing-sm);
  }

  .history-page__modal-content {
    max-height: 95vh;
  }

  .history-page__modal-image {
    height: 180px;
  }

  .history-page__modal-body {
    padding: var(--spacing-md);
  }

  .history-page__modal-close {
    width: 36px;
    height: 36px;
  }
}
</style>
