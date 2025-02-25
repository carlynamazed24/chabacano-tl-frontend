<template>
  <section class="cta">
    <div class="col">
      <h1 class="fs-heading-4">Discover the Beauty of Chabacano</h1>
      <p class="fs-body-text">
        Effortlessly translate between Chabacano, English, and Tagalog. Bridge
        cultures and languages with our simple yet powerful translator.
      </p>
    </div>

    <div class="col">
      <Button
        :btnType="'btn-outline'"
        :btnText="'Translate Now'"
        :path="'translator'"
        size="lg"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import Button from "../../components/Button.vue";
</script>

<style scoped>
@import "../../styles/variables.css";

.cta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5em 0;

  gap: 2em;
}

.cta > .col {
  text-align: center;
}

.cta > .col > p {
  margin-top: 2em;
}
</style>
