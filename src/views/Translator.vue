<template>
  <div class="section-bg">
    <div class="translator">
      <div class="col">
        <nav class="translator-nav">
          <ul>
            <li v-for="lang in languages" :key="`src-${lang}`">
              <button
                class="fs-body-text text-light"
                :class="{ active: selectedSrcLang === lang }"
                @click="handleSrcLanguageSelect(lang)"
              >
                {{ lang }}
              </button>
            </li>
          </ul>
        </nav>
        <div class="input-container">
          <textarea rows="3" v-model="textInput" @input="translateText">
          </textarea>
          <div class="actions">
            <button
              class="btn btn-primary"
              @click="toggleMicrophone"
              :class="{ 'mic-active': isRecording }"
            >
              <MicIcon
                :size="30"
                :color="isRecording ? '#FF6B6B' : '#EFE8DC'"
              />
            </button>
            <button class="btn btn-primary">
              <SpeakerIcon :size="30" :color="'#EFE8DC'" />
            </button>
            <button class="btn btn-primary">
              <CopyIcon :size="30" :color="'#EFE8DC'" @click="copySourceText" />
            </button>
          </div>
        </div>
      </div>
      <div class="col">
        <button @click="switchLanguages">
          <SwitchIcon :size="35" :color="'#EFE8DC'" />
        </button>
      </div>
      <div class="col">
        <nav class="translator-nav">
          <ul>
            <li v-for="lang in languages" :key="`target-${lang}`">
              <button
                class="fs-body-text text-light"
                :class="{ active: selectedTargetLang === lang }"
                @click="handleTargetLanguageSelect(lang)"
              >
                {{ lang }}
              </button>
            </li>
          </ul>
        </nav>
        <div class="input-container disabled">
          <textarea rows="3" disabled v-model="translatedText"></textarea>
          <div class="actions">
            <button class="btn btn-primary">
              <SpeakerIcon :size="30" :color="'#EFE8DC'" />
            </button>
            <button class="btn btn-primary">
              <CopyIcon :size="30" :color="'#EFE8DC'" @click="copyTargetText" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { RequestToTranslateText } from "../composables/Requests";

import SwitchIcon from "../components/icons/SwitchIcon.vue";
import MicIcon from "../components/icons/MicIcon.vue";
import SpeakerIcon from "../components/icons/SpeakerIcon.vue";
import CopyIcon from "../components/icons/CopyIcon.vue";
import { displayErrorNotification } from "../composables/services/notifications";

// Array of supported languages
const languages = ["Chabacano", "Tagalog", "English"];

// Reactive references for selected languages, text inputs, and UI state
const selectedSrcLang = ref("Chabacano");
const selectedTargetLang = ref("Tagalog");
const textInput = ref("");
const translatedText = ref("");
const isRecording = ref(false);

// Explicitly type audioStream as a MediaStream or null
const audioStream = ref<MediaStream | null>(null);
// Type timeouts as number or null (browser setTimeout returns number)
const microphoneTimeout = ref<number | null>(null);
const debounceTimeout = ref<number | null>(null);

// Example phrases for each language - shown after microphone recording
const examplePhrases: Record<string, string> = {
  Chabacano: "Buenas días, cómo está?",
  Tagalog: "Magandang araw, kumusta ka?",
  English: "Good day, how are you?",
};

const translateText = async () => {
  if (debounceTimeout.value !== null) {
    clearTimeout(debounceTimeout.value);
  }

  debounceTimeout.value = window.setTimeout(async () => {
    try {
      if (!textInput.value.trim()) {
        translatedText.value = "";
        return;
      }

      translatedText.value = "Translating text...";
      const payload = {
        text: textInput.value,
        model:
          `${selectedSrcLang.value}-to-${selectedTargetLang.value}`.toLowerCase(),
      };
      const response = await RequestToTranslateText(payload);

      if (response.status === "failed") {
        translatedText.value = "Error translating text";
        return;
      }

      translatedText.value = response.translation;
    } catch (error) {
      displayErrorNotification("Something went wrong");
      console.error(error);
    }
  }, 1000);
};

const toggleMicrophone = async () => {
  if (isRecording.value) {
    stopRecording();
  } else {
    await startRecording();
  }
};

const startRecording = async () => {
  try {
    // Request microphone access
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioStream.value = stream;
    isRecording.value = true;

    // Append "Listening..." to the existing text
    const originalText = textInput.value;
    textInput.value += (textInput.value ? " " : "") + "Listening...";

    // After a few seconds, simulate speech-to-text
    microphoneTimeout.value = window.setTimeout(() => {
      // Replace "Listening..." with an example phrase based on the source language
      textInput.value =
        originalText +
        (originalText ? " " : "") +
        examplePhrases[selectedSrcLang.value];
      translateText();

      // Stop recording after simulating speech input
      stopRecording();
    }, 3000);
  } catch (error) {
    console.error("Error accessing microphone:", error);
    displayErrorNotification("Could not access microphone");
  }
};

const stopRecording = () => {
  if (audioStream.value) {
    // Stop all audio tracks
    audioStream.value
      .getTracks()
      .forEach((track: MediaStreamTrack) => track.stop());
    audioStream.value = null;
  }

  isRecording.value = false;

  // Clear any pending timeouts
  if (microphoneTimeout.value !== null) {
    clearTimeout(microphoneTimeout.value);
    microphoneTimeout.value = null;
  }
};

// Clean up when the component is destroyed
onBeforeUnmount(() => {
  stopRecording();
});

const handleSrcLanguageSelect = (lang: string) => {
  if (lang === selectedTargetLang.value) {
    selectedTargetLang.value = selectedSrcLang.value;
  }
  selectedSrcLang.value = lang;
  resetInput();
};

const handleTargetLanguageSelect = (lang: string) => {
  if (lang === selectedSrcLang.value) {
    selectedSrcLang.value = selectedTargetLang.value;
  }
  selectedTargetLang.value = lang;
  resetInput();
};

const switchLanguages = () => {
  const textInputTemp = textInput.value;
  textInput.value = translatedText.value;
  translatedText.value = textInputTemp;

  const temp = selectedSrcLang.value;
  selectedSrcLang.value = selectedTargetLang.value;
  selectedTargetLang.value = temp;

  translateText();
};

const resetInput = () => {
  textInput.value = "";
  translatedText.value = "";
};

const copySourceText = async () => {
  await navigator.clipboard.writeText(textInput.value);
};

const copyTargetText = async () => {
  await navigator.clipboard.writeText(translatedText.value);
};
</script>

<style scoped>
@import "../styles/variables.css";

.translator {
  display: flex;
  justify-content: space-between;
  gap: 2em;
  width: 80%;
  z-index: 5;
}

.translator > .col {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 90%;
  height: 400px;
}

.translator > .col:nth-of-type(2) {
  width: 5%;
}

.translator > .col > .icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.translator > .col > .translator-nav > ul {
  display: flex;
  gap: 1em;
}

.translator > .col > .translator-nav > ul > li > button,
.translator > .col:nth-child(2) > button {
  background: none;
  border: none;
  cursor: pointer;
}

.translator > .col > .input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 1em;
  height: 100%;
  border: 1px solid var(--light-color);
  border-radius: 0.2rem;
}

.translator > .col > .input-container.disabled {
  background-color: #bda588cc;
}

.translator > .col > .input-container > textarea {
  display: block;
  width: 100%;
  height: 100%;
  background: transparent;
  outline: 0;
  border: 0;
  color: var(--light-color);
  padding: 1em;
  resize: none;
  overflow-y: auto;
  font-family: inherit;
  font-size: 1.5rem !important;
}

.translator > .col > .input-container > .actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.translator > .col > .input-container > .actions > button {
  padding: 0.5em;
  background: transparent;
  cursor: pointer;
  border: 0;
  outline: 0;
}

.translator > .col > .translator-nav > ul > li > button {
  position: relative;
  transition: color 0.3s ease;
}

.translator > .col > .translator-nav > ul > li > button:hover {
  color: var(--light-color);
}

.translator > .col > .translator-nav > ul > li > button.active {
  border-bottom: 2px solid var(--light-color);
}

.translator > .col > .input-container > .actions > button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.translator > .col:nth-child(2) > button:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

@media (max-width: 620px) {
  .translator {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 90%;
  }

  .translator > .col {
    justify-content: center;
    width: 100%;
    height: 230px;
  }

  .translator > .col:nth-of-type(2) {
    width: 100%;
    height: fit-content;
  }
}

.mic-active {
  background-color: rgba(255, 107, 107, 0.2);
}
</style>
