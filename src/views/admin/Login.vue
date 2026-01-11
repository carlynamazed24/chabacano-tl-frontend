<template>
  <div class="login fade-in">
    <div class="login__container">
      <!-- Logo Panel -->
      <div class="login__panel login__panel--brand">
        <div class="login__brand">
          <img
            src="../../assets/images/chabacano_logo_white.png"
            alt="Chabacano Translator Logo"
            class="login__logo"
          />
          <p class="login__tagline fs-body-text text-light">
            Admin Control Panel
          </p>
        </div>
      </div>

      <!-- Form Panel -->
      <div class="login__panel login__panel--form">
        <div class="login__form">
          <div class="login__header">
            <h1 class="login__title fs-heading-4">Welcome Back</h1>
            <p class="login__subtitle fs-body-text">Sign in to continue</p>
          </div>

          <form class="login__fields" @submit.prevent="login">
            <div class="login__field">
              <label for="username" class="login__label fs-body-text"
                >Username</label
              >
              <input
                type="text"
                id="username"
                v-model="username"
                class="login__input"
                placeholder="Enter your username"
                autocomplete="username"
              />
            </div>

            <div class="login__field">
              <label for="password" class="login__label fs-body-text"
                >Password</label
              >
              <input
                type="password"
                id="password"
                v-model="password"
                class="login__input"
                placeholder="Enter your password"
                autocomplete="current-password"
              />
            </div>

            <div class="login__actions">
              <Button
                :loadingState="btnLoadingState"
                btnType="btn-secondary"
                btnText="Sign In"
                size="lg"
                @click="login"
              />
            </div>
          </form>

          <div class="login__footer">
            <router-link
              :to="{ name: 'home' }"
              class="login__back-link fs-small-text"
            >
              ← Back to Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RequestToLogin } from "../../composables/API/Auth";
import Button from "../../components/ui/Button.vue";
import { displayErrorNotification } from "../../composables/services/notifications";

const router = useRouter();

const username = ref<string>("");
const password = ref<string>("");
const btnLoadingState = ref<boolean>(false);

const login = async () => {
  // Validate inputs
  if (!username.value.trim() || !password.value.trim()) {
    return displayErrorNotification("Please enter both username and password");
  }

  try {
    btnLoadingState.value = true;
    const payload = {
      username: username.value.trim(),
      password: password.value,
    };

    const response = await RequestToLogin(payload);

    // Check for explicit success status
    if (response.status === "success") {
      router.push({ name: "cpanel" });
      return;
    }

    // Handle failed or unexpected responses
    displayErrorNotification(
      response.message || "Login failed. Please try again."
    );
  } catch (error) {
    displayErrorNotification("Something went wrong. Please try again.");
    console.error(error);
  } finally {
    btnLoadingState.value = false;
  }
};
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--light-color) 0%,
    var(--white-color) 100%
  );
  padding: var(--spacing-md);
}

.login__container {
  display: flex;
  width: 100%;
  max-width: 900px;
  min-height: 500px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

/* Brand Panel */
.login__panel--brand {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  padding: var(--spacing-2xl);
}

.login__brand {
  text-align: center;
}

.login__logo {
  width: 180px;
  margin-bottom: var(--spacing-lg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transition: transform var(--transition-normal) var(--ease-out);
}

.login__logo:hover {
  transform: scale(1.05);
}

.login__tagline {
  opacity: 0.9;
  letter-spacing: 0.5px;
}

/* Form Panel */
.login__panel--form {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--white-color);
  padding: var(--spacing-2xl);
}

.login__form {
  width: 100%;
  max-width: 320px;
}

.login__header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.login__title {
  color: var(--dark-color);
  margin-bottom: var(--spacing-xs);
}

.login__subtitle {
  color: var(--primary-color);
  opacity: 0.8;
}

.login__fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.login__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.login__label {
  color: var(--dark-color);
  font-weight: var(--fw-medium);
}

.login__input {
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--light-color);
  border-radius: var(--border-radius-md);
  font-size: var(--fs-body-text);
  font-family: var(--font-body);
  background: var(--white-color);
  transition: border-color var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
}

.login__input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring-color);
}

.login__input::placeholder {
  color: var(--accent-3-color);
  opacity: 0.5;
}

.login__actions {
  margin-top: var(--spacing-md);
}

.login__actions :deep(.btn) {
  width: 100%;
}

.login__footer {
  text-align: center;
  margin-top: var(--spacing-xl);
}

.login__back-link {
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-normal) var(--ease-out);
}

.login__back-link:hover {
  color: var(--accent-1-color);
}

/* Responsive Design */
@media (max-width: 768px) {
  .login__container {
    flex-direction: column;
    max-width: 400px;
  }

  .login__panel--brand {
    padding: var(--spacing-xl);
  }

  .login__logo {
    width: 120px;
  }

  .login__panel--form {
    padding: var(--spacing-xl);
  }
}
</style>
