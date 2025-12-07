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
            Cavite Heritage
          </h2>
          <h1 class="history-page__hero-title">
            Discover the Rich Legacy of Cavite's Spanish Colonial History and
            Cultural Traditions
          </h1>
          <p class="history-page__hero-description fs-body-text">
            Journey through centuries of Philippine history in Cavite, from the
            Spanish colonial fortifications to vibrant festivals. Explore
            historic churches like San Roque, military landmarks such as Fort
            San Felipe, and cultural celebrations including the colorful Regada
            Festival that bring water, faith, and community together in unique
            Caviteño traditions.
          </p>
          <button class="history-page__hero-btn">Explore History</button>
        </div>
      </div>
    </section>

    <!-- Chabacano Stories Section with Sidebar Navigation -->
    <section class="history-page__stories-section">
      <div class="history-page__stories-container">
        <!-- Navigation Sidebar -->
        <aside
          class="history-page__sidebar slide-in-left"
          :class="{ 'history-page__sidebar--sticky': isScrolled }"
        >
          <div class="history-page__sidebar-content">
            <h2 class="history-page__sidebar-title">Contents</h2>
            <nav class="history-page__nav" aria-label="Table of contents">
              <ul class="history-page__nav-list">
                <li
                  v-for="(content, index) in storypageContents"
                  :key="content.id"
                  class="history-page__nav-item"
                  :class="{
                    'history-page__nav-item--active':
                      activeSection === `section-${content.id}`,
                  }"
                >
                  <a
                    :href="`#section-${content.id}`"
                    class="history-page__nav-link"
                    :class="{
                      'history-page__nav-link--active':
                        activeSection === `section-${content.id}`,
                    }"
                    @click.prevent="scrollToElement(`section-${content.id}`)"
                  >
                    <span class="history-page__nav-number">{{
                      index + 1
                    }}</span>
                    <span class="history-page__nav-text">{{
                      content.headingTitle
                    }}</span>
                  </a>

                  <!-- Sub-section links if they exist -->
                  <ul
                    v-if="content.subHeaders && content.subHeaders.length > 0"
                    class="history-page__subnav-list"
                  >
                    <li
                      v-for="subHeader in content.subHeaders"
                      :key="subHeader.id"
                      class="history-page__subnav-item"
                      :class="{
                        'history-page__subnav-item--active':
                          activeSection === `subsection-${subHeader.id}`,
                      }"
                    >
                      <a
                        :href="`#subsection-${subHeader.id}`"
                        class="history-page__subnav-link"
                        :class="{
                          'history-page__subnav-link--active':
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

        <main class="history-page__stories-main">
          <!-- Loading State -->
          <div
            v-if="storypageContents.length === 0 && !storiesError"
            class="history-page__loading"
          >
            <div class="loading-spinner"></div>
            <p>Loading content...</p>
          </div>

          <!-- Dynamic Content Sections from Story Page -->
          <div
            v-else-if="storypageContents.length > 0"
            class="history-page__story-content"
          >
            <section
              v-for="(content, index) in storypageContents"
              :key="content.id"
              class="history-page__story-section"
              :class="{
                'history-page__story-section--highlight': index === 0,
                'history-page__story-section--active':
                  activeSection === `section-${content.id}`,
              }"
              :id="`section-${content.id}`"
              :ref="el => { if(el) sectionRefs[`section-${content.id}`] = el as HTMLElement }"
            >
              <h2 class="history-page__story-section-title">
                {{ content.headingTitle }}
              </h2>
              <div
                class="history-page__story-section-content"
                v-html="content.headingContent"
              ></div>

              <!-- Render sub-headers if they exist -->
              <div
                v-if="content.subHeaders && content.subHeaders.length > 0"
                class="history-page__story-subsections"
              >
                <div
                  v-for="subHeader in content.subHeaders"
                  :key="subHeader.id"
                  class="history-page__story-subsection"
                  :class="{
                    'history-page__story-subsection--active':
                      activeSection === `subsection-${subHeader.id}`,
                  }"
                  :id="`subsection-${subHeader.id}`"
                  :ref="el => { if(el) sectionRefs[`subsection-${subHeader.id}`] = el as HTMLElement }"
                >
                  <h3 class="history-page__story-subsection-title">
                    {{ subHeader.subHeadingTitle }}
                  </h3>
                  <div
                    class="history-page__story-subsection-content"
                    v-html="subHeader.subHeadingContent"
                  ></div>
                </div>
              </div>
            </section>
          </div>

          <!-- Activities in Cavite Section -->
          <section class="history-page__activities" id="activities-section">
            <h2 class="history-page__section-title">Things to Do in Cavite</h2>
            <p class="history-page__activities-description fs-body-text">
              Discover the best activities and attractions in Cavite, the
              historic province where Chabacano culture thrives.
            </p>
            <div class="history-page__activities-grid">
              <div
                class="history-page__activity-card"
                v-for="activity in caviteActivities"
                :key="activity.id"
              >
                <div class="history-page__activity-content">
                  <span class="history-page__activity-category">{{
                    activity.category
                  }}</span>
                  <h3 class="history-page__activity-title">
                    {{ activity.title }}
                  </h3>
                  <p class="history-page__activity-description">
                    {{ activity.description }}
                  </p>
                  <span class="history-page__activity-location">
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
                      <path
                        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
                      />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {{ activity.location }}
                  </span>
                </div>
              </div>
            </div>
          </section>
        </main>

        <!-- Mobile Navigation Toggle -->
        <button
          class="history-page__mobile-nav-toggle"
          :class="{ 'history-page__mobile-nav-toggle--active': mobileNavOpen }"
          @click="toggleMobileNav"
          aria-label="Toggle table of contents"
          :aria-expanded="mobileNavOpen"
        >
          <span class="history-page__mobile-nav-icon"></span>
          <span class="history-page__mobile-nav-label">Contents</span>
        </button>
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
            @click="openModal(item)"
          >
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
            <div
              class="history-page__gallery-item"
              v-for="(image, index) in galleryImages"
              :key="index"
              @click="openGalleryModal(index)"
            >
              <img
                :src="image"
                :alt="`Historical image ${index + 1}`"
                class="history-page__gallery-image"
                loading="lazy"
              />
            </div>
          </div>

          <!-- Gallery Modal -->
          <div
            v-if="selectedGalleryIndex !== null"
            class="history-page__gallery-modal"
            @click="closeGalleryModal"
          >
            <button
              class="history-page__gallery-modal-close"
              @click="closeGalleryModal"
            >
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

            <div class="history-page__gallery-modal-content">
              <img
                :src="galleryImages[selectedGalleryIndex]"
                :alt="`Historical image ${selectedGalleryIndex + 1}`"
                class="history-page__gallery-modal-image"
                @click.stop
              />
            </div>

            <button
              class="history-page__gallery-modal-nav history-page__gallery-modal-nav--prev"
              @click.stop="prevGalleryImage"
              v-if="selectedGalleryIndex > 0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>

            <button
              class="history-page__gallery-modal-nav history-page__gallery-modal-nav--next"
              @click.stop="nextGalleryImage"
              v-if="selectedGalleryIndex < galleryImages.length - 1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>

            <div class="history-page__gallery-modal-counter">
              {{ selectedGalleryIndex + 1 }} / {{ galleryImages.length }}
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
import { ref, computed, onMounted, onUnmounted } from "vue";
import { RequestToGetStorypageContents } from "../composables/API/Storypage";
import { type StorypageContent } from "../composables/interfaces/Component";

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
  image?: string;
  fullDescription: string;
  details?: string[];
}

// Story page state variables
const storypageContents = ref<StorypageContent[]>([]);
const isScrolled = ref(false);
const activeSection = ref("");
const mobileNavOpen = ref(false);
const sectionRefs = ref<Record<string, HTMLElement>>({});
const storiesError = ref(false);

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

// Gallery Images from assets
const galleryImages = ref<string[]>([
  new URL("../assets/images/history_page/history_img_1.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_3.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_4.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_5.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_6.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_7.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_8.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_9.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_10.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_11.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_12.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_13.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_14.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_15.jpeg", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_16.png", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_17.png", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_18.png", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_19.png", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_20.png", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_21.png", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_22.png", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_23.png", import.meta.url)
    .href,
  new URL("../assets/images/history_page/history_img_24.png", import.meta.url)
    .href,
]);

const selectedGalleryIndex = ref<number | null>(null);

const openGalleryModal = (index: number) => {
  selectedGalleryIndex.value = index;
  document.body.style.overflow = "hidden";
};

const closeGalleryModal = () => {
  selectedGalleryIndex.value = null;
  document.body.style.overflow = "";
};

const prevGalleryImage = () => {
  if (selectedGalleryIndex.value !== null && selectedGalleryIndex.value > 0) {
    selectedGalleryIndex.value--;
  }
};

const nextGalleryImage = () => {
  if (
    selectedGalleryIndex.value !== null &&
    selectedGalleryIndex.value < galleryImages.value.length - 1
  ) {
    selectedGalleryIndex.value++;
  }
};

// Featured Posts - Cavite Historical Highlights
const featuredPosts = ref<FeaturedPost[]>([
  {
    id: 1,
    title: "San Roque Church (Cavite City)",
    excerpt:
      "A historic Spanish colonial church built in 1595, serving as the spiritual center of Cavite City and host to the annual Feast of San Roque every August 16.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "San Roque Church stands as one of the oldest and most significant religious landmarks in Cavite City, with its origins dating back to 1595 during the Spanish colonial period. Located in the heart of Cavite City, this historic church has witnessed centuries of Philippine history, from Spanish rule through the Philippine Revolution and into modern times. The church is dedicated to Saint Roch (San Roque), the patron saint of plague victims and dogs, and serves as the focal point for one of Cavite's most important religious celebrations. Every August 16, the church becomes the center of the Feast of San Roque, drawing devotees from across the province. The church's architecture reflects classic Spanish colonial religious design, with its enduring structure standing as a testament to the craftsmanship and faith of its builders. Today, San Roque Church continues to serve the Catholic community of Cavite City, maintaining its role as both a place of worship and a keeper of local heritage.",
    details: [
      "Built in 1595 during Spanish colonial era",
      "Located in Cavite City, one of the oldest cities in the Philippines",
      "Dedicated to Saint Roch (San Roque), patron saint of plague victims",
      "Annual Feast of San Roque celebrated every August 16",
      "Features Spanish colonial architectural elements",
      "Continues to serve as active parish church for local Catholic community",
    ],
  },
  {
    id: 2,
    title: "Fort San Felipe",
    excerpt:
      "A 16th-century Spanish fortress on Cavite Peninsula that defended Manila Bay and witnessed key moments in Philippine revolutionary history.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "Fort San Felipe is a historic Spanish military fortification constructed in the 16th century on the strategic Cavite Peninsula, positioned to guard the entrance to Manila Bay. This stone fortress played a crucial role in the defense of Spanish colonial interests, serving as a military garrison and naval base for centuries. The fort's strategic location on the peninsula made it a key defensive position, protecting both Manila and the important naval facilities in Cavite. Throughout its history, Fort San Felipe witnessed numerous significant events in Philippine history, including battles during the Philippine Revolution against Spain and later conflicts. The fort's thick stone walls and strategic design exemplify Spanish colonial military architecture adapted to tropical conditions. Today, Fort San Felipe stands as a national historical landmark, its weathered walls bearing silent witness to centuries of Philippine history. The site offers visitors a tangible connection to the Spanish colonial era and the struggles for Philippine independence, while also providing insights into military architecture and strategy of the period.",
    details: [
      "Constructed in the 16th century during Spanish colonial rule",
      "Located on Cavite Peninsula overlooking Manila Bay",
      "Served as military garrison and naval defense fortification",
      "Strategic position guarded entrance to Manila Bay",
      "Witnessed events during Philippine Revolution and independence struggles",
      "Features classic Spanish colonial military architecture with thick stone walls",
      "Now preserved as a national historical landmark",
    ],
  },
  {
    id: 3,
    title: "Regada Festival",
    excerpt:
      "Cavite City's vibrant water festival celebrated every June, featuring the Caracol ni San Juan Bautista procession, where devotees splash water as a blessing and celebration of faith.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "The Regada Festival is Cavite City's most colorful and unique cultural celebration, held annually in June to honor San Juan Bautista (Saint John the Baptist). The festival's name comes from the Spanish word 'regar' meaning 'to water' or 'to sprinkle,' reflecting its central theme of water as a symbol of baptism, blessing, and purification. The highlight of the festival is the Caracol ni San Juan Bautista, a religious procession featuring a street dance where participants and spectators joyfully splash water on each other, creating a festive atmosphere that combines deep religious devotion with community celebration. The water splashing tradition represents the baptism performed by Saint John the Baptist and serves as both a blessing and a way to beat the Philippine summer heat. The Regada Festival has become a major tourist attraction, drawing visitors from across the country who come to experience this unique blend of faith, culture, and celebration. Through music, dance, colorful costumes, and the communal act of water splashing, the festival embodies the soul of Cavite - a community bound by faith, tradition, and the joyous celebration of their shared heritage.",
    details: [
      "Celebrated annually every June in Cavite City",
      "Honors San Juan Bautista (Saint John the Baptist)",
      "Name derives from Spanish 'regar' meaning to water or sprinkle",
      "Features the Caracol ni San Juan Bautista religious procession and street dance",
      "Participants splash water as symbol of baptism and blessing",
      "Combines religious devotion with festive community celebration",
      "Major cultural tourism attraction for Cavite province",
      "Water splashing tradition helps participants stay cool during summer heat",
    ],
  },
  {
    id: 4,
    title: "Cavite City Baywalk & Samonte Park",
    excerpt:
      "The historic seawall area and Samonte Park along Manila Bay, surrounded by Old Cavite Puerto's colonial-era landmarks including the Cavite Mutiny historical marker.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "The Cavite City Baywalk and Samonte Park area represents a beautiful convergence of natural seaside beauty and profound historical significance. The seawall, constructed during the Spanish colonial period, stretches along Manila Bay and offers stunning sunset views while serving as a popular recreational space for locals and visitors. Samonte Park, named after a local hero, provides a green oasis along the waterfront with its landscaped gardens and walking paths. The surrounding Old Cavite Puerto (Port Cavite) area is rich in colonial-era heritage, featuring historical buildings and sites that tell the story of Cavite's role as a major Spanish naval base. Among the most significant landmarks is the historical marker commemorating the Cavite Mutiny of 1872, a pivotal event in Philippine history that helped spark the revolutionary movement against Spanish colonial rule. The mutiny, led by Filipino soldiers and workers at the Cavite arsenal, was brutally suppressed, but it inspired nationalist sentiment and is considered a precursor to the Philippine Revolution. Walking through this heritage district offers visitors a journey through time, from the Spanish colonial fortifications at Porta Vaga to the sites where Filipino patriots made their stand for freedom.",
    details: [
      "Seawall and Samonte Park located along Manila Bay coastline",
      "Seawall constructed during Spanish colonial era",
      "Popular spot for sunset viewing and recreational activities",
      "Surrounded by Old Cavite Puerto historic district",
      "Cavite Mutiny of 1872 historical marker located in the area",
      "The mutiny was a significant precursor to Philippine Revolution",
      "Porta Vaga gate and other Spanish colonial structures nearby",
      "Area features colonial-era architecture and heritage walking routes",
      "Recognized for historical significance in Philippine independence movement",
    ],
  },
  {
    id: 5,
    title: "Cavite Mutiny of 1872",
    excerpt:
      "A pivotal uprising by Filipino soldiers and workers at the Cavite arsenal that sparked nationalist sentiment and became a precursor to the Philippine Revolution.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "The Cavite Mutiny of 1872 was a watershed moment in Philippine history that would ultimately contribute to the birth of Filipino nationalism and the revolutionary movement against Spanish colonial rule. On January 20, 1872, around 200 Filipino soldiers and workers at the Cavite arsenal rose up against their Spanish officers. The uprising was brutally suppressed by Spanish authorities, but its impact reverberated far beyond the immediate event. In the aftermath, Spanish colonial authorities used the mutiny as a pretext to crack down on Filipino reformists and intellectuals. Three prominent Filipino priests - Jose Burgos, Mariano Gomez, and Jacinto Zamora (collectively known as Gomburza) - were controversially accused of instigating the mutiny and executed by garrote on February 17, 1872. Their martyrdom galvanized Filipino consciousness and inspired a generation of reformists and revolutionaries, including Jose Rizal, whose writings would later fuel the Philippine Revolution. Today, a historical marker in Cavite City commemorates this significant event, reminding visitors of the sacrifice made by those who dared to challenge colonial oppression.",
    details: [
      "Occurred on January 20, 1872, at the Cavite arsenal",
      "Led by around 200 Filipino soldiers and workers",
      "Brutally suppressed by Spanish colonial authorities",
      "Led to execution of Gomburza priests (Burgos, Gomez, Zamora)",
      "Gomburza executed by garrote on February 17, 1872",
      "Inspired Jose Rizal and other Filipino nationalists",
      "Considered a precursor to the Philippine Revolution of 1896",
      "Historical marker located in Cavite City",
      "Symbol of early Filipino resistance to colonial rule",
    ],
  },
  {
    id: 6,
    title: "Porta Vaga - Gateway to Old Cavite",
    excerpt:
      "One of the remaining gates of the fortified Spanish colonial city of Cavite, serving as an enduring symbol of the city's defensive past and architectural heritage.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "Porta Vaga stands as one of the few remaining tangible connections to Cavite's identity as a fortified Spanish colonial city. This historic gate was part of the extensive defensive walls that once encircled the old city of Cavite, protecting it from naval attacks and foreign invasions. During the Spanish colonial period, Cavite served as a major naval base and shipyard, making it a strategic military installation that required substantial fortifications. The name 'Porta Vaga' reflects the Spanish colonial administrative and military terminology used throughout the Philippines. Today, while much of the original wall system has disappeared, Porta Vaga remains as a cherished heritage landmark, symbolizing Cavite's role in Philippine colonial history. The gate represents the architectural and military engineering practices of the Spanish colonial era, adapted to the tropical Philippine environment and the specific defensive needs of a coastal naval base. Visitors to Porta Vaga can imagine the bustling activity of the Spanish colonial port city and reflect on how this small gate witnessed centuries of Philippine history unfold.",
    details: [
      "Part of the original Spanish fortification system of Cavite City",
      "Served as one of the gates to the fortified colonial city",
      "Protected the strategic Spanish naval base and shipyard",
      "One of few remaining structures from the original wall system",
      "Example of Spanish colonial military architecture",
      "Now preserved as a heritage landmark",
      "Symbol of Cavite's defensive and naval history",
      "Popular stop on heritage walking tours of Old Cavite",
    ],
  },
  {
    id: 7,
    title: "Cavite Peninsula - Strategic Naval Gateway",
    excerpt:
      "The historic peninsula that served as the cornerstone of Spanish and American naval power in the Philippines, hosting crucial military installations and shipyards.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "The Cavite Peninsula has played a pivotal role in Philippine military and naval history for over four centuries. Its strategic location at the entrance to Manila Bay made it an ideal site for Spanish colonial authorities to establish a major naval base and shipyard. The peninsula's geographic advantages - including its defensible position, deep water access, and proximity to Manila - made it invaluable for controlling maritime traffic in and out of Manila Bay. During the Spanish colonial era, the Cavite Naval Yard became one of the most important shipbuilding facilities in the Spanish Empire's Pacific territories, constructing and repairing galleons and warships. The peninsula witnessed numerous historic events, including naval battles, the execution of Filipino revolutionaries, and the transition from Spanish to American colonial rule. During World War II, the area saw intense fighting as Japanese forces captured the peninsula and later as American forces returned. Today, the Cavite Peninsula remains home to important naval facilities while also preserving sites of historical significance that tell the story of the Philippines' complex colonial and military past.",
    details: [
      "Strategic location at the entrance to Manila Bay",
      "Site of major Spanish colonial naval base and shipyard",
      "Key shipbuilding facility for Spanish Pacific fleet",
      "Witnessed transition from Spanish to American rule in 1898",
      "Scene of battles during Philippine Revolution and World War II",
      "Continues to host Philippine naval facilities",
      "Contains multiple historical landmarks including Fort San Felipe",
      "Essential to understanding Philippine maritime and military history",
    ],
  },
  {
    id: 8,
    title: "Caracol ni San Juan Bautista",
    excerpt:
      "The centerpiece religious procession of the Regada Festival, featuring a spiraling street dance where devotees honor Saint John the Baptist with joyful water splashing.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "The Caracol ni San Juan Bautista is the heart and soul of Cavite City's Regada Festival, representing a unique fusion of deep Catholic devotion and exuberant communal celebration. The term 'caracol' refers to the spiral or winding pattern of the religious procession as it moves through the streets of Cavite City. Participants carry the image of San Juan Bautista (Saint John the Baptist) through the city while performing traditional dances and splashing water on each other and spectators. The water splashing is deeply symbolic, representing the baptisms performed by Saint John in the Jordan River and serving as a form of blessing for the participants and community. The procession creates a festive atmosphere where religious reverence and playful celebration merge seamlessly. Devotees dress in colorful costumes, often incorporating elements that reference water and baptism. The event draws thousands of participants and spectators each year, making it one of the most anticipated religious and cultural celebrations in Cavite province. Through the Caracol, the community reaffirms its faith, preserves its traditions, and celebrates its collective identity.",
    details: [
      "Central event of the annual Regada Festival in June",
      "Features spiral or winding procession pattern (caracol)",
      "Participants carry the image of San Juan Bautista through city streets",
      "Combines religious procession with traditional street dancing",
      "Water splashing symbolizes baptism and blessing",
      "Participants wear colorful costumes with water-themed elements",
      "Draws thousands of devotees and tourists annually",
      "Represents unique blend of Catholic faith and Filipino cultural expression",
      "Community participates in both solemn reverence and joyful celebration",
    ],
  },
  {
    id: 9,
    title: "Old Cavite Puerto Heritage District",
    excerpt:
      "The historic port area that served as Spain's principal naval base in Asia, featuring colonial architecture, fortifications, and sites of revolutionary significance.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "Old Cavite Puerto (Port Cavite) represents one of the most historically significant districts in the Philippines, serving as the epicenter of Spanish naval power in Asia for over three centuries. This compact area witnessed the ebb and flow of empires, revolutions, and the birth of the Filipino nation. During the Spanish colonial period, Puerto Cavite was a bustling naval base, shipyard, and garrison town, housing Spanish officials, soldiers, sailors, and Filipino workers. The district's strategic importance made it a focal point during the Philippine Revolution, and many revolutionary heroes and martyrs had connections to this area. Walking through Old Cavite Puerto today is like stepping back in time - narrow streets lined with colonial-era buildings, historic churches, old fortification walls, and markers commemorating significant events in Philippine history. The district encompasses numerous heritage sites including Porta Vaga, the San Roque Church, sites related to the Cavite Mutiny, and various Spanish colonial structures. Recent efforts to promote heritage tourism have highlighted the area's potential as a living museum of Philippine colonial and revolutionary history.",
    details: [
      "Served as Spain's principal naval base in Asia for over 300 years",
      "Major Spanish shipyard and garrison during colonial period",
      "Site of numerous events during Philippine Revolution",
      "Features compact street layout typical of Spanish colonial towns",
      "Contains multiple heritage landmarks and historical markers",
      "Home to colonial-era churches, fortifications, and government buildings",
      "Connected to stories of Filipino revolutionaries and martyrs",
      "Designated as heritage district for preservation and tourism",
      "Offers heritage walking tours showcasing colonial and revolutionary history",
    ],
  },
  {
    id: 10,
    title: "Historical Map: Cavite 1815",
    excerpt:
      "Detailed cartographic record showing the layout and fortifications of Spanish colonial Cavite, providing insights into the city's military and urban planning.",
    image: "../assets/images/cavite_historical_site_bg.png",
    fullDescription:
      "The historical map of Cavite from 1815 serves as an invaluable document for understanding the layout, fortifications, and urban development of one of Spain's most important colonial outposts in the Pacific. Created during the height of Spanish colonial power, this map reveals the careful military planning that went into designing Cavite as a fortified naval base. The map shows the extensive wall system that surrounded the city, the strategic placement of gates like Porta Vaga, the location of Fort San Felipe, and the organization of streets and buildings within the fortified perimeter. It also illustrates the relationship between the military installations, the shipyard facilities, religious structures like San Roque Church, and residential areas. For historians and heritage advocates, maps like this are crucial for reconstruction efforts and for understanding how much of the original Spanish colonial layout has been preserved or altered over time. The 1815 map represents Cavite at a time before the revolutionary movements that would transform Philippine society, offering a snapshot of colonial urban planning and military architecture. Researchers and visitors can use such historical cartographic evidence to trace the evolution of Cavite from a Spanish fortress-city to a modern Philippine municipality.",
    details: [
      "Historical map dating from 1815 during Spanish colonial period",
      "Shows fortification walls and defensive structures",
      "Illustrates location of Fort San Felipe and other military installations",
      "Documents street layout and urban organization",
      "Reveals location of religious buildings including churches",
      "Important resource for heritage conservation and research",
      "Helps trace urban development and changes over two centuries",
      "Available through academic research publications",
      "Used for heritage walking tour development and education",
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
    title: "San Roque Church (Cavite City) - Wikipedia",
    description:
      "Comprehensive encyclopedia article about the historic San Roque Church built in 1595, one of Cavite City's most important religious landmarks.",
    source: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/San_Roque_Church_%28Cavite_City%29",
  },
  {
    id: 2,
    title: "San Roque Church - Mapcarta",
    description:
      "Interactive map and location information for San Roque Church in Cavite City with geographic context and nearby landmarks.",
    source: "Mapcarta",
    url: "https://mapcarta.com/W234096351",
  },
  {
    id: 3,
    title: "San Roque Church Image - Wikimedia Commons",
    description:
      "Historical photograph and documentation of San Roque Church architecture and its significance in Cavite City's religious heritage.",
    source: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/File%3ASan_Roque_Church_%28Cavite_City%29.png",
  },
  {
    id: 4,
    title: "Fort San Felipe - Wikipedia",
    description:
      "Detailed article covering the history, architecture, and military significance of Fort San Felipe, the 16th-century Spanish fortress on Cavite Peninsula.",
    source: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Fort_San_Felipe_%28Cavite%29",
  },
  {
    id: 5,
    title: "Fort San Felipe - Mapcarta",
    description:
      "Geographic information and interactive map showing Fort San Felipe's strategic location on Cavite Peninsula overlooking Manila Bay.",
    source: "Mapcarta",
    url: "https://mapcarta.com/W404525071",
  },
  {
    id: 6,
    title: "Cavite Peninsula - Wikipedia",
    description:
      "Encyclopedia article about the historic Cavite Peninsula, its strategic importance, and role in Philippine military and naval history.",
    source: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Cavite_Peninsula",
  },
  {
    id: 7,
    title: "Cavite City Seawall - Samonte Park (2020)",
    description:
      "Photographic documentation of the Sea Wall and Samonte Park area in Cavite City, showcasing the baywalk and coastal heritage sites.",
    source: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/File%3ASea_Wall%2C_Samonte_Park%2C_Cavite_City_2020.jpg",
  },
  {
    id: 8,
    title: "Samonte Park Photowalk (April 2016)",
    description:
      "Photo blog documentation of Samonte Park and Cavite City heritage sites, featuring the baywalk area and colonial-era architecture.",
    source: "Calabarzon D Blog",
    url: "https://calabarzoned.wordpress.com/2016/04/15/samonte-park-cavite-city-photowalk-april-2016/",
  },
  {
    id: 9,
    title: "Historical Map: Cavite 1815",
    description:
      "Research publication featuring historical maps and documentation of Cavite during the Spanish colonial period (1815), showing Old Puerto area.",
    source: "ResearchGate",
    url: "https://www.researchgate.net/figure/SHM-42-Cavite-1815_fig5_305429797",
  },
  {
    id: 10,
    title: "Cavite Mutiny of 1872 Historical Marker",
    description:
      "Photograph and information about the historical marker commemorating the pivotal Cavite Mutiny of 1872, a precursor to the Philippine Revolution.",
    source: "Wikimedia Commons",
    url: "https://commons.wikimedia.org/wiki/File%3ACavite_Mutiny_of_1872_historical_marker_in_Cavite_City.jpg",
  },
  {
    id: 11,
    title: "Porta Vaga - Cavite Heritage Site",
    description:
      "Article about Porta Vaga, one of the remaining gates of the old Spanish fortified city of Cavite, an important heritage landmark.",
    source: "Yodisphere",
    url: "https://www.yodisphere.com/2021/06/Porta-Vaga-Cavite.html",
  },
  {
    id: 12,
    title: "Cavite City Tourist Spots & Historical Significance",
    description:
      "Comprehensive guide to Cavite City's historical tourist attractions, covering churches, forts, heritage sites, and their significance.",
    source: "Hop N Cruise",
    url: "https://hopncruise.com/2023/11/15/cavite-city-tourist-spots-love-their-historical-significance/",
  },
  {
    id: 13,
    title: "Regada Festival - Official Cavite Province Website",
    description:
      "Official information about Cavite's Regada Festival, the annual water festival celebrating San Juan Bautista with religious processions and festivities.",
    source: "Cavite Provincial Government",
    url: "https://cavite.gov.ph/home/regada-festival/",
  },
  {
    id: 14,
    title: "Caviterrific - Cultural Heritage Guide",
    description:
      "Interactive website showcasing Cavite's rich cultural heritage, festivals, historical sites, and traditions including the Regada Festival.",
    source: "Caviterrific",
    url: "https://markandrewcolocado.github.io/Caviterrific/main.html",
  },
  {
    id: 15,
    title: "Regada Festival 2019 - Video Documentation",
    description:
      "Video footage of the Regada Festival celebration in 2019, featuring the Caracol ni San Juan Bautista procession and water festivities.",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=6XiQFthN5Ho",
  },
  {
    id: 16,
    title: "Regada Festival 2019 - Official Photo",
    description:
      "Official photograph from Cavite City government documenting the 2019 Regada Festival celebration and street festivities.",
    source: "Cavite City Government",
    url: "http://cavitecity.gov.ph/images/regada%202019.jpg",
  },
  {
    id: 17,
    title: "Caracol ni San Juan Bautista - Festive Pinoy",
    description:
      "Article about the Caracol procession during Cavite's Regada Festival, explaining the water blessing tradition and religious significance.",
    source: "Festive Pinoy",
    url: "https://festivepinoy.com/cavites-regada-festival/",
  },
  {
    id: 18,
    title: "Regada Festival Documentary - YouTube",
    description:
      "Documentary-style video exploring the history, traditions, and cultural significance of the Regada Festival in Cavite City.",
    source: "YouTube",
    url: "https://www.youtube.com/watch?v=uQP7SyN1sHY",
  },
  {
    id: 19,
    title: "Regada Festival News Coverage - PNA",
    description:
      "Philippine News Agency coverage of the Regada Festival, highlighting its role in Cavite's cultural tourism and community celebration.",
    source: "Philippine News Agency",
    url: "https://www.pna.gov.ph/articles/1039362",
  },
  {
    id: 20,
    title: "Feast of San Roque - Cavite Festivals",
    description:
      "Information about the Feast of San Roque celebrated at San Roque Church every August 16, one of Cavite City's important religious celebrations.",
    source: "Lutong Cavite Blog",
    url: "https://lutongcavite.blogspot.com/p/cavite-festivals.html",
  },
  {
    id: 21,
    title: "Water, Faith and Fiesta: Experiencing Cavite's Soul Through Regada",
    description:
      "Feature article exploring the deep cultural and spiritual significance of the Regada Festival in expressing Cavite's community identity.",
    source: "Business Mirror",
    url: "https://businessmirror.com.ph/2025/08/02/water-faith-and-fiesta-experiencing-the-soul-of-cavite-through-regada/",
  },
  {
    id: 22,
    title: "Cavite City Strives to Make a Splash with Regada Festival",
    description:
      "News article about Cavite City's efforts to promote and preserve the Regada Festival as a major cultural tourism attraction.",
    source: "Manila Bulletin Tribune",
    url: "https://tribune.net.ph/2025/07/20/cavite-city-strives-to-make-a-splash",
  },
]);

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

// Story page functionality
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
    storiesError.value = true;
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
  z-index: 99999;
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

.history-page__gallery-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform var(--transition-normal);
}

.history-page__gallery-item:hover .history-page__gallery-image {
  transform: scale(1.05);
}

/* Gallery Modal */
.history-page__gallery-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: var(--spacing-xl);
}

.history-page__gallery-modal-close {
  position: fixed;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 1);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--transition-fast),
    transform var(--transition-fast), box-shadow var(--transition-fast);
  font-size: 24px;
  font-weight: var(--fw-bold);
  z-index: 100001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.history-page__gallery-modal-close:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
}

.history-page__gallery-modal-content {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.history-page__gallery-modal-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.history-page__gallery-modal-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 1);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color var(--transition-fast),
    transform var(--transition-fast), box-shadow var(--transition-fast);
  font-size: 24px;
  z-index: 100001;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.history-page__gallery-modal-nav:hover {
  background-color: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.6);
}

.history-page__gallery-modal-nav--prev {
  left: var(--spacing-xl);
}

.history-page__gallery-modal-nav--next {
  right: var(--spacing-xl);
}

.history-page__gallery-modal-nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.history-page__gallery-modal-nav:disabled:hover {
  background-color: rgba(255, 255, 255, 0.9);
  transform: translateY(-50%) scale(1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.history-page__gallery-modal-counter {
  position: fixed;
  bottom: var(--spacing-lg);
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: var(--light-color);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: 20px;
  font-size: var(--fs-small-text);
  font-weight: var(--fw-medium);
  backdrop-filter: blur(10px);
  z-index: 100001;
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

  .history-page__gallery-modal {
    padding: var(--spacing-sm);
  }

  .history-page__gallery-modal-close {
    width: 40px;
    height: 40px;
    top: var(--spacing-md);
    right: var(--spacing-md);
    font-size: 20px;
  }

  .history-page__gallery-modal-nav {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }

  .history-page__gallery-modal-nav--prev {
    left: var(--spacing-sm);
  }

  .history-page__gallery-modal-nav--next {
    right: var(--spacing-sm);
  }

  .history-page__gallery-modal-counter {
    bottom: var(--spacing-md);
    padding: var(--spacing-xs) var(--spacing-md);
    font-size: var(--fs-tiny-text);
  }

  .history-page__gallery-modal-image {
    max-height: 70vh;
  }
}

/* ===== Story Section with Sidebar Navigation ===== */
.history-page__stories-section {
  background-color: var(--white-color);
  padding: var(--spacing-3xl) 0;
}

.history-page__stories-container {
  display: flex;
  flex-direction: row-reverse;
  gap: 2rem;
  padding: 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

/* Sidebar Navigation */
.history-page__sidebar {
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

.history-page__sidebar--sticky {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.history-page__sidebar-content {
  background-color: var(--accent-2-color);
  border-radius: 0.5rem;
  padding: 1rem;
  border: 1px solid var(--accent-3-color);
}

.history-page__sidebar-title {
  font-size: var(--fs-heading-5);
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-weight: var(--fw-bold);
  border-bottom: 1px solid var(--primary-color);
  padding-bottom: 0.5rem;
}

.history-page__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-page__nav-item {
  margin-bottom: 1rem;
  border-radius: 4px;
  transition: transform var(--transition-fast);
}

.history-page__nav-item--active {
  transform: translateX(3px);
}

.history-page__nav-link {
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

.history-page__nav-link--active {
  color: var(--primary-color);
  border-left-color: var(--primary-color);
  background-color: rgba(13, 148, 136, 0.1);
  font-weight: var(--fw-semibold);
}

.history-page__nav-link:hover {
  color: var(--primary-color);
  background-color: rgba(13, 148, 136, 0.05);
  transform: translateX(2px);
}

.history-page__nav-number {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--accent-3-color);
  color: var(--white-color);
  font-size: 12px;
  font-weight: var(--fw-bold);
  margin-right: 0.5rem;
  flex-shrink: 0;
}

.history-page__nav-link--active .history-page__nav-number {
  background-color: var(--primary-color);
}

.history-page__nav-text {
  flex: 1;
  font-size: 14px;
}

.history-page__subnav-list {
  list-style: none;
  margin: 0.5rem 0 0 2rem;
  padding: 0;
  border-left: 1px solid var(--accent-3-color);
  position: relative;
}

.history-page__subnav-item {
  margin-bottom: 0.5rem;
  position: relative;
}

.history-page__subnav-link {
  color: var(--dark-color);
  font-size: var(--fs-small-text);
  text-decoration: none;
  display: block;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  transition: all var(--transition-fast);
  position: relative;
  padding-left: 1rem;
}

.history-page__subnav-link::before {
  content: "\2022";
  position: absolute;
  left: 0;
  color: var(--accent-3-color);
  opacity: 0.6;
}

.history-page__subnav-link:hover {
  color: var(--primary-color);
  background-color: rgba(13, 148, 136, 0.05);
}

.history-page__subnav-link--active {
  color: var(--primary-color);
  font-weight: var(--fw-medium);
}

/* Main Story Content */
.history-page__stories-main {
  flex: 1;
  max-width: 800px;
}

.history-page__loading {
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

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.history-page__story-content {
  margin-bottom: 2rem;
}

.history-page__story-section {
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--accent-2-color);
  scroll-margin-top: 80px;
  position: relative;
  transition: all var(--transition-normal);
}

.history-page__story-section:last-child {
  border-bottom: none;
}

.history-page__story-section--highlight {
  background-color: rgba(254, 243, 199, 0.3);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
}

.history-page__story-section-title {
  font-size: var(--fs-heading-4);
  color: var(--dark-color);
  font-weight: var(--fw-bold);
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.history-page__story-section-title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 3px;
  background-color: var(--primary-color);
  transition: width var(--transition-normal);
}

.history-page__story-section:hover .history-page__story-section-title::after {
  width: 80px;
}

.history-page__story-section-content {
  line-height: 1.7;
  margin-bottom: 1.5rem;
  color: var(--dark-color);
}

.history-page__story-subsections {
  margin-top: 1.5rem;
}

.history-page__story-subsection {
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 3px solid var(--accent-2-color);
  scroll-margin-top: 80px;
}

.history-page__story-subsection-title {
  font-size: var(--fs-heading-6);
  color: var(--dark-color);
  font-weight: var(--fw-semibold);
  margin-bottom: 0.5rem;
}

.history-page__story-subsection-content {
  line-height: 1.6;
  color: var(--dark-color);
}

/* Activities Section */
.history-page__activities {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--accent-2-color);
}

.history-page__activities-description {
  color: var(--dark-color);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.history-page__activities-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
}

.history-page__activity-card {
  background: var(--white-color);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--accent-2-color);
  transition: transform var(--transition-fast),
    box-shadow var(--transition-fast);
}

.history-page__activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.history-page__activity-image {
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

.history-page__activity-content {
  padding: 1rem;
}

.history-page__activity-category {
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

.history-page__activity-title {
  font-size: var(--fs-body-text);
  font-weight: var(--fw-bold);
  color: var(--dark-color);
  margin: 0 0 0.5rem 0;
}

.history-page__activity-description {
  font-size: var(--fs-small-text);
  color: var(--accent-3-color);
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

.history-page__activity-location {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--secondary-color);
  font-weight: var(--fw-medium);
}

/* Mobile Navigation Toggle */
.history-page__mobile-nav-toggle {
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
  display: none;
}

.history-page__mobile-nav-toggle:hover {
  background-color: var(--secondary-color);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.history-page__mobile-nav-toggle--active {
  background-color: var(--dark-color);
}

.history-page__mobile-nav-icon {
  width: 18px;
  height: 2px;
  background-color: currentColor;
  position: relative;
  transition: background-color 0.3s ease;
}

.history-page__mobile-nav-icon::before,
.history-page__mobile-nav-icon::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: currentColor;
  left: 0;
  transition: transform 0.3s ease;
}

.history-page__mobile-nav-icon::before {
  top: -6px;
}

.history-page__mobile-nav-icon::after {
  bottom: -6px;
}

.history-page__mobile-nav-toggle--active
  .history-page__mobile-nav-icon::before {
  top: 0;
  transform: rotate(45deg);
}

.history-page__mobile-nav-toggle--active .history-page__mobile-nav-icon::after {
  bottom: 0;
  transform: rotate(-45deg);
}

.history-page__mobile-nav-toggle--active .history-page__mobile-nav-icon {
  background-color: transparent;
}

.history-page__mobile-nav-label {
  font-size: var(--fs-small-text);
  font-weight: var(--fw-medium);
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

/* Story Section Responsive Design */
@media (max-width: 1024px) {
  .history-page__stories-container {
    gap: 1.5rem;
  }

  .history-page__sidebar {
    width: 250px;
  }
}

@media (max-width: 900px) {
  .history-page__stories-container {
    flex-direction: column;
    gap: 2rem;
  }

  .history-page__sidebar {
    width: 100%;
    max-height: none;
    position: relative;
    top: 0;
    order: 1;
  }

  .history-page__sidebar--sticky {
    box-shadow: none;
  }

  .history-page__nav-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .history-page__nav-item {
    margin-bottom: 0.5rem;
    flex: 1 1 calc(50% - 0.5rem);
  }

  .history-page__stories-main {
    order: 2;
  }

  .history-page__subnav-list {
    display: none;
  }

  .history-page__nav-item--active .history-page__subnav-list {
    display: block;
  }

  .history-page__activities-grid {
    grid-template-columns: 1fr;
  }

  .history-page__activity-image {
    height: 100px;
  }
}

@media (max-width: 768px) {
  .history-page__stories-section {
    padding: var(--spacing-2xl) 0;
  }

  .history-page__story-section {
    margin-bottom: 2rem;
    padding-bottom: 1.5rem;
  }

  .history-page__nav-item {
    flex: 1 1 100%;
  }

  .history-page__sidebar {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.95);
    padding: 1rem;
    overflow-y: auto;
  }

  .history-page__sidebar-content {
    max-height: 80vh;
    overflow-y: auto;
    margin-top: 15vh;
    animation: slideUpFade 0.3s ease-out;
  }

  body.nav-open .history-page__sidebar {
    display: block;
  }

  .history-page__mobile-nav-toggle {
    display: flex;
  }

  .history-page__activity-card {
    border-radius: 0.75rem;
  }

  .history-page__activity-content {
    padding: 0.75rem;
  }
}

@media (max-width: 480px) {
  .history-page__stories-container {
    padding: 0 0.5rem;
  }

  .history-page__story-section-title {
    font-size: var(--fs-heading-5);
  }

  .history-page__story-subsection-title {
    font-size: var(--fs-body-text);
  }

  .history-page__mobile-nav-toggle {
    bottom: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem 0.5rem;
  }

  .history-page__activities-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .history-page__activity-card {
    border-radius: 0.75rem;
  }
}
</style>
