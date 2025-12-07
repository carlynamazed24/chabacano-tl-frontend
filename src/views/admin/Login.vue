<template>
  <div class="login">
    <div class="container">
      <div class="col">
        <div class="img-container">
          <img
            src="../../assets/images/chabacano_logo_white.png"
            alt="Chabcano Translator Logo"
          />
        </div>
      </div>
      <div class="col">
        <div class="form">
          <h1 class="fs-heading-5">Admin Login</h1>

          <div class="input-container">
            <div class="input">
              <label for="username" class="fs-body-text">Username</label>
              <input type="username" v-model="username" />
            </div>

            <div class="input">
              <label for="password" class="fs-body-text">Password</label>
              <input type="password" v-model="password" />
            </div>
          </div>

          <div class="btn">
            <Button
              :loadingState="btnLoadingState"
              btnType="btn-secondary"
              btnText="Login"
              size="lg"
              @click="login"
            />
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
  try {
    btnLoadingState.value = true;
    const payload = {
      username: username.value,
      password: password.value,
    };

    const response = await RequestToLogin(payload);

    if (response.status === "failed") {
      return displayErrorNotification(response.message);
    }

    router.push({ name: "cpanel" });
  } catch (error) {
    displayErrorNotification("Something went wrong");
    console.error(error);
  } finally {
    btnLoadingState.value = false;
  }
};
</script>

<style scoped>
@import "../../styles/variables.css";

.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login > .container {
  display: flex;
  height: 400px;
  width: 800px;
}

.login > .container > .col {
  width: 100%;
}

.login > .container > .col:nth-child(1) {
  background-color: var(--primary-color);
}

.login > .container > .col:nth-child(2) {
  border: 2px solid var(--light-color);
}

.login > .container > .col > .img-container {
  display: grid;
  place-items: center;
  height: 100%;
}

.login > .container > .col > .img-container > img {
  width: 300px;
}

.login > .container > .col:nth-child(2) > .form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3em;
  height: 100%;
}

.login > .container > .col:nth-child(2) > .form > .input-container {
  display: flex;
  flex-direction: column;
  gap: 1.5em;
}

.login
  > .container
  > .col:nth-child(2)
  > .form
  > .input-container
  > .input
  > label {
  display: block;
}

.login
  > .container
  > .col:nth-child(2)
  > .form
  > .input-container
  > .input
  > input {
  padding: 0.5em 1em;
  width: 300px;
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid var(--light-color);
}
</style>
