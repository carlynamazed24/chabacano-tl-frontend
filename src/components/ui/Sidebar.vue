<template>
  <aside class="sidebar">
    <div class="sidebar__header">
      <div class="sidebar__brand">
        <img
          src="../../assets/images/chabacano_logo_white.png"
          alt="Chabacano Logo"
          class="sidebar__logo"
        />
      </div>
    </div>

    <nav class="sidebar__nav">
      <ul class="sidebar__nav-list">
        <li class="sidebar__nav-item">
          <router-link
            :to="{ name: 'content-editor' }"
            class="sidebar__nav-link fs-body-text"
            active-class="sidebar__nav-link--active"
          >
            <span class="sidebar__nav-icon">📄</span>
            <span class="sidebar__nav-text text-light">Pages</span>
          </router-link>
        </li>

        <li class="sidebar__nav-item">
          <router-link
            :to="{ name: 'dictionary-editor' }"
            class="sidebar__nav-link fs-body-text"
            active-class="sidebar__nav-link--active"
          >
            <span class="sidebar__nav-icon">📚</span>
            <span class="sidebar__nav-text text-light">Dictionary</span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="sidebar__footer">
      <Button
        class="sidebar__logout-btn fs-body-text"
        btnType="btn-primary"
        size="md"
        btnText="Logout"
        @click="logout"
      />
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { RequestToLogout } from "../../composables/API/Auth";
import Button from "./Button.vue";
import { displayErrorNotification } from "../../composables/services/notifications";

const router = useRouter();

const logout = async () => {
  try {
    const response = await RequestToLogout();

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    router.push({ name: "login" });
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
  }
};
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 260px;
  background: var(--gradient-primary);
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
}

.sidebar__header {
  padding: var(--spacing-xl) var(--spacing-lg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar__brand {
  display: flex;
  justify-content: center;
}

.sidebar__logo {
  width: 140px;
  transition: transform var(--transition-normal) var(--ease-out);
}

.sidebar__logo:hover {
  transform: scale(1.05);
}

.sidebar__nav {
  flex: 1;
  padding: var(--spacing-lg) 0;
  overflow-y: auto;
}

.sidebar__nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.sidebar__nav-item {
  padding: 0 var(--spacing-md);
}

.sidebar__nav-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md) var(--spacing-lg);
  border-radius: var(--border-radius-md);
  text-decoration: none;
  transition: background-color var(--transition-normal) var(--ease-out),
    transform var(--transition-fast) var(--ease-out);
}

.sidebar__nav-link:hover {
  background-color: rgba(255, 255, 255, 0.15);
  transform: translateX(4px);
}

.sidebar__nav-link--active {
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: inset 3px 0 0 var(--light-color);
}

.sidebar__nav-icon {
  font-size: 1.25rem;
  opacity: 0.9;
}

.sidebar__nav-text {
  font-weight: var(--fw-medium);
  letter-spacing: 0.3px;
}

.sidebar__footer {
  padding: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar__logout-btn {
  width: 100%;
}

/* Responsive */
@media (max-width: 1024px) {
  .sidebar {
    width: 220px;
  }

  .sidebar__logo {
    width: 120px;
  }
}
</style>
