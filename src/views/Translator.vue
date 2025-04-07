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
          <textarea
            rows="3"
            v-model="textInput"
            @input="translateText"
          ></textarea>
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
            <button class="btn btn-primary" @click="speakSourceText">
              <SpeakerIcon :size="30" :color="'#EFE8DC'" />
            </button>
            <button class="btn btn-primary" @click="copySourceText">
              <CopyIcon :size="30" :color="'#EFE8DC'" />
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
            <button class="btn btn-primary" @click="speakTranslatedText">
              <SpeakerIcon :size="30" :color="'#EFE8DC'" />
            </button>
            <button class="btn btn-primary" @click="copyTargetText">
              <CopyIcon :size="30" :color="'#EFE8DC'" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import { RequestToTranslateText } from "../composables/API/Translation";
import { displayErrorNotification } from "../composables/services/notifications";
import SwitchIcon from "../components/icons/SwitchIcon.vue";
import MicIcon from "../components/icons/MicIcon.vue";
import SpeakerIcon from "../components/icons/SpeakerIcon.vue";
import CopyIcon from "../components/icons/CopyIcon.vue";

// Define ResponsiveVoice interface
declare global {
  interface Window {
    responsiveVoice?: {
      speak: (text: string, voice: string, options?: object) => void;
      cancel: () => void;
      isPlaying: () => boolean;
      getVoices: () => string[];
    };
    SpeechRecognition?: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition?: {
      new (): SpeechRecognition;
    };
  }
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: { transcript: string; confidence: number };
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

// Array of supported languages
const languages = ["Chabacano", "Tagalog", "English"];

// Reactive references
const selectedSrcLang = ref("Chabacano");
const selectedTargetLang = ref("Tagalog");
const textInput = ref("");
const translatedText = ref("");
const isRecording = ref(false);
const debounceTimeout = ref<number | null>(null);
const isSpeaking = ref(false);

// Map languages to ResponsiveVoice voices
const getVoiceForLanguage = (lang: string) => {
  switch (lang) {
    case "Chabacano":
      return "Spanish Latin American Female";
    case "Tagalog":
      return "Filipino Female";
    case "English":
      return "UK English Female";
    default:
      return "UK English Female";
  }
};

let recognition: SpeechRecognition;

try {
  const SpeechRecognitionConstructor =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognitionConstructor) {
    throw new Error("Speech Recognition API not supported");
  }

  recognition = new SpeechRecognitionConstructor();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = "en-US";

  // Handle speech recognition result
  recognition.onresult = (event: SpeechRecognitionEvent) => {
    const transcript = event.results[0][0].transcript;
    textInput.value = transcript;
    translateText();
  };

  recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    console.error("Speech recognition error:", event.error);
    displayErrorNotification("Failed to recognize speech");
    isRecording.value = false;
  };

  recognition.onend = () => {
    isRecording.value = false;
  };
} catch (error) {
  console.error("Speech recognition not supported:", error);
  recognition = {
    continuous: false,
    interimResults: false,
    lang: "en-US",
    onerror: null,
    onresult: null,
    onend: null,
    start: () =>
      displayErrorNotification(
        "Speech recognition not supported in this browser"
      ),
    stop: () => {},
    addEventListener: () => {},
    dispatchEvent: () => true,
    removeEventListener: () => {},
  } as SpeechRecognition;
}

// Toggle microphone
const toggleMicrophone = () => {
  if (isRecording.value) {
    stopRecording();
  } else {
    startRecording();
  }
};

// Start recording
const startRecording = () => {
  // Check if the Speech Recognition API is supported
  if (!(window.SpeechRecognition || window.webkitSpeechRecognition)) {
    alert("Speech recognition is not supported in this browser.");
    return;
  }
  try {
    // Set recognition language based on selected source language
    recognition.lang = selectedSrcLang.value === "Tagalog" ? "fil-PH" : "en-US";
    recognition.start();
    isRecording.value = true;
  } catch (error) {
    console.error("Error starting speech recognition:", error);
    displayErrorNotification("Could not start speech recognition");
    isRecording.value = false;
  }
};

// Stop recording
const stopRecording = () => {
  try {
    recognition.stop();
  } catch (error) {
    console.error("Error stopping speech recognition:", error);
  }
  isRecording.value = false;
};

// Speak text using ResponsiveVoice
const speakText = (text: string, lang: string) => {
  if (!text) return;

  if (!window.responsiveVoice) {
    alert(
      "ResponsiveVoice is not loaded. Please check your API key and connection."
    );
    // Fall back to native speech synthesis
    speakTextFallback(text, lang);
    return;
  }

  try {
    // Cancel any ongoing speech
    if (window.responsiveVoice.isPlaying()) {
      window.responsiveVoice.cancel();
    }

    const voice = getVoiceForLanguage(lang);
    window.responsiveVoice.speak(text, voice, {
      pitch: 1,
      rate: 1,
      volume: 1,
      onstart: () => {
        isSpeaking.value = true;
      },
      onend: () => {
        isSpeaking.value = false;
      },
      onerror: (error: any) => {
        console.error("ResponsiveVoice error:", error);
        isSpeaking.value = false;
      },
    });
  } catch (error) {
    console.error("ResponsiveVoice error:", error);
    displayErrorNotification("Text-to-speech failed");
    // Try fallback
    speakTextFallback(text, lang);
  }
};

// Fallback to native SpeechSynthesis if ResponsiveVoice fails
const speakTextFallback = (text: string, lang: string) => {
  if (!window.speechSynthesis) {
    alert("Text-to-speech is not supported in this browser.");
    return;
  }

  try {
    const utterance = new SpeechSynthesisUtterance(text);

    if (lang === "Tagalog") {
      utterance.lang = "fil-PH";
    } else if (lang === "Chabacano") {
      utterance.lang = "es-ES";
    } else {
      utterance.lang = "en-US";
    }

    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.error("Speech synthesis error:", error);
    displayErrorNotification("Text-to-speech failed");
  }
};

const speakSourceText = () => {
  speakText(textInput.value, selectedSrcLang.value);
};

const speakTranslatedText = () => {
  speakText(translatedText.value, selectedTargetLang.value);
};

// Translation function
const translateText = async () => {
  if (debounceTimeout.value !== null) {
    clearTimeout(debounceTimeout.value);
  }

  debounceTimeout.value = window.setTimeout(async () => {
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
    if (response.err !== null) {
      translatedText.value = "Error translating text";
      return;
    }
    translatedText.value = response?.translation ?? response.result;
  }, 1000);
};

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

// Stop any ongoing speech when component is unmounted
const stopSpeech = () => {
  if (window.responsiveVoice && window.responsiveVoice.isPlaying()) {
    window.responsiveVoice.cancel();
  } else if (window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

onMounted(() => {
  // Check if ResponsiveVoice is available
  if (!window.responsiveVoice) {
    console.warn(
      "ResponsiveVoice is not available. Make sure to include the script in your HTML."
    );
  } else {
    console.log(
      "ResponsiveVoice available voices:",
      window.responsiveVoice.getVoices()
    );
  }
});

onBeforeUnmount(() => {
  stopRecording();
  stopSpeech();
});
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
