<template>
  <div class="section-bg">
    <div class="translator fade-in">
      <!-- Source Panel -->
      <div
        class="translator__panel"
        :class="{ 'translator__panel--active': isRecording }"
      >
        <!-- Language Dropdown -->
        <div class="translator__header">
          <select
            v-model="selectedSrcLang"
            @change="handleSrcLanguageChange"
            class="translator__select"
          >
            <option value="Chabacano">Chabacano</option>
            <option value="Tagalog">Tagalog</option>
            <option value="English">English</option>
          </select>
        </div>

        <!-- Text Area -->
        <div class="translator__body">
          <textarea
            class="translator__textarea"
            v-model="textInput"
            @input="translateText"
            placeholder="Isulat mo..."
          ></textarea>
        </div>

        <!-- Action Buttons -->
        <div class="translator__footer">
          <button
            class="translator__btn translator__btn--clear"
            @click="clearInput"
          >
            <span class="btn-text">Clear</span>
          </button>
        </div>
      </div>

      <!-- Switch Button -->
      <div class="translator__switch-col">
        <button
          class="translator__switch-btn"
          @click="switchLanguages"
          type="button"
          aria-label="Switch languages"
          title="Switch languages"
        >
          <SwitchIcon :size="28" :color="'#1a1a1a'" />
        </button>
      </div>

      <!-- Target Panel -->
      <div class="translator__panel translator__panel--target">
        <!-- Language Dropdown -->
        <div class="translator__header">
          <select
            v-model="selectedTargetLang"
            @change="handleTargetLanguageChange"
            class="translator__select"
          >
            <option value="Chabacano">Chabacano</option>
            <option value="Tagalog">Tagalog</option>
            <option value="English">English</option>
          </select>
        </div>

        <!-- Text Area -->
        <div class="translator__body">
          <textarea
            class="translator__textarea"
            disabled
            v-model="translatedText"
            placeholder="Translation will appear here..."
          ></textarea>

          <!-- Audio Icons -->
          <div class="translator__audio-controls">
            <button
              class="translator__audio-btn"
              @click="speakTranslatedText"
              aria-label="Speak translated text"
            >
              <SpeakerIcon :size="20" :color="'#1a1a1a'" />
            </button>
            <button
              class="translator__audio-btn"
              @click="copyTargetText"
              aria-label="Copy translated text"
            >
              <CopyIcon :size="20" :color="'#1a1a1a'" />
            </button>
          </div>
        </div>

        <!-- Translate Button -->
        <div class="translator__footer">
          <button
            class="translator__btn translator__btn--translate"
            @click="translateText"
          >
            <span class="btn-text">Translate</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted } from "vue";
import { RequestToTranslateText } from "../composables/API/Translation";
import { displayErrorNotification } from "../composables/services/notifications";
import SpeakerIcon from "../components/icons/SpeakerIcon.vue";
import CopyIcon from "../components/icons/CopyIcon.vue";
import SwitchIcon from "../components/icons/SwitchIcon.vue";

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

const handleSrcLanguageChange = () => {
  if (selectedSrcLang.value === selectedTargetLang.value) {
    // Swap to prevent same language on both sides
    selectedTargetLang.value =
      selectedSrcLang.value === "Chabacano" ? "Tagalog" : "Chabacano";
  }
  translateText();
};

const handleTargetLanguageChange = () => {
  if (selectedTargetLang.value === selectedSrcLang.value) {
    // Swap to prevent same language on both sides
    selectedSrcLang.value =
      selectedTargetLang.value === "Chabacano" ? "Tagalog" : "Chabacano";
  }
  translateText();
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

const clearInput = () => {
  textInput.value = "";
  translatedText.value = "";
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
  // Stop any ongoing speech recognition
  try {
    recognition.stop();
  } catch (error) {
    // Ignore errors when stopping
  }
  isRecording.value = false;
  stopSpeech();
});
</script>

<style scoped>
@import "../styles/tokens/colors.css";
@import "../styles/tokens/typography.css";
@import "../styles/tokens/spacing.css";
@import "../styles/tokens/animations.css";
@import "../styles/tokens/breakpoints.css";

/* Background Section */
.section-bg {
  background: var(--overlay-color);
  background-image: url("../assets/images/chabacano_translator_hero_bg.png");
  background-size: cover;
  background-position: center;
  background-blend-mode: overlay;
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 100px 20px;
}

/* Translator Container */
.translator {
  display: flex;
  gap: 20px;
  width: 100%;
  max-width: 1100px;
  align-items: center;
  animation: fadeIn var(--transition-slow) ease-out;
}

/* Switch Button Column */
.translator__switch-col {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  z-index: 10;
}

.translator__switch-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: #ffffff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  position: relative;
}

.translator__switch-btn:hover {
  background: #f5f5f5;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.translator__switch-btn:hover svg {
  transform: rotate(180deg);
}

.translator__switch-btn svg {
  transition: transform 0.3s ease;
}

.translator__switch-btn:active {
  transform: scale(0.95);
}

/* Panel Styles */
.translator__panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: transparent;
  border-radius: 12px;
}

.translator__panel--active {
  box-shadow: 0 0 20px rgba(255, 107, 107, 0.4);
}

/* Header with Dropdown */
.translator__header {
  padding: 0;
  margin-bottom: 12px;
  position: relative;
  z-index: 5;
}

.translator__select {
  width: 100%;
  padding: 16px 20px;
  font-size: 1.1rem;
  font-weight: 600;
  font-family: inherit;
  color: #1a1a1a;
  background-color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  position: relative;
  z-index: 5;
}

.translator__select option {
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  background-color: #ffffff;
  padding: 12px;
}

.translator__select:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.translator__select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.2);
}

/* Body - Textarea Container */
.translator__body {
  position: relative;
  flex: 1;
  background-color: rgba(255, 255, 255, 0.98);
  border-radius: 10px;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(0, 0, 0, 0.08);
}

.translator__textarea {
  flex: 1;
  width: 100%;
  padding: 20px;
  font-size: 1.15rem;
  font-family: inherit;
  color: #1a1a1a;
  background: transparent;
  border: none;
  resize: none;
  outline: none;
  line-height: 1.7;
}

.translator__textarea::placeholder {
  color: #888;
  font-size: 1.1rem;
}

.translator__textarea:disabled {
  color: #1a1a1a;
  background: transparent;
}

/* Audio Controls */
.translator__audio-controls {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 8px;
}

.translator__audio-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.translator__audio-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

/* Footer with Buttons */
.translator__footer {
  margin-top: 14px;
  display: flex;
  justify-content: center;
}

.translator__btn {
  padding: 14px 40px;
  font-size: 1.05rem;
  font-family: inherit;
  font-weight: 600;
  border-radius: 25px;
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.translator__btn--clear {
  background: transparent;
  color: var(--light-color);
  border: 1.5px solid var(--light-color);
}

.translator__btn--clear:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.translator__btn--translate {
  background: transparent;
  color: var(--light-color);
  border: 1.5px solid var(--light-color);
}

.translator__btn--translate:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Responsive Styling */
@media (max-width: 768px) {
  .section-bg {
    padding: 80px 16px 40px;
    min-height: auto;
  }

  .translator {
    flex-direction: column;
    gap: 16px;
  }

  .translator__switch-col {
    order: 1;
  }

  .translator__panel:first-child {
    order: 0;
  }

  .translator__panel:last-child {
    order: 2;
  }

  .translator__switch-btn {
    width: 44px;
    height: 44px;
    transform: rotate(90deg);
  }

  .translator__switch-btn:hover {
    transform: rotate(90deg) scale(1.1);
  }

  .translator__panel {
    min-height: auto;
  }

  .translator__body {
    min-height: 150px;
  }

  .translator__select {
    padding: 14px 16px;
    font-size: 1rem;
  }

  .translator__textarea {
    min-height: 120px;
  }

  .translator__btn {
    padding: 10px 28px;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .section-bg {
    padding: 70px 12px 30px;
  }

  .translator {
    gap: 16px;
  }

  .translator__body {
    min-height: 130px;
  }

  .translator__textarea {
    padding: 12px;
    font-size: 0.95rem;
    min-height: 100px;
  }

  .translator__audio-controls {
    bottom: 8px;
    right: 8px;
  }

  .translator__audio-btn {
    width: 32px;
    height: 32px;
  }

  .translator__btn {
    padding: 8px 20px;
  }
}
</style>
