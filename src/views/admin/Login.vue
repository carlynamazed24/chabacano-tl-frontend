<template>
  <div class="login">
    <div class="container">
      <div class="col">
        <div class="img-container">
          <img
            src="../../assets/images/chabacano_logo.png"
            alt="Chabcano Translator Logo"
          />
        </div>
      </div>
      <div class="col">
        <div class="form">
          <h1 class="fs-heading-5">Admin Login</h1>

          <div class="input-container">
            <div class="input">
              <label for="email" class="fs-body-text">Username</label>
              <input type="email" />
            </div>

            <div class="input">
              <label for="password" class="fs-body-text">Password</label>
              <input type="password" />
            </div>
          </div>

          <div class="btn">
            <Button btnType="btn-secondary" btnText="Login" size="lg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "../../components/Button.vue";
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
