<template>
  <div class="section-bg">
    <div class="translator fade-in">
      <div
        class="col translator__panel"
        :class="{ 'translator__panel--active': isRecording }"
      >
        <nav class="translator-nav">
          <ul class="translator-nav__list">
            <li v-for="lang in languages" :key="`src-${lang}`">
              <button
                class="translator-nav__btn fs-body-text text-light"
                :class="{
                  'translator-nav__btn--active': selectedSrcLang === lang,
                }"
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
            class="translator__textarea"
            v-model="textInput"
            @input="translateText"
            placeholder="Enter text to translate..."
          ></textarea>
          <div class="actions translator__actions">
            <button
              class="btn btn-primary translator__action-btn"
              @click="toggleMicrophone"
              :class="{ 'mic-active': isRecording }"
              aria-label="Record speech"
            >
              <MicIcon
                :size="30"
                :color="isRecording ? '#FF6B6B' : '#EFE8DC'"
              />
              <span class="btn-highlight"></span>
            </button>
            <button
              class="btn btn-primary translator__action-btn"
              @click="speakSourceText"
              aria-label="Speak source text"
            >
              <SpeakerIcon :size="30" :color="'#EFE8DC'" />
              <span class="btn-highlight"></span>
            </button>
            <button
              class="btn btn-primary translator__action-btn"
              @click="copySourceText"
              aria-label="Copy source text"
            >
              <CopyIcon :size="30" :color="'#EFE8DC'" />
              <span class="btn-highlight"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="col translator__switch-col">
        <button
          class="translator__switch-btn"
          @click="switchLanguages"
          aria-label="Switch languages"
          title="Switch languages"
        >
          <SwitchIcon
            :size="24"
            :color="'#EFE8DC'"
            class="translator__switch-icon"
          />
        </button>
      </div>
      <div class="col translator__panel">
        <nav class="translator-nav">
          <ul class="translator-nav__list">
            <li v-for="lang in languages" :key="`target-${lang}`">
              <button
                class="translator-nav__btn fs-body-text text-light"
                :class="{
                  'translator-nav__btn--active': selectedTargetLang === lang,
                }"
                @click="handleTargetLanguageSelect(lang)"
              >
                {{ lang }}
              </button>
            </li>
          </ul>
        </nav>
        <div class="input-container disabled">
          <textarea
            rows="3"
            class="translator__textarea"
            disabled
            v-model="translatedText"
            placeholder="Translation will appear here..."
          ></textarea>
          <div class="actions translator__actions">
            <button
              class="btn btn-primary translator__action-btn"
              @click="speakTranslatedText"
              aria-label="Speak translated text"
            >
              <SpeakerIcon :size="30" :color="'#EFE8DC'" />
              <span class="btn-highlight"></span>
            </button>
            <button
              class="btn btn-primary translator__action-btn"
              @click="copyTargetText"
              aria-label="Copy translated text"
            >
              <CopyIcon :size="30" :color="'#EFE8DC'" />
              <span class="btn-highlight"></span>
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
@import "../styles/tokens/colors.css";
@import "../styles/tokens/typography.css";
@import "../styles/tokens/spacing.css";
@import "../styles/tokens/animations.css";
@import "../styles/tokens/breakpoints.css";

.section-bg {
  background-color: rgba(142, 125, 107, 0.9);
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
  overflow-x: hidden;
}

.translator {
  display: flex;
  justify-content: space-between;
  width: 85%;
  max-width: 1200px;
  min-height: 380px;
  gap: 20px;
  animation: fadeIn var(--transition-slow) ease-out;
}

.col {
  display: flex;
  flex-direction: column;
}

.translator__panel {
  flex: 1;
  position: relative;
  transition: transform var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
}

.translator__panel--active {
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.4);
}

.translator__switch-col {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  flex-shrink: 0;
}

.translator__switch-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid var(--light-color);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: 50%;
  transition: background-color var(--transition-normal) var(--ease-out),
    transform var(--transition-normal) var(--ease-out),
    border-color var(--transition-normal) var(--ease-out);
  pointer-events: auto;
  z-index: 10;
}

.translator__switch-icon {
  transition: transform var(--transition-slow) var(--ease-out);
}

.translator__switch-btn:hover {
  background-color: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
  border-color: var(--accent-2-color);
}

.translator__switch-btn:hover .translator__switch-icon {
  transform: rotate(180deg);
}

.translator__switch-btn:active {
  transform: scale(0.95);
  background-color: rgba(255, 255, 255, 0.3);
}

/* Navigation */
.translator-nav__list {
  display: flex;
  gap: var(--spacing-md);
  padding: 0;
  margin: 0;
  list-style-type: none;
}

.translator-nav__btn {
  position: relative;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--spacing-xs) var(--spacing-sm);
  transition: color var(--transition-normal) var(--ease-out);
}

.translator-nav__btn::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--light-color);
  transition: width var(--transition-normal) var(--ease-out);
}

.translator-nav__btn:hover::after {
  width: 100%;
}

.translator-nav__btn--active::after {
  width: 100%;
}

/* Input Containers */
.input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: var(--spacing-md);
  height: 100%;
  border: 1px solid var(--light-color);
  border-radius: var(--border-radius-sm);
  transition: transform var(--transition-normal) var(--ease-out),
    box-shadow var(--transition-normal) var(--ease-out);
  overflow: hidden;
}

.input-container.disabled {
  background-color: rgba(189, 165, 136, 0.8);
}

.translator__textarea {
  display: block;
  width: 100%;
  height: 100%;
  background: transparent;
  outline: 0;
  border: 0;
  color: var(--light-color);
  padding: var(--spacing-md);
  resize: none;
  overflow-y: auto;
  font-family: inherit;
  font-size: 1.1rem !important;
  line-height: 1.6;
}

.translator__textarea::placeholder {
  color: rgba(239, 232, 220, 0.6);
}

/* Action Buttons */
.translator__actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: var(--spacing-xs);
  background-color: rgba(0, 0, 0, 0.1);
}

.translator__action-btn {
  position: relative;
  padding: var(--spacing-xs);
  margin: 0 var(--spacing-xs);
  background: transparent;
  cursor: pointer;
  border: 0;
  outline: 0;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  transition: background-color var(--transition-fast) var(--ease-out);
}

.translator__action-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mic Active State */
.mic-active {
  background-color: rgba(255, 107, 107, 0.2) !important;
  box-shadow: 0 0 12px rgba(255, 107, 107, 0.3);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 107, 107, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 107, 107, 0);
  }
}

/* Responsive Styling */
@media (max-width: 1024px) {
  .translator {
    width: 90%;
    gap: 15px;
  }

  .translator__textarea {
    padding: var(--spacing-sm);
  }
}

@media (max-width: 768px) {
  .section-bg {
    padding: 80px var(--spacing-md) 40px;
    min-height: auto;
  }

  .translator {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 0;
    width: 100%;
    min-height: auto;
  }

  .translator > .col.translator__panel {
    width: 100%;
    min-height: 220px;
    height: auto;
  }

  .translator__switch-col {
    width: 100%;
    height: auto;
    padding: var(--spacing-sm) 0;
    order: 1;
  }

  .translator__panel:first-child {
    order: 0;
  }

  .translator__panel:last-child {
    order: 2;
  }

  .translator__switch-btn {
    transform: rotate(90deg);
    padding: var(--spacing-md);
    background: rgba(255, 255, 255, 0.15);
  }

  .translator__switch-btn:hover,
  .translator__switch-btn:active {
    transform: rotate(90deg) scale(1.1);
    background: rgba(255, 255, 255, 0.25);
  }

  .translator__switch-btn:active .translator__switch-icon,
  .translator__switch-btn:hover .translator__switch-icon {
    transform: rotate(180deg);
  }

  .translator-nav__list {
    justify-content: center;
    flex-wrap: wrap;
  }

  .input-container {
    min-height: 150px;
  }

  .translator__textarea {
    min-height: 100px;
  }
}

@media (max-width: 480px) {
  .section-bg {
    padding: 70px var(--spacing-sm) 30px;
  }

  .translator {
    width: 100%;
    gap: 0;
  }

  .translator > .col.translator__panel {
    min-height: 180px;
  }

  .translator-nav__list {
    gap: var(--spacing-xs);
    justify-content: center;
  }

  .translator-nav__btn {
    padding: var(--spacing-xs);
    font-size: var(--fs-small-text);
  }

  .translator__textarea {
    font-size: 0.95rem !important;
    padding: var(--spacing-sm);
    min-height: 80px;
  }

  .translator__actions {
    padding: var(--spacing-xs);
    gap: var(--spacing-xs);
  }

  .translator__action-btn {
    padding: var(--spacing-xs);
    margin: 0;
  }

  .translator__switch-col {
    padding: var(--spacing-xs) 0;
  }

  .translator__switch-btn {
    padding: var(--spacing-sm);
  }

  .input-container {
    min-height: 120px;
  }
}
</style>
