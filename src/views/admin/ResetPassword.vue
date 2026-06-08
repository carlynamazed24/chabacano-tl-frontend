<template>
  <div class="reset-password fade-in">
    <div class="reset-password__card">
      <div class="reset-password__brand">
        <img
          src="../../assets/images/chabacano_logo_white.png"
          alt="Chabacano Translator Logo"
          class="reset-password__logo"
        />
        <p class="reset-password__brand-text fs-body-text text-light">
          Admin Control Panel
        </p>
      </div>

      <div class="reset-password__form-panel">
        <div class="reset-password__form">
          <div class="reset-password__header">
            <h1 class="reset-password__title fs-heading-5">Reset Password</h1>
            <p class="reset-password__subtitle fs-body-text">
              Create a new admin password.
            </p>
          </div>

          <form class="reset-password__fields" @submit.prevent="submitReset">
            <div class="reset-password__field">
              <label
                for="new-password"
                class="reset-password__label fs-body-text"
              >
                New Password
              </label>
              <div class="reset-password__password-control">
                <input
                  id="new-password"
                  v-model="password"
                  :type="passwordInputType"
                  class="reset-password__input reset-password__input--password"
                  :placeholder="placeholders.password"
                  autocomplete="new-password"
                />
                <button
                  type="button"
                  class="reset-password__password-toggle"
                  :aria-label="
                    showPassword ? 'Hide password' : 'Show password'
                  "
                  :aria-pressed="showPassword"
                  @click="showPassword = !showPassword"
                >
                  <EyeOffIcon
                    v-if="showPassword"
                    :size="20"
                    color="currentColor"
                  />
                  <EyeIcon v-else :size="20" color="currentColor" />
                </button>
              </div>
            </div>

            <div class="reset-password__field">
              <label
                for="confirm-password"
                class="reset-password__label fs-body-text"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                v-model="confirmPassword"
                type="password"
                class="reset-password__input"
                :placeholder="placeholders.confirmPassword"
                autocomplete="new-password"
              />
            </div>

            <Button
              :loadingState="loading"
              btnType="btn-secondary"
              btnText="Reset Password"
              size="lg"
              nativeType="submit"
            />
          </form>

          <div class="reset-password__footer">
            <router-link
              :to="{ name: 'login' }"
              class="reset-password__link fs-small-text"
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
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "../../components/ui/Button.vue";
import EyeIcon from "../../components/icons/EyeIcon.vue";
import EyeOffIcon from "../../components/icons/EyeOffIcon.vue";
import { RequestToResetPassword } from "../../composables/API/Auth";
import {
  displayErrorNotification,
  displaySuccessNotification,
} from "../../composables/services/notifications";

const route = useRoute();
const router = useRouter();
const placeholders = {
  password: "Enter new password",
  confirmPassword: "Confirm new password",
};

const password = ref("");
const confirmPassword = ref("");
const showPassword = ref(false);
const loading = ref(false);
const passwordInputType = computed(() =>
  showPassword.value ? "text" : "password"
);
const resetToken = computed(() => String(route.query.token ?? "").trim());

const submitReset = async () => {
  if (!resetToken.value) {
    return displayErrorNotification("Missing reset token");
  }

  if (password.value.length < 8) {
    return displayErrorNotification("Password must be at least 8 characters");
  }

  if (password.value !== confirmPassword.value) {
    return displayErrorNotification("Passwords do not match");
  }

  loading.value = true;

  try {
    const response = await RequestToResetPassword({
      token: resetToken.value,
      password: password.value,
    });

    if (response.status === "failed") {
      return displayErrorNotification(
        response.message || "Unable to reset password"
      );
    }

    displaySuccessNotification(response.message || "Password reset successful");
    router.push({ name: "login" });
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

.reset-password {
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

.reset-password__card {
  display: flex;
  width: 100%;
  max-width: 900px;
  min-height: 500px;
  overflow: hidden;
  background: var(--white-color);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.reset-password__brand {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
  text-align: center;
  background: var(--gradient-primary);
}

.reset-password__logo {
  width: 180px;
  margin-bottom: var(--spacing-lg);
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
}

.reset-password__brand-text {
  opacity: 0.9;
}

.reset-password__form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-2xl);
}

.reset-password__form {
  width: 100%;
  max-width: 340px;
}

.reset-password__header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
}

.reset-password__title {
  margin-bottom: var(--spacing-xs);
  color: var(--dark-color);
}

.reset-password__subtitle {
  color: var(--primary-color);
}

.reset-password__fields {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.reset-password__field {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.reset-password__label {
  color: var(--dark-color);
  font-weight: var(--fw-medium);
}

.reset-password__password-control {
  position: relative;
}

.reset-password__input {
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

.reset-password__input--password {
  padding-right: calc(var(--spacing-lg) * 2.75);
}

.reset-password__input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring-color);
}

.reset-password__input::placeholder {
  color: var(--primary-color);
  opacity: 0.55;
}

.reset-password__password-toggle {
  position: absolute;
  top: 50%;
  right: var(--spacing-md);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: var(--primary-color);
  background: transparent;
  border: 1px solid transparent;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transform: translateY(-50%);
  transition: color var(--transition-normal) var(--ease-out),
    background-color var(--transition-normal) var(--ease-out),
    border-color var(--transition-normal) var(--ease-out);
}

.reset-password__password-toggle:hover {
  color: var(--dark-color);
  background-color: rgba(13, 148, 136, 0.08);
  border-color: rgba(13, 148, 136, 0.2);
}

.reset-password__password-toggle:focus-visible {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--focus-ring-color);
}

.reset-password__footer {
  margin-top: var(--spacing-xl);
  text-align: center;
}

.reset-password__link {
  color: var(--primary-color);
  text-decoration: none;
  transition: color var(--transition-normal) var(--ease-out);
}

.reset-password__link:hover {
  color: var(--dark-color);
}

.reset-password__fields :deep(.btn) {
  width: 100%;
}

@media (max-width: 768px) {
  .reset-password__card {
    flex-direction: column;
    max-width: 400px;
  }

  .reset-password__brand {
    padding: var(--spacing-xl);
  }

  .reset-password__logo {
    width: 120px;
  }

  .reset-password__form-panel {
    padding: var(--spacing-xl);
  }
}
</style>
