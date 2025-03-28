<template>
  <div class="modal-backdrop" @click="closeModal">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-title text-center">
          <h1 class="fs-heading-5">About Developers</h1>
          <p class="fs-small-text">
            Passionate Minds Preserving Chabacano Through Technology.
          </p>
        </div>

        <div class="modal-body">
          <div
            v-for="developer in developerProfiles"
            :key="developer.id"
            class="modal-card"
          >
            <div class="modal-card-profile">
              <div class="img-container">
                <img :src="developer.profilePic" :alt="developer.name" />
              </div>
            </div>
            <div class="modal-card-body text-center">
              <h3 class="fs-heading-6">{{ developer.name }}</h3>
            </div>

            <div class="modal-card-footer">
              <a :href="developer.socialMediaLinks.fb" target="_blank">
                <FacebookIcon :size="20" />
              </a>
              <a :href="developer.socialMediaLinks.ig" target="_blank">
                <InstagramIcon :size="20" />
              </a>
              <a :href="developer.socialMediaLinks.gmail" target="_blank">
                <GmailIcon :size="20" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FacebookIcon from "../icons/FacebookIcon.vue";
import InstagramIcon from "../icons/InstagramIcon.vue";
import GmailIcon from "../icons/GmailIcon.vue";

import DarlynValeroPic from "../../assets/images/developer_pic_darlyn_valero.png";
import EdnalynCariasPic from "../../assets/images/developer_pic_ednalyn_carias.png";
import MicaUyPic from "../../assets/images/developer_pic_mica_uy.png";

const emits = defineEmits<{
  (e: "close-modal"): void;
}>();

const closeModal = () => {
  console.log("close modal");
  emits("close-modal");
};

const developerProfiles = [
  {
    id: 1,
    name: "Darlyn Valero",
    socialMediaLinks: {
      fb: "https://www.facebook.com/valerodarlyn",
      ig: "https://www.instagram.com/iamdaaarlyn",
      gmail: "darlynvalero123@gmail.com",
    },
    profilePic: DarlynValeroPic,
  },
  {
    id: 2,
    name: "Ednalyn Carias",
    socialMediaLinks: {
      fb: "https://www.facebook.com/ednalyn.sales.52",
      ig: "https://www.instagram.com/ednalyncarias",
      gmail: "cariasednalyn@gmail.com",
    },
    profilePic: EdnalynCariasPic,
  },
  {
    id: 3,
    name: "Mica Uy",
    socialMediaLinks: {
      fb: "https://www.facebook.com/micaycay20",
      ig: "https://www.instagram.com/sciiiiiiim",
      gmail: "micauy2@gmail.com",
    },
    profilePic: MicaUyPic,
  },
];
</script>

<style scoped>
@import "../../styles/variables.css";

.modal-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #1e1e1e60;
  z-index: 500;
}

.modal-backdrop > .modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  padding: 2em 0;
  border-radius: 8px;
  background-color: white;
}

.modal-backdrop > .modal > .modal-content {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.modal-backdrop > .modal > .modal-content > .modal-title > h1 {
  margin-bottom: 0.5em;
}

.modal-backdrop > .modal > .modal-content > .modal-body {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 3em;
}

.modal-backdrop > .modal > .modal-content > .modal-body > .modal-card {
  border: 1px solid var(--accent-2-color);
  border-radius: 8px;
  padding: 1em 2em;
}

.modal-backdrop
  > .modal
  > .modal-content
  > .modal-body
  > .modal-card
  > .modal-card-profile
  > .img-container
  > img {
  width: 200px;
  border-radius: 50%;
}

.modal-backdrop
  > .modal
  > .modal-content
  > .modal-body
  > .modal-card
  > .modal-card-footer {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 1em;
}

.modal-backdrop
  > .modal
  > .modal-content
  > .modal-body
  > .modal-card
  > .modal-card-body {
  margin: 0.5em 0;
}

.modal-backdrop
  > .modal
  > .modal-content
  > .modal-body
  > .modal-card
  > .modal-card-footer
  > a {
  display: block;
}

@media (max-width: 768px) {
  .modal-backdrop > .modal {
    width: 90%;
  }
}

@media (max-width: 650px) {
  .modal-backdrop > .modal > .modal-content > .modal-body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    gap: 1em;
  }
}
</style>
