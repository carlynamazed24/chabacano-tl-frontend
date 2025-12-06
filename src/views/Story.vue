<template>
  <div class="story-page fade-in">
    <!-- Hero Banner -->
    <div class="story-page__hero">
      <img
        src="../assets/images/cavite_historical_site_bg.png"
        alt="Cavite Historical Site"
        loading="lazy"
        class="story-page__hero-image"
      />
      <div class="story-page__hero-overlay">
        <h1 class="story-page__hero-title fs-heading-3 text-light slide-up">
          Chabacano Stories
        </h1>
      </div>
    </div>

    <!-- Main Content -->
    <div class="story-page__container">
      <!-- Navigation Sidebar -->
      <aside
        class="story-page__sidebar slide-in-left"
        :class="{ 'story-page__sidebar--sticky': isScrolled }"
      >
        <div class="story-page__sidebar-content">
          <h2 class="story-page__sidebar-title">Contents</h2>
          <nav class="story-page__nav" aria-label="Table of contents">
            <ul class="story-page__nav-list">
              <li
                v-for="(content, index) in storypageContents"
                :key="content.id"
                class="story-page__nav-item"
                :class="{
                  'story-page__nav-item--active':
                    activeSection === `section-${content.id}`,
                }"
              >
                <a
                  :href="`#section-${content.id}`"
                  class="story-page__nav-link"
                  :class="{
                    'story-page__nav-link--active':
                      activeSection === `section-${content.id}`,
                  }"
                  @click.prevent="scrollToElement(`section-${content.id}`)"
                >
                  <span class="story-page__nav-number">{{ index + 1 }}</span>
                  <span class="story-page__nav-text">{{
                    content.headingTitle
                  }}</span>
                </a>

                <!-- Sub-section links if they exist -->
                <ul
                  v-if="content.subHeaders && content.subHeaders.length > 0"
                  class="story-page__subnav-list"
                >
                  <li
                    v-for="subHeader in content.subHeaders"
                    :key="subHeader.id"
                    class="story-page__subnav-item"
                    :class="{
                      'story-page__subnav-item--active':
                        activeSection === `subsection-${subHeader.id}`,
                    }"
                  >
                    <a
                      :href="`#subsection-${subHeader.id}`"
                      class="story-page__subnav-link"
                      :class="{
                        'story-page__subnav-link--active':
                          activeSection === `subsection-${subHeader.id}`,
                      }"
                      @click.prevent="
                        scrollToElement(`subsection-${subHeader.id}`)
                      "
                    >
                      {{ subHeader.subHeadingTitle }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>

      <main class="story-page__main slide-in-right">
        <!-- Loading State -->
        <div v-if="storypageContents.length === 0" class="story-page__loading">
          <div class="loading-spinner"></div>
          <p>Loading story content...</p>
        </div>

        <!-- Content Sections -->
        <div v-else class="story-page__content">
          <!-- Render each section -->
          <section
            v-for="(content, index) in storypageContents"
            :key="content.id"
            class="story-page__section"
            :class="{
              'story-page__section--highlight': index === 0,
              'story-page__section--active':
                activeSection === `section-${content.id}`,
            }"
            :id="`section-${content.id}`"
            :ref="el => { if(el) sectionRefs[`section-${content.id}`] = el as HTMLElement }"
          >
            <h2 class="story-page__section-title">
              {{ content.headingTitle }}
            </h2>
            <div
              class="story-page__section-content"
              v-html="content.headingContent"
            ></div>

            <!-- Render sub-headers if they exist -->
            <div
              v-if="content.subHeaders && content.subHeaders.length > 0"
              class="story-page__subsections"
            >
              <div
                v-for="subHeader in content.subHeaders"
                :key="subHeader.id"
                class="story-page__subsection"
                :class="{
                  'story-page__subsection--active':
                    activeSection === `subsection-${subHeader.id}`,
                }"
                :id="`subsection-${subHeader.id}`"
                :ref="el => { if(el) sectionRefs[`subsection-${subHeader.id}`] = el as HTMLElement }"
              >
                <h3 class="story-page__subsection-title">
                  {{ subHeader.subHeadingTitle }}
                </h3>
                <div
                  class="story-page__subsection-content"
                  v-html="subHeader.subHeadingContent"
                ></div>
              </div>
            </div>
          </section>
        </div>

        <!-- Activities in Cavite Section -->
        <section class="story-page__activities" id="activities-section">
          <h2 class="story-page__section-title">Things to Do in Cavite</h2>
          <p class="story-page__activities-description">
            Discover the best activities and attractions in Cavite, the historic
            province where Chabacano culture thrives.
          </p>
          <div class="story-page__activities-grid">
            <div
              class="story-page__activity-card"
              v-for="activity in caviteActivities"
              :key="activity.id"
            >
              <div class="story-page__activity-image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
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
              </div>
              <div class="story-page__activity-content">
                <span class="story-page__activity-category">{{
                  activity.category
                }}</span>
                <h3 class="story-page__activity-title">{{ activity.title }}</h3>
                <p class="story-page__activity-description">
                  {{ activity.description }}
                </p>
                <span class="story-page__activity-location">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ activity.location }}
                </span>
              </div>
            </div>
          </div>
        </section>

        <!-- References & Sources Section -->
        <section class="story-page__references" id="references-section">
          <h2 class="story-page__section-title">References & Sources</h2>
          <p class="story-page__references-description">
            Learn more about Cavite and Chabacano from these trusted sources.
          </p>
          <div class="story-page__references-list">
            <a
              v-for="source in referenceSources"
              :key="source.id"
              :href="source.url"
              target="_blank"
              rel="noopener noreferrer"
              class="story-page__reference-card"
            >
              <div class="story-page__reference-icon">
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
                  <path
                    d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                  />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </div>
              <div class="story-page__reference-content">
                <h4 class="story-page__reference-title">{{ source.title }}</h4>
                <p class="story-page__reference-description">
                  {{ source.description }}
                </p>
                <span class="story-page__reference-url">{{
                  source.displayUrl
                }}</span>
              </div>
            </a>
          </div>
        </section>
      </main>
    </div>

    <!-- Mobile Navigation Toggle -->
    <button
      class="story-page__mobile-nav-toggle"
      :class="{ 'story-page__mobile-nav-toggle--active': mobileNavOpen }"
      @click="toggleMobileNav"
      aria-label="Toggle table of contents"
      :aria-expanded="mobileNavOpen"
    >
      <span class="story-page__mobile-nav-icon"></span>
      <span class="story-page__mobile-nav-label">Contents</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { RequestToGetStorypageContents } from "../composables/API/Storypage";
import { type StorypageContent } from "../composables/interfaces/Component";

// State variables
const storypageContents = ref<StorypageContent[]>([]);
const isScrolled = ref(false);
const activeSection = ref("");
const mobileNavOpen = ref(false);
const sectionRefs = ref<Record<string, HTMLElement>>({});

// Cavite Activities Data
const caviteActivities = ref([
  {
    id: 1,
    category: "Historical Site",
    title: "Aguinaldo Shrine",
    description:
      "The historic residence of General Emilio Aguinaldo where Philippine independence was declared.",
    location: "Kawit, Cavite",
  },
  {
    id: 2,
    category: "Nature & Adventure",
    title: "People's Park in the Sky",
    description:
      "A mountaintop park offering panoramic views of Tagaytay and Taal Lake.",
    location: "Tagaytay City",
  },
  {
    id: 3,
    category: "Cultural Heritage",
    title: "Baldomero Aguinaldo Shrine",
    description:
      "Museum dedicated to the revolutionary leader and cousin of Gen. Emilio Aguinaldo.",
    location: "Kawit, Cavite",
  },
  {
    id: 4,
    category: "Religious Site",
    title: "Immaculate Conception Cathedral",
    description:
      "A historic church built during the Spanish colonial era, showcasing baroque architecture.",
    location: "Imus, Cavite",
  },
  {
    id: 5,
    category: "Nature & Scenery",
    title: "Taal Vista & Lake",
    description:
      "Breathtaking views of the world's smallest active volcano within a lake.",
    location: "Tagaytay City",
  },
  {
    id: 6,
    category: "Museum",
    title: "Museo De La Salle",
    description:
      "Features artifacts and exhibits about Philippine history and natural science.",
    location: "Dasmariñas, Cavite",
  },
]);

// Reference Sources Data
const referenceSources = ref([
  {
    id: 1,
    title: "Ternate, Cavite - Wikipedia",
    description:
      "Comprehensive encyclopedia article covering the history, geography, demographics, and culture of Ternate municipality in Cavite province.",
    url: "https://en.wikipedia.org/wiki/Ternate,_Cavite",
    displayUrl: "en.wikipedia.org",
  },
  {
    id: 2,
    title: "Chabacano Language and Heritage",
    description:
      "Information about the Chavacano/Chabacano Spanish-based creole languages of the Philippines, including the Ternateño variant.",
    url: "https://en.wikipedia.org/wiki/Chabacano",
    displayUrl: "en.wikipedia.org",
  },
  {
    id: 3,
    title: "Spanish in the Pacific (PDF)",
    description:
      "Academic paper by John M. Lipski discussing Spanish language influences in the Pacific, including the Ternate settlement and Chabacano development.",
    url: "https://johnlipski.github.io/pacific.pdf",
    displayUrl: "johnlipski.github.io",
  },
  {
    id: 4,
    title: "Municipality of Ternate Official Website",
    description:
      "Official local government website with current information about Ternate's governance, services, and community programs.",
    url: "https://lgu201.dilg.gov.ph/view.php?r=04&p=21&m=21",
    displayUrl: "dilg.gov.ph",
  },
  {
    id: 5,
    title: "National Historical Commission of the Philippines",
    description:
      "Official government resource for Philippine historical landmarks, heritage sites, and cultural preservation.",
    url: "https://nhcp.gov.ph/",
    displayUrl: "nhcp.gov.ph",
  },
  {
    id: 6,
    title: "Cavite Provincial Government",
    description:
      "Official portal with information about Cavite's history, culture, tourism, and local government services.",
    url: "https://cavite.gov.ph/",
    displayUrl: "cavite.gov.ph",
  },
]);

// Fetch story content
onMounted(async () => {
  try {
    const response = await RequestToGetStorypageContents();
    storypageContents.value = response.data || [];

    if (storypageContents.value.length > 0) {
      storypageContents.value.sort(
        (a, b) => (a.sectionOrder ?? 0) - (b.sectionOrder ?? 0)
      );

      // Initialize active section after DOM update
      setTimeout(() => {
        updateActiveSection();
        setupIntersectionObserver();
      }, 100);
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
  } catch (error) {
    console.error("Error fetching story page contents:", error);
  }
});

onUnmounted(() => {
  // Clean up event listeners
  window.removeEventListener("scroll", handleScroll);

  // Clean up intersection observer
  if (observer) {
    observer.disconnect();
  }
});

// Handle scroll event to update UI based on scroll position
const handleScroll = () => {
  // Update sticky header state
  isScrolled.value = window.scrollY > 100;

  // Update active section based on scroll position
  updateActiveSection();
};

// Track which section is currently in view using Intersection Observer
let observer: IntersectionObserver | null = null;

const setupIntersectionObserver = () => {
  const options = {
    root: null,
    rootMargin: "-100px 0px -70% 0px",
    threshold: 0,
  };

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activeSection.value = entry.target.id;
      }
    });
  }, options);

  // Observe all sections and subsections
  Object.values(sectionRefs.value).forEach((el) => {
    if (el) observer?.observe(el);
  });
};

// Update active section based on scroll position as a fallback
const updateActiveSection = () => {
  if (Object.keys(sectionRefs.value).length === 0) return;

  // Find the section closest to the top of the viewport
  const scrollPosition = window.scrollY + 150; // Offset for header

  let currentSection = "";
  let minDistance = Infinity;

  Object.entries(sectionRefs.value).forEach(([id, element]) => {
    const distance = Math.abs(
      element.getBoundingClientRect().top + window.scrollY - scrollPosition
    );
    if (distance < minDistance) {
      minDistance = distance;
      currentSection = id;
    }
  });

  if (currentSection && currentSection !== activeSection.value) {
    activeSection.value = currentSection;
  }
};

// Improved scrolling function
const scrollToElement = (elementId: string) => {
  const element = document.getElementById(elementId);

  if (element) {
    // Close mobile nav if open
    if (mobileNavOpen.value) {
      mobileNavOpen.value = false;
    }

    const offset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    // Update active section
    setTimeout(() => {
      activeSection.value = elementId;
    }, 100);
  }
};

// Toggle mobile navigation
const toggleMobileNav = () => {
  mobileNavOpen.value = !mobileNavOpen.value;

  // Add body class to prevent scrolling when nav is open
  if (mobileNavOpen.value) {
    document.body.classList.add("nav-open");
  } else {
    document.body.classList.remove("nav-open");
  }
};
</script>

<style scoped>
@import "../styles/tokens/colors.css";
@import "../styles/tokens/typography.css";
@import "../styles/tokens/spacing.css";
@import "../styles/tokens/animations.css";
@import "../styles/tokens/breakpoints.css";

/* Base Layout */
.story-page {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--dark-color);
  font-family: "Inter", sans-serif;
  font-size: var(--fs-body-text);
  font-weight: var(--fw-normal);
  background-color: var(--white-color);
  padding-bottom: var(--space-3xl);
}

/* Hero Banner */
.story-page__hero {
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: var(--space-xl);
  position: relative;
  border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
  box-shadow: var(--shadow-md);
}

.story-page__hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform var(--transition-slow);
}

.story-page__hero:hover .story-page__hero-image {
  transform: scale(1.05);
}

.story-page__hero-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  padding: var(--space-xl) var(--space-lg) var(--space-lg);
  display: flex;
  align-items: flex-end;
}

.story-page__hero-title {
  color: var(--light-color);
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

/* Content Layout */
.story-page__container {
  display: flex;
  flex-direction: row-reverse;
  gap: 2rem;
  padding: 0 1rem;
  position: relative;
}

/* Main Content Area */
.story-page__main {
  flex: 1;
  max-width: 800px;
  animation: fadeIn var(--transition-normal) ease-out;
}

.story-page__content {
  margin-bottom: 2rem;
}

/* Loading State Styles */
.story-page__loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: var(--accent-3-color);
  height: 300px;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(13, 148, 136, 0.3);
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  margin-bottom: 1rem;
  animation: spin 1s linear infinite;
}

/* Sidebar Navigation */
.story-page__sidebar {
  width: 300px;
  position: sticky;
  top: 1.5rem;
  align-self: flex-start;
  max-height: calc(100vh - 3rem);
  overflow-y: auto;
  border-radius: 0.5rem;
  scrollbar-width: thin;
  transition: all var(--transition-fast);
}

.story-page__sidebar--sticky {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.story-page__sidebar-content {
  background-color: var(--accent-2-color);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--accent-3-color);
}

.story-page__sidebar-title {
  font-size: var(--fs-heading-5);
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-weight: var(--fw-bold);
  border-bottom: 1px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

/* Content Sections Styling */
.story-page__section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--accent-2-color);
  scroll-margin-top: 80px;
  position: relative;
  transition: all var(--transition-normal);
}

.story-page__section:last-child {
  border-bottom: none;
  margin-bottom: 0;
}

.story-page__section--highlight {
  background-color: rgba(254, 243, 199, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  border-bottom: none;
}

.story-page__section--active {
  animation: pulseHighlight 2s ease-out;
}

.story-page__section-title {
  font-size: var(--fs-heading-4);
  color: var(--dark-color);
  font-weight: var(--fw-bold);
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.story-page__section-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--primary-color);
  transition: width var(--transition-normal);
}

.story-page__section:hover .story-page__section-title::after {
  width: 80px;
}

.story-page__section-content {
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: var(--dark-color);
}

/* Sub-section Styling */
.story-page__subsections {
  margin-top: 1.5rem;
  padding-left: 1rem;
  border-left: 3px solid var(--accent-1-color);
}

.story-page__subsection {
  margin-bottom: 1.5rem;
  scroll-margin-top: 80px;
  transition: all var(--transition-normal);
}

.story-page__subsection--active {
  animation: pulseHighlight 2s ease-out;
}

.story-page__subsection-title {
  font-size: var(--fs-heading-6);
  color: var(--dark-color);
  font-weight: var(--fw-semibold);
  margin-bottom: 0.5rem;
}

.story-page__subsection-content {
  line-height: 1.6;
  color: var(--dark-color);
}

@keyframes pulseHighlight {
  0% {
    background-color: transparent;
  }
  30% {
    background-color: rgba(254, 243, 199, 0.5);
  }
  100% {
    background-color: transparent;
  }
}

/* Navigation Styling */
.story-page__nav {
  margin-top: 1rem;
}

.story-page__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.story-page__nav-item {
  margin-bottom: 1rem;
  border-radius: 4px;
  transition: transform var(--transition-fast);
}

.story-page__nav-item--active {
  transform: translateX(3px);
}

.story-page__nav-link {
  color: var(--dark-color);
  text-decoration: none;
  font-weight: var(--fw-medium);
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all var(--transition-fast);
  border-left: 3px solid transparent;
  overflow: hidden;
}

.story-page__nav-link--active {
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  background-color: rgba(13, 148, 136, 0.1);
  font-weight: var(--fw-semibold);
}

.story-page__nav-link:hover,
.story-page__nav-link:focus {
  color: var(--primary-color);
  background-color: var(--accent-2-color);
  border-left-color: var(--primary-color);
}

.story-page__nav-number {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
  width: 24px;
  min-width: 24px;
  border-radius: 50%;
  background-color: var(--accent-2-color);
  color: var(--primary-color);
  margin-right: 0.5rem;
  font-size: var(--fs-small-text);
  font-weight: var(--fw-bold);
  transition: all var(--transition-fast);
}

.story-page__nav-link--active .story-page__nav-number,
.story-page__nav-link:hover .story-page__nav-number {
  background-color: var(--primary-color);
  color: var(--white-color);
}

.story-page__nav-text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Subnav Styling */
.story-page__subnav-list {
  padding-left: 2rem;
  margin-top: 0.5rem;
  list-style: none;
  border-left: 1px solid var(--accent-3-color);
}

.story-page__subnav-item {
  margin-bottom: 0.25rem;
  position: relative;
}

.story-page__subnav-item--active::before {
  content: "";
  position: absolute;
  left: -1px;
  top: 0;
  height: 100%;
  width: 1px;
  background-color: var(--primary-color);
}

.story-page__subnav-link {
  color: var(--dark-color);
  font-size: var(--fs-small-text);
  text-decoration: none;
  display: block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all var(--transition-fast);
  position: relative;
}

.story-page__subnav-link::before {
  content: "\2022";
  position: absolute;
  left: -0.5rem;
  color: var(--accent-3-color);
  opacity: 0.6;
}

.story-page__subnav-link:hover,
.story-page__subnav-link:focus {
  color: var(--primary-color);
  background-color: rgba(13, 148, 136, 0.05);
}

.story-page__subnav-link--active {
  color: var(--primary-color);
  font-weight: var(--fw-medium);
}

/* ===== Activities in Cavite Section ===== */
.story-page__activities {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--accent-2-color);
}

.story-page__activities-description {
  color: var(--dark-color);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.story-page__activities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.story-page__activity-card {
  background: var(--white-color);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--accent-2-color);
  transition: transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.story-page__activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.story-page__activity-image {
  height: 120px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--accent-1-color) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0.9;
}

.story-page__activity-content {
  padding: 1rem;
}

.story-page__activity-category {
  display: inline-block;
  background-color: var(--accent-2-color);
  color: var(--primary-color);
  font-size: 0.7rem;
  font-weight: var(--fw-semibold);
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.story-page__activity-title {
  font-size: var(--fs-body-text);
  font-weight: var(--fw-bold);
  color: var(--dark-color);
  margin: 0 0 0.5rem 0;
}

.story-page__activity-description {
  font-size: var(--fs-small-text);
  color: var(--accent-3-color);
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

.story-page__activity-location {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--secondary-color);
  font-weight: var(--fw-medium);
}

/* ===== References & Sources Section ===== */
.story-page__references {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--accent-2-color);
}

.story-page__references-description {
  color: var(--dark-color);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.story-page__references-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.story-page__reference-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  background: var(--white-color);
  border-radius: 0.75rem;
  border: 1px solid var(--accent-2-color);
  text-decoration: none;
  transition: all var(--transition-fast);
}

.story-page__reference-card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 4px 15px rgba(13, 148, 136, 0.1);
  transform: translateX(4px);
}

.story-page__reference-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, var(--accent-2-color) 0%, #e5e7eb 100%);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
}

.story-page__reference-content {
  flex: 1;
  min-width: 0;
}

.story-page__reference-title {
  font-size: var(--fs-body-text);
  font-weight: var(--fw-semibold);
  color: var(--dark-color);
  margin: 0 0 0.25rem 0;
}

.story-page__reference-description {
  font-size: var(--fs-small-text);
  color: var(--accent-3-color);
  line-height: 1.5;
  margin: 0 0 0.5rem 0;
}

.story-page__reference-url {
  font-size: 0.75rem;
  color: var(--primary-color);
  font-weight: var(--fw-medium);
}

/* Mobile Navigation Toggle Button */
.story-page__mobile-nav-toggle {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  background-color: var(--primary-color);
  color: var(--light-color);
  border: none;
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 100;
  transition: all var(--transition-fast);
  opacity: 0;
  transform: translateY(100px);
  animation: slideUpFade 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.5s;
}

.story-page__mobile-nav-toggle:hover,
.story-page__mobile-nav-toggle:focus {
  background-color: var(--secondary-color);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.story-page__mobile-nav-toggle--active {
  background-color: var(--dark-color);
}

.story-page__mobile-nav-icon {
  position: relative;
  width: 20px;
  height: 2px;
}

.story-page__mobile-nav-icon::before,
.story-page__mobile-nav-icon::after {
  content: "";
  position: absolute;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  transition: all var(--transition-fast);
}

.story-page__mobile-nav-icon::before {
  top: -6px;
}

.story-page__mobile-nav-icon::after {
  bottom: -6px;
}

.story-page__mobile-nav-toggle--active .story-page__mobile-nav-icon::before {
  top: 0;
  transform: rotate(45deg);
}

.story-page__mobile-nav-toggle--active .story-page__mobile-nav-icon::after {
  bottom: 0;
  transform: rotate(-45deg);
}

.story-page__mobile-nav-toggle--active .story-page__mobile-nav-icon {
  background-color: transparent;
}

.story-page__mobile-nav-label {
  font-size: var(--fs-small-text);
  font-weight: var(--fw-medium);
}

@media (min-width: 769px) {
  .story-page__mobile-nav-toggle {
    display: none;
  }
}

/* Animation Keyframes */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUpFade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Responsive Layout */
@media (max-width: 1024px) {
  .story-page__container {
    gap: 1.5rem;
  }

  .story-page__sidebar {
    width: 250px;
  }
}

@media (max-width: 900px) {
  .story-page__hero {
    height: 300px;
    margin-bottom: 1.5rem;
  }

  .story-page__container {
    flex-direction: column;
    gap: 2rem;
  }

  .story-page__sidebar {
    width: 100%;
    max-height: none;
    position: relative;
    top: 0;
    order: 1;
  }

  .story-page__sidebar--sticky {
    box-shadow: none;
  }

  .story-page__nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .story-page__nav-item {
    margin-bottom: 0.5rem;
    flex: 1 1 calc(50% - 0.5rem);
  }

  .story-page__main {
    order: 2;
  }

  .story-page__subnav-list {
    display: none;
  }

  .story-page__nav-item--active .story-page__subnav-list {
    display: block;
  }
}

@media (max-width: 768px) {
  .story-page {
    padding-bottom: 6rem;
  }

  .story-page__hero {
    height: 240px;
    border-radius: 0;
  }

  .story-page__hero-title {
    font-size: var(--fs-heading-4);
  }

  .story-page__section-title {
    font-size: var(--fs-heading-5);
  }

  .story-page__section-content,
  .story-page__subsection-content {
    font-size: var(--fs-small-text);
  }

  .story-page__section {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }

  .story-page__nav-item {
    flex: 1 1 100%;
  }

  /* Activities responsive */
  .story-page__activities-grid {
    grid-template-columns: 1fr;
  }

  .story-page__activity-image {
    height: 100px;
  }

  .story-page__sidebar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: var(--overlay-color);
    padding: 1rem;
    overflow-y: auto;
  }

  .story-page__sidebar-content {
    max-height: 80vh;
    overflow-y: auto;
    margin-top: 15vh;
    animation: slideUpFade 0.3s ease-out;
  }

  /* Show sidebar when mobile nav is open */
  body.nav-open .story-page__sidebar {
    display: block;
  }
}

@media (max-width: 480px) {
  .story-page {
    padding: 0;
  }

  .story-page__container {
    padding: 0 0.5rem;
  }

  .story-page__hero {
    height: 180px;
    margin-bottom: 1rem;
  }

  .story-page__hero-overlay {
    padding: 1rem 0.5rem 0.5rem;
  }

  .story-page__hero-title {
    font-size: var(--fs-heading-5);
  }

  .story-page__section-title {
    font-size: var(--fs-heading-5);
  }

  .story-page__subsection-title {
    font-size: var(--fs-body-text);
  }

  .story-page__mobile-nav-toggle {
    bottom: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem 0.5rem;
  }

  /* Activities responsive - small screens */
  .story-page__activity-card {
    border-radius: 0.75rem;
  }

  .story-page__activity-content {
    padding: 0.75rem;
  }

  /* References responsive - small screens */
  .story-page__reference-card {
    padding: 1rem;
    gap: 0.75rem;
  }

  .story-page__reference-icon {
    width: 40px;
    height: 40px;
  }
}
</style>
