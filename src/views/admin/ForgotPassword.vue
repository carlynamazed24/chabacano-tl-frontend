<template>
  <div class="password-reset fade-in">
    <div class="password-reset__card">
      <div class="password-reset__brand">
        <img
          src="../../assets/images/chabacano_logo_white.png"
          alt="Chabacano Translator Logo"
          class="password-reset__logo"
        />
        <p class="password-reset__brand-text fs-body-text text-light">
          Admin Control Panel
        </p>
      </div>

      <div class="password-reset__form-panel">
        <div class="password-reset__form">
          <div class="password-reset__header">
            <h1 class="password-reset__title fs-heading-5">
              Forgot Password
            </h1>
            <p class="password-reset__subtitle fs-body-text">
              Enter your admin username or recovery email.
            </p>
          </div>

          <form class="password-reset__fields" @submit.prevent="requestReset">
            <div class="password-reset__field">
              <label
                for="reset-identifier"
                class="password-reset__label fs-body-text"
              >
                Username or Email
              </label>
              <input
                id="reset-identifier"
                v-model="identifier"
                type="text"
                class="password-reset__input"
                :placeholder="placeholders.identifier"
                autocomplete="username"
              />
            </div>

            <Button
              :loadingState="loading"
              btnType="btn-secondary"
              btnText="Send Reset Link"
              size="lg"
              nativeType="submit"
            />
          </form>

          <p v-if="statusMessage" class="password-reset__status fs-small-text">
            {{ statusMessage }}
          </p>

          <div class="password-reset__footer">
            <router-link
              :to="{ name: 'login' }"
              class="password-reset__link fs-small-text"
            >
              &larr; Back to Sign In
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Button from "../../components/ui/Button.vue";
import { RequestToForgotPassword } from "../../composables/API/Auth";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../composables/services/notifications";

const placeholders = {
  identifier: "Enter username or recovery email",
};

const identifier = ref("");
const loading = ref(false);
const statusMessage = ref("");

const requestReset = async () => {
  if (!identifier.value.trim()) {
    return displayErrorNotification("Please enter your username or email");
  }

  loading.value = true;

  try {
    const response = await RequestToForgotPassword({
      identifier: identifier.value.trim(),
    });

    if (response.status === "failed") {
      return displayErrorNotification(
        response.message || "Unable to request password reset"
      );
    }

    statusMessage.value = response.message;
    displaySuccessNotification("Password reset request sent");
  } catch (error) {
    displayErrorNotification("Something went wrong. Please try again.");
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
@import "../../styles/tokens/colors.css";
@import "../../styles/tokens/typography.css";
@import "../../styles/tokens/spacing.css";
@import "../../styles/tokens/animations.css";

.password-reset {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: var(--spacing-md);
  background: linear-gradient(
    135deg,
    var(--light-color) 0%,
    var(--white-color) 100%
  );
}

.password-reset__card {
  display: flex;
  width: 100%;
  max-width: 900px;
  min-height: 500px;
  overflow: hidden;
  background: var(--white-color);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.password-reset__brand {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  text-align: center;
  background: var(--gradient-primary);
}

.password-reset__logo {
  width: 180px;
  margin-bottom: var(--spacing-lg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.password-reset__brand-text {
  opacity: 0.9;
}

.password-reset__form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
}

.password-reset__form {
  width: 100%;
  max-width: 340px;
}

.password-reset__header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.password-reset__title {
  margin-bottom: var(--spacing-xs);
  color: var(--dark-color);
}

.password-reset__subtitle {
  color: var(--primary-color);
  line-height: var(--line-height-normal);
}

.password-reset__fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.password-reset__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.password-reset__label {
  color: var(--dark-color);
  font-weight: var(--fw-medium);
}

.password-reset__input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  color: var(--dark-color);
  background: var(--white-color);
  border: 2px solid var(--light-color);
  border-radius: var(--border-radius-md);
  font-family: var(--font-body);
  font-size: var(--fs-body-text);
  transition: border-color var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
}

.password-reset__input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring-color);
}

.password-reset__input::placeholder {
  color: var(--primary-color);
  opacity: 0.55;
}

.password-reset__status {
  margin-top: var(--spacing-lg);
  color: var(--primary-color);
  line-height: var(--line-height-normal);
  text-align: center;
}

.password-reset__footer {
  margin-top: var(--spacing-xl);
  text-align: center;
}

.password-reset__link {
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-normal) var(--ease-out);
}

.password-reset__link:hover {
  color: var(--dark-color);
}

.password-reset__link:focus-visible {
  outline: 2px solid var(--focus-ring-color);
  outline-offset: 4px;
  border-radius: var(--border-radius-sm);
}

.password-reset__fields :deep(.btn) {
  width: 100%;
}

@media (max-width: 768px) {
  .password-reset__card {
    flex-direction: column;
    max-width: 400px;
  }

  .password-reset__brand {
    padding: var(--spacing-xl);
  }

  .password-reset__logo {
    width: 120px;
  }

  .password-reset__form-panel {
    padding: var(--spacing-xl);
  }
}
</style>
