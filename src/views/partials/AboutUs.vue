<template>
  <section class="about-us">
    <div class="about">
      <div class="col">
        <h1 class="fs-heading-3">About Us</h1>
        <p class="fs-body-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae,
          iure at a distinctio, explicabo officia repellendus architecto nobis,
          nulla natus odit quaerat blanditiis fuga ducimus corporis repellat
          ipsum praesentium deserunt.
        </p>
      </div>

      <div class="col">
        <h2 class="fs-heading-6">Our Mission</h2>
        <p class="fs-small-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum
          dolor sit amet, consectetur adipiscing elit, Lorem ipsum dolor sit
          amet, consectetur adipiscing elit, Lorem ipsum dolor sit amet,
          consectetur adipiscing elit,
        </p>
      </div>

      <div class="col">
        <h2 class="fs-heading-6">Our Vission</h2>
        <p class="fs-small-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt hic
          vero similique reprehenderit repellendus. Porro, nam qui, pariatur ea
          aspernatur blanditiis adipisci natus voluptates neque est error nihil
          accusantium exercitationem.
        </p>
      </div>

      <div class="col">
        <h2 class="fs-heading-6">Why Chabacano?</h2>
        <p class="fs-small-text">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt hic
          vero similique reprehenderit repellendus. Porro, nam qui, pariatur ea
          aspernatur blanditiis adipisci natus voluptates neque est error nihil
          accusantium exercitationem.
        </p>
      </div>
    </div>
    <div class="img">
      <img
        src="../../assets/images/monument_about_us_pic.png"
        alt="Cavite Monument"
        loading="lazy"
      />
    </div>
  </section>
</template>

<style scoped>
@import "../../styles/variables.css";

.about-us {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5em;
  padding: 5em 2em;
  background-color: var(--accent-2-color);
}

.about-us > .about {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.about-us > .about > .col > p {
  margin-block: 1em;
}

@media (max-width: 768px) {
  .about-us {
    flex-direction: column-reverse;
  }

  .about-us > .img > img {
    width: 100%;
  }
}
</style>
