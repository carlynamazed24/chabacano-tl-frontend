<template>
  <aside class="sidebar">
    <div class="col">
      <div class="img-container">
        <img
          src="../assets/images/chabacano_translator_v2.png"
          alt="Chabacano Logo V2"
        />
      </div>

      <div class="nav-list">
        <router-link
          :to="{ name: 'content-editor' }"
          class="nav-item fs-body-text"
          active-class="active"
        >
          <span class="text-light">Pages</span>
        </router-link>

        <router-link
          :to="{ name: 'dictionary-editor' }"
          class="nav-item fs-body-text"
          active-class="active"
        >
          <span class="text-light">Dictionary</span>
        </router-link>
      </div>
    </div>

    <div class="btn">
      <router-link
        :to="{ name: 'login' }"
        class="nav-item fs-body-text"
        active-class="active"
      >
        <span class="text-light">Logout</span>
      </router-link>
    </div>
  </aside>
</template>

<style scoped>
@import "../styles/variables.css";

.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 250px;
  padding-block: 2em;
  background-color: var(--primary-color);
}

.sidebar > .col {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.sidebar > .col > .img-container > img {
  width: 200px;
}

.sidebar > .col > .nav-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sidebar > .col > .nav-list > .nav-item {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.3s;
}
</style>
