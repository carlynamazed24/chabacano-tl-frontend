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
            @input="handleTextInput"
            :maxlength="maxCharacters"
            :placeholder="sourcePlaceholder"
          ></textarea>

          <!-- Source Audio Controls -->
          <div
            class="translator__audio-controls translator__audio-controls--source"
          >
            <button
              class="translator__audio-btn"
              :class="{ 'translator__audio-btn--recording': isRecording }"
              @click="toggleRecording"
              aria-label="Voice input"
              :title="isRecording ? 'Stop recording' : 'Start voice input'"
            >
              <MicIcon
                :size="20"
                :color="isRecording ? '#ffffff' : '#1a1a1a'"
              />
            </button>
            <button
              class="translator__audio-btn"
              @click="copySourceText"
              aria-label="Copy source text"
            >
              <CopyIcon :size="20" :color="'#1a1a1a'" />
            </button>
          </div>

          <!-- Character Counter -->
          <div
            class="translator__char-counter"
            :class="{ 'translator__char-counter--limit': isAtLimit }"
          >
            {{ textInput.length }} / {{ maxCharacters.toLocaleString() }}
          </div>
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
      <div
        class="translator__panel translator__panel--target"
        :aria-busy="isTranslating"
      >
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
            :placeholder="targetPlaceholder"
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, onMounted, computed } from "vue";
import { RequestToTranslateText } from "../composables/API/Translation";
import { displayErrorNotification } from "../composables/services/notifications";
import SpeakerIcon from "../components/icons/SpeakerIcon.vue";
import CopyIcon from "../components/icons/CopyIcon.vue";
import SwitchIcon from "../components/icons/SwitchIcon.vue";
import MicIcon from "../components/icons/MicIcon.vue";

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

type Language = "Chabacano" | "Tagalog" | "English";

// Constants
const maxCharacters = 3000;
const translationDebounceMs = 600;
const translatingMessage = "Translating text...";
const translationErrorMessage = "Error translating text";
const translationStatusMessages = new Set([
  translatingMessage,
  translationErrorMessage,
]);
const languagePlaceholders: Record<
  "source" | "target",
  Record<Language, string>
> = {
  source: {
    Chabacano: "Escribi aqui...",
    Tagalog: "Isulat dito...",
    English: "Type here...",
  },
  target: {
    Chabacano: "Aqui aparece el traduccion...",
    Tagalog: "Dito lalabas ang salin...",
    English: "Translation will appear here...",
  },
};

// Reactive references
const selectedSrcLang = ref<Language>("Chabacano");
const selectedTargetLang = ref<Language>("Tagalog");
const textInput = ref("");
const translatedText = ref("");
const isRecording = ref(false);
const debounceTimeout = ref<number | null>(null);
const isSpeaking = ref(false);
const isTranslating = ref(false);
const queuedTranslationKey = ref("");
const activeTranslationKey = ref("");

let latestTranslationRequestId = 0;
let activeTranslationController: AbortController | null = null;
const translationCache = new Map<string, string>();

// Computed property for character limit check
const isAtLimit = computed(() => textInput.value.length >= maxCharacters);
const sourcePlaceholder = computed(
  () => languagePlaceholders.source[selectedSrcLang.value]
);
const targetPlaceholder = computed(
  () => languagePlaceholders.target[selectedTargetLang.value]
);

// Map languages to ResponsiveVoice voices
const getVoiceForLanguage = (lang: Language) => {
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
    // Append transcript to existing text, respecting character limit
    const newText = textInput.value + (textInput.value ? " " : "") + transcript;
    textInput.value = newText.slice(0, maxCharacters);
    translateText({ immediate: true });
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
        "Speech recognition not supported in this browser",
      ),
    stop: () => {},
    addEventListener: () => {},
    dispatchEvent: () => true,
    removeEventListener: () => {},
  } as SpeechRecognition;
}

// Speak text using ResponsiveVoice
const speakText = (text: string, lang: Language) => {
  if (!text) return;

  if (!window.responsiveVoice) {
    alert(
      "ResponsiveVoice is not loaded. Please check your API key and connection.",
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
const speakTextFallback = (text: string, lang: Language) => {
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

// Get speech recognition language code
const getSpeechRecognitionLang = (lang: Language): string => {
  switch (lang) {
    case "Tagalog":
      return "fil-PH";
    case "English":
      return "en-US";
    case "Chabacano":
      return "es-ES"; // Use Spanish as closest approximation
    default:
      return "en-US";
  }
};

// Toggle voice recording
const toggleRecording = () => {
  if (isRecording.value) {
    recognition.stop();
    isRecording.value = false;
  } else {
    try {
      // Set recognition language based on source language
      recognition.lang = getSpeechRecognitionLang(selectedSrcLang.value);
      recognition.start();
      isRecording.value = true;
    } catch (error) {
      console.error("Failed to start speech recognition:", error);
      displayErrorNotification("Failed to start voice input");
    }
  }
};

interface TranslateOptions {
  immediate?: boolean;
}

interface TranslationRequestContext {
  requestId: number;
  text: string;
  model: string;
  cacheKey: string;
}

interface CachedTranslation {
  text: string;
  model: string;
  translation: string;
}

const getCurrentTranslationModel = () =>
  `${selectedSrcLang.value}-to-${selectedTargetLang.value}`.toLowerCase();

const getTranslationCacheKey = (text: string, model: string) =>
  `${model}\n${text.trim()}`;

const isTranslationStatusText = (text: string) =>
  translationStatusMessages.has(text.trim());

const getReusableTranslatedText = () => {
  const value = translatedText.value;

  return value.trim() && !isTranslationStatusText(value) ? value : "";
};

const rememberTranslation = ({ text, model, translation }: CachedTranslation) => {
  if (
    !text.trim() ||
    !translation.trim() ||
    isTranslationStatusText(translation)
  ) {
    return;
  }

  translationCache.set(getTranslationCacheKey(text, model), translation);

  if (translationCache.size > 60) {
    const oldestKey = translationCache.keys().next().value;

    if (typeof oldestKey === "string") {
      translationCache.delete(oldestKey);
    }
  }
};

const cancelQueuedTranslation = () => {
  if (debounceTimeout.value !== null) {
    clearTimeout(debounceTimeout.value);
    debounceTimeout.value = null;
  }

  queuedTranslationKey.value = "";
};

const abortActiveTranslation = () => {
  if (activeTranslationController) {
    activeTranslationController.abort();
    activeTranslationController = null;
  }

  activeTranslationKey.value = "";
  isTranslating.value = false;
};

const invalidateTranslationWork = () => {
  latestTranslationRequestId += 1;
  cancelQueuedTranslation();
  abortActiveTranslation();
};

// Handle text input with character limit enforcement
const handleTextInput = () => {
  // Enforce character limit
  if (textInput.value.length > maxCharacters) {
    textInput.value = textInput.value.slice(0, maxCharacters);
  }
  translateText();
};

const runTranslationRequest = async ({
  requestId,
  text,
  model,
  cacheKey,
}: TranslationRequestContext) => {
  if (!text.trim()) {
    if (requestId === latestTranslationRequestId) {
      translatedText.value = "";
    }

    return;
  }

  const cachedTranslation = translationCache.get(cacheKey);

  if (cachedTranslation) {
    if (requestId === latestTranslationRequestId) {
      translatedText.value = cachedTranslation;
    }

    return;
  }

  const controller = new AbortController();
  activeTranslationController = controller;
  activeTranslationKey.value = cacheKey;
  isTranslating.value = true;
  translatedText.value = translatingMessage;

  try {
    const response = await RequestToTranslateText(
      {
        text,
        model,
      },
      {
        signal: controller.signal,
      },
    );

    if (
      requestId !== latestTranslationRequestId ||
      controller.signal.aborted ||
      response?.canceled
    ) {
      return;
    }

    const fallbackTranslation = response?.translation ?? response?.result ?? "";

    if (fallbackTranslation) {
      translatedText.value = fallbackTranslation;
      rememberTranslation({
        text,
        model,
        translation: fallbackTranslation,
      });
      return;
    }

    translatedText.value = translationErrorMessage;
  } finally {
    if (
      requestId === latestTranslationRequestId &&
      activeTranslationController === controller
    ) {
      activeTranslationController = null;
      activeTranslationKey.value = "";
      isTranslating.value = false;
    }
  }
};

// Translation function
const translateText = ({ immediate = false }: TranslateOptions = {}) => {
  const text = textInput.value;
  const model = getCurrentTranslationModel();
  const cacheKey = getTranslationCacheKey(text, model);

  if (!text.trim()) {
    invalidateTranslationWork();
    translatedText.value = "";
    return;
  }

  const cachedTranslation = translationCache.get(cacheKey);

  if (cachedTranslation) {
    invalidateTranslationWork();
    translatedText.value = cachedTranslation;
    return;
  }

  if (activeTranslationKey.value === cacheKey) {
    return;
  }

  if (queuedTranslationKey.value === cacheKey) {
    return;
  }

  invalidateTranslationWork();

  const requestId = latestTranslationRequestId;
  const runRequest = () => {
    void runTranslationRequest({
      requestId,
      text,
      model,
      cacheKey,
    });
  };

  if (immediate) {
    runRequest();
    return;
  }

  queuedTranslationKey.value = cacheKey;
  debounceTimeout.value = window.setTimeout(() => {
    debounceTimeout.value = null;
    queuedTranslationKey.value = "";
    runRequest();
  }, translationDebounceMs);
};

const handleSrcLanguageChange = () => {
  if (selectedSrcLang.value === selectedTargetLang.value) {
    // Swap to prevent same language on both sides
    selectedTargetLang.value =
      selectedSrcLang.value === "Chabacano" ? "Tagalog" : "Chabacano";
  }
  translateText({ immediate: true });
};

const handleTargetLanguageChange = () => {
  if (selectedTargetLang.value === selectedSrcLang.value) {
    // Swap to prevent same language on both sides
    selectedSrcLang.value =
      selectedTargetLang.value === "Chabacano" ? "Tagalog" : "Chabacano";
  }
  translateText({ immediate: true });
};

const switchLanguages = () => {
  const previousSourceLang = selectedSrcLang.value;
  const previousTargetLang = selectedTargetLang.value;
  const previousSourceText = textInput.value;
  const previousTranslatedText = getReusableTranslatedText();

  invalidateTranslationWork();

  textInput.value = previousTranslatedText;
  translatedText.value = previousSourceText;
  selectedSrcLang.value = previousTargetLang;
  selectedTargetLang.value = previousSourceLang;

  if (previousTranslatedText.trim() && previousSourceText.trim()) {
    rememberTranslation({
      text: previousTranslatedText,
      model: getCurrentTranslationModel(),
      translation: previousSourceText,
    });
  }
};

const copyTargetText = async () => {
  await navigator.clipboard.writeText(translatedText.value);
};

const copySourceText = async () => {
  await navigator.clipboard.writeText(textInput.value);
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
      "ResponsiveVoice is not available. Make sure to include the script in your HTML.",
    );
  } else {
    console.log(
      "ResponsiveVoice available voices:",
      window.responsiveVoice.getVoices(),
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
  invalidateTranslationWork();
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
  gap: 24px;
  width: 100%;
  max-width: 1400px;
  align-items: stretch;
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
  min-height: 500px;
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
  padding: 20px 24px;
  font-size: 1.25rem;
  font-weight: 600;
  font-family: inherit;
  color: #1a1a1a;
  background-color: #ffffff;
  border: none;
  border-radius: 12px;
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
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  border: 2px solid rgba(0, 0, 0, 0.08);
}

.translator__textarea {
  flex: 1;
  width: 100%;
  padding: 24px;
  font-size: 1.3rem;
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
  font-size: 1.25rem;
}

.translator__textarea:disabled {
  color: #1a1a1a;
  background: transparent;
}

/* Audio Controls */
.translator__audio-controls {
  position: absolute;
  bottom: 16px;
  right: 16px;
  display: flex;
  gap: 10px;
}

.translator__audio-controls--source {
  left: 16px;
  right: auto;
}

.translator__audio-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
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

.translator__audio-btn--recording {
  background: #ef4444;
  animation: pulse-recording 1.5s ease-in-out infinite;
}

.translator__audio-btn--recording:hover {
  background: #dc2626;
}

@keyframes pulse-recording {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4);
  }
  50% {
    box-shadow: 0 0 0 12px rgba(239, 68, 68, 0);
  }
}

/* Character Counter */
.translator__char-counter {
  position: absolute;
  bottom: 16px;
  right: 16px;
  font-size: 0.85rem;
  color: #888;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 4px;
}

.translator__char-counter--limit {
  color: #ef4444;
  font-weight: 600;
}

/* Footer with Buttons */
.translator__footer {
  display: none;
}

.translator__btn {
  padding: 16px 48px;
  font-size: 1.15rem;
  font-family: inherit;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all var(--transition-fast) ease;
}

.translator__btn--clear {
  background: transparent;
  color: var(--light-color);
  border: 2px solid var(--light-color);
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
    padding: 80px 24px 50px;
    min-height: auto;
  }

  .translator {
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 100%;
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
    width: 52px;
    height: 52px;
    transform: rotate(90deg);
  }

  .translator__switch-btn:hover {
    transform: rotate(90deg) scale(1.1);
  }

  .translator__panel {
    min-height: auto;
    width: 100%;
  }

  .translator__body {
    min-height: 200px;
  }

  .translator__select {
    padding: 18px 20px;
    font-size: 1.15rem;
  }

  .translator__textarea {
    min-height: 160px;
    font-size: 1.15rem;
    padding: 20px;
  }

  .translator__btn {
    padding: 14px 36px;
    font-size: 1.05rem;
  }

  .translator__audio-controls {
    bottom: 14px;
    right: 14px;
  }

  .translator__audio-controls--source {
    left: 14px;
    right: auto;
  }

  .translator__audio-btn {
    width: 42px;
    height: 42px;
  }

  .translator__char-counter {
    bottom: 14px;
    right: 14px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .section-bg {
    padding: 70px 20px 40px;
  }

  .translator {
    gap: 18px;
    width: 100%;
    max-width: 100%;
  }

  .translator__body {
    min-height: 180px;
  }

  .translator__textarea {
    padding: 18px;
    font-size: 1.1rem;
    min-height: 140px;
  }

  .translator__select {
    padding: 16px 18px;
    font-size: 1.1rem;
  }

  .translator__audio-controls {
    bottom: 12px;
    right: 12px;
  }

  .translator__audio-controls--source {
    left: 12px;
    right: auto;
  }

  .translator__audio-btn {
    width: 40px;
    height: 40px;
  }

  .translator__char-counter {
    bottom: 12px;
    right: 12px;
    font-size: 0.75rem;
  }

  .translator__btn {
    padding: 12px 32px;
    font-size: 1rem;
  }
}

@media (min-width: 1600px) {
  .section-bg {
    padding: 120px var(--container-padding);
  }

  .translator {
    max-width: 1600px;
    gap: 32px;
  }

  .translator__panel {
    min-height: 560px;
  }

  .translator__textarea {
    font-size: 1.35rem;
  }
}

@media (min-width: 2560px) {
  .translator {
    max-width: 1760px;
  }

  .translator__panel {
    min-height: 640px;
  }

  .translator__select {
    padding: 22px 28px;
  }
}
</style>
