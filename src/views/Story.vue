<template>
  <div class="storypage-container">
    <!-- Hero Banner -->
    <div class="hero-banner">
      <img
        src="../assets/images/cavite_historical_site_bg.jpg"
        alt="Cavite Historical Site"
      />
    </div>

    <!-- Main Content -->
    <div class="content-container">
      <main class="main-content">
        <div v-if="storypageContents.length === 0" class="loading">
          <p>Loading content...</p>
        </div>

        <div v-else>
          <!-- Render each section -->
          <section
            v-for="(content, index) in storypageContents"
            :key="content.id"
            class="content-section"
            :class="{ 'highlight-section': index === 0 }"
            :id="`section-${content.id}`"
          >
            <h2 class="section-title">{{ content.headingTitle }}</h2>
            <div class="section-content" v-html="content.headingContent"></div>

            <!-- Render sub-headers if they exist -->
            <div
              v-if="content.subHeaders && content.subHeaders.length > 0"
              class="sub-sections"
            >
              <div
                v-for="subHeader in content.subHeaders"
                :key="subHeader.id"
                class="sub-section"
                :id="`subsection-${subHeader.id}`"
              >
                <h3 class="sub-section-title">
                  {{ subHeader.subHeadingTitle }}
                </h3>
                <div
                  class="sub-section-content"
                  v-html="subHeader.subHeadingContent"
                ></div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <!-- Navigation Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-item">
          <h3>Contents</h3>
          <nav class="section-nav">
            <ul>
              <li v-for="content in storypageContents" :key="content.id">
                <a
                  :href="`#section-${content.id}`"
                  class="nav-link"
                  @click="scrollToElement(`section-${content.id}`)"
                >
                  {{ content.headingTitle }}
                </a>
                <!-- Sub-section links if they exist -->
                <ul
                  v-if="content.subHeaders && content.subHeaders.length > 0"
                  class="subnav-list"
                >
                  <li
                    v-for="subHeader in content.subHeaders"
                    :key="subHeader.id"
                  >
                    <a
                      :href="`#subsection-${subHeader.id}`"
                      class="subnav-link"
                      @click="scrollToElement(`subsection-${subHeader.id}`)"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RequestToGetStorypageContents } from "../composables/API/Storypage";
import { type StorypageContent } from "../composables/interfaces/Component";

const storypageContents = ref<StorypageContent[]>([]);

onMounted(async () => {
  try {
    const response = await RequestToGetStorypageContents();
    storypageContents.value = response.data || [];

    if (storypageContents.value.length > 0) {
      storypageContents.value.sort(
        (a, b) => (a.sectionOrder ?? 0) - (b.sectionOrder ?? 0)
      );
    }
  } catch (error) {
    console.error("Error fetching story page contents:", error);
  }
});

// Function to improve scrolling behavior
const scrollToElement = (elementId: string) => {
  event?.preventDefault();

  const element = document.getElementById(elementId);

  if (element) {
    const offset = 120;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
</script>

<style scoped>
@import "../styles/variables.css";

.storypage-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  color: var(--dark-color);
  font-size: var(--fs-body-text);
  font-weight: var(--fw-normal);
  background-color: var(--white-color);
}

/* Hero Banner */
.hero-banner {
  width: 100%;
  height: 300px;
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;
}

.hero-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Content Layout */
.content-container {
  display: flex;
  flex-direction: row;
  gap: 2rem;
  padding: 0 1rem;
}

.main-content {
  flex: 1;
  max-width: 800px;
}

.sidebar {
  width: 300px;
  padding-left: 1rem;
  border-left: 1px solid var(--accent-3-color);
  position: sticky;
  top: 20px;
  align-self: flex-start;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

/* Section Styling */
.content-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--accent-2-color);
  /* Increased scroll margin to better position headings when scrolling */
  scroll-margin-top: 80px;
  padding-top: 10px;
}

.content-section:last-child {
  border-bottom: none;
}

.content-section::before {
  content: "";
  display: block;
  height: 80px;
  margin-top: -80px;
  visibility: hidden;
  pointer-events: none;
}

.highlight-section .section-content {
  color: var(--primary-color);
  font-weight: var(--fw-semibold);
}

.section-title {
  font-size: var(--fs-heading-5);
  color: var(--dark-color);
  font-weight: var(--fw-bold);
  margin-bottom: 1rem;
}

.section-content {
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

/* Sub-section Styling */
.sub-sections {
  margin-top: 1.5rem;
  padding-left: 1rem;
  border-left: 3px solid var(--accent-1-color);
}

.sub-section {
  margin-bottom: 1.5rem;
  /* Increased scroll margin to better position subheadings when scrolling */
  scroll-margin-top: 80px;
  padding-top: 10px;
}

.sub-section::before {
  content: "";
  display: block;
  height: 80px;
  margin-top: -80px;
  visibility: hidden;
  pointer-events: none;
}

.sub-section-title {
  font-size: var(--fs-heading-6);
  color: var(--dark-color);
  font-weight: var(--fw-semibold);
  margin-bottom: 0.5rem;
}

.sub-section-content {
  line-height: 1.5;
}

/* Navigation Sidebar Styling */
.sidebar-item {
  background-color: var(--accent-2-color);
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
}

.sidebar-item h3 {
  font-size: var(--fs-heading-6);
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-weight: var(--fw-bold);
  border-bottom: 1px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.section-nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.section-nav > ul > li {
  margin-bottom: 0.75rem;
}

.nav-link {
  color: var(--dark-color);
  text-decoration: none;
  font-weight: var(--fw-semibold);
  display: block;
  padding: 0.25rem 0;
  transition: all 0.2s ease;
  border-left: 2px solid transparent;
  padding-left: 0.5rem;
}

.nav-link:hover,
.nav-link:focus {
  color: var(--primary-color);
  border-left: 2px solid var(--primary-color);
  background-color: rgba(142, 125, 107, 0.1);
}

.nav-link.active {
  color: var(--primary-color);
  border-left: 2px solid var(--primary-color);
  background-color: rgba(142, 125, 107, 0.1);
}

.subnav-list {
  padding-left: 1rem !important;
  margin-top: 0.5rem !important;
  border-left: 1px solid var(--accent-3-color);
}

.subnav-list li {
  margin-bottom: 0.25rem;
}

.subnav-link {
  color: var(--dark-color);
  font-size: var(--fs-small-text);
  text-decoration: none;
  display: block;
  padding: 0.2rem 0.5rem;
  transition: all 0.2s ease;
}

.subnav-link:hover,
.subnav-link:focus {
  color: var(--primary-color);
  text-decoration: underline;
}

.subnav-link.active {
  color: var(--primary-color);
  font-weight: var(--fw-semibold);
}

/* Loading State */
.loading {
  text-align: center;
  padding: 2rem;
  color: var(--accent-3-color);
}

/* Responsive Layout */
@media screen and (max-width: 900px) {
  .content-container {
    flex-direction: column-reverse;
  }

  .sidebar {
    width: 100%;
    border-left: none;
    border-bottom: 1px solid var(--accent-3-color);
    padding: 0 0 1rem 0;
    margin-bottom: 1rem;
    position: relative;
    top: 0;
    max-height: none;
    overflow-y: visible;
  }

  .section-nav > ul {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .section-nav > ul > li {
    margin-bottom: 0;
    flex: 1 1 45%;
  }

  .subnav-list {
    display: none;
  }

  .nav-link:hover + .subnav-list,
  .nav-link:focus + .subnav-list,
  .subnav-list:hover {
    display: block;
  }

  .main-content {
    max-width: 100%;
  }

  .content-section::before,
  .sub-section::before {
    height: 60px;
    margin-top: -60px;
  }

  .content-section,
  .sub-section {
    scroll-margin-top: 60px;
  }
}

@media screen and (max-width: 768px) {
  .hero-banner {
    height: 200px;
  }

  .section-title {
    font-size: var(--fs-heading-4);
  }

  .sidebar-item {
    padding: 0.75rem;
  }

  .section-nav > ul > li {
    flex: 1 1 100%;
  }
}

@media screen and (max-width: 480px) {
  .hero-banner {
    height: 150px;
  }

  .section-title {
    font-size: var(--fs-heading-5);
  }

  .section-content,
  .sub-section-content {
    font-size: var(--fs-small-text);
  }

  .storypage-container {
    padding: 0 0.5rem;
  }

  .content-container {
    padding: 0;
  }

  .sidebar-item h3 {
    font-size: var(--fs-small-text);
  }

  .nav-link {
    font-size: var(--fs-small-text);
  }

  .subnav-link {
    font-size: var(--fs-xsmall-text);
  }
}
</style>
