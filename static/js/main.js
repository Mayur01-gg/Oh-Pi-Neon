// DOM Elements
const form = document.getElementById("analysisForm");
const textInput = document.getElementById("textInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const btnText = document.querySelector(".btn-text");
const btnLoader = document.querySelector(".btn-loader");
const resultsSection = document.getElementById("resultsSection");
const errorSection = document.getElementById("errorSection");

// Result elements
const sentimentBadge = document.getElementById("sentimentBadge");
const sentimentLabel = document.getElementById("sentimentLabel");
const barChart = document.getElementById("barChart");
const keyphrasesContainer = document.getElementById("keyphrasesContainer");
const positiveScore = document.getElementById("positiveScore");
const neutralScore = document.getElementById("neutralScore");
const negativeScore = document.getElementById("negativeScore");
const errorText = document.getElementById("errorText");

// Character counter
const charCount = document.getElementById("charCount");
const MAX_CHARS = 5000;

// 🔹 NEW: Language elements
const languageText = document.getElementById("languageText");

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = textInput.value.trim();
  if (text.length > MAX_CHARS) {
    showError("Text exceeds maximum allowed length (5000 characters).");
    setLoadingState(false);
    return;
  }

  if (!text) {
    showError("Please enter some text to analyze.");
    return;
  }

  setLoadingState(true);
  hideError();
  hideResults();

  try {
    const response = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "Analysis failed");
    }

    displayResults(data);
  } catch (err) {
    console.error(err);
    showError("An error occurred during analysis. Please try again.");
  } finally {
    setLoadingState(false);
  }
});

// UI Helpers
function setLoadingState(isLoading) {
  analyzeBtn.disabled = isLoading;
  btnText.style.display = isLoading ? "none" : "inline";
  btnLoader.style.display = isLoading ? "inline" : "none";
}

function hideResults() {
  resultsSection.style.display = "none";
}

function hideError() {
  errorSection.style.display = "none";
}

function showError(message) {
  errorText.textContent = message;
  errorSection.style.display = "block";
  resultsSection.style.display = "none";
}

// Display Results
function displayResults(data) {
  hideError();

  // Sentiment badge
  const sentiment = data.sentiment.toLowerCase();
  sentimentBadge.className = `sentiment-badge ${sentiment}`;
  sentimentLabel.textContent = sentiment.toUpperCase();

  // 🔹 NEW: Display detected language (SAFE ADDITION)
  if (data.language && languageText) {
    languageText.textContent = `${data.language.name.toUpperCase()} • ${
      data.language.code
    }`;
  }

  // Scores
  const scores = data.confidence_scores;
  positiveScore.textContent = `${(scores.positive * 100).toFixed(1)}%`;
  neutralScore.textContent = `${(scores.neutral * 100).toFixed(1)}%`;
  negativeScore.textContent = `${(scores.negative * 100).toFixed(1)}%`;

  // Bars + key phrases
  createBarChart(scores);
  displayKeyPhrases(data.key_phrases);

  resultsSection.style.display = "block";
}

// Sentiment Confidence Bars
function createBarChart(scores) {
  barChart.innerHTML = "";

  const bars = [
    { value: scores.positive, cls: "positive" },
    { value: scores.neutral, cls: "neutral" },
    { value: scores.negative, cls: "negative" },
  ];

  bars.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "bar-wrapper";

    const fill = document.createElement("div");
    fill.className = `bar-fill ${item.cls}`;
    fill.textContent = `${(item.value * 100).toFixed(1)}%`;
    fill.style.width = "0%";

    wrapper.appendChild(fill);
    barChart.appendChild(wrapper);

    setTimeout(() => {
      fill.style.width = `${item.value * 100}%`;
    }, 100);
  });
}

// Key Phrases
function displayKeyPhrases(phrases) {
  keyphrasesContainer.innerHTML = "";

  if (!phrases || phrases.length === 0) {
    keyphrasesContainer.innerHTML =
      '<p style="color: var(--text-secondary);">No key phrases detected.</p>';
    return;
  }

  phrases.forEach((phrase, index) => {
    const tag = document.createElement("span");
    tag.className = "keyphrase-tag";
    tag.textContent = phrase;
    tag.style.animationDelay = `${index * 0.08}s`;
    keyphrasesContainer.appendChild(tag);
  });
}

// Auto-resize textarea + character counter
textInput.addEventListener("input", function () {
  const length = this.value.length;

  // Auto-resize
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";

  // Update counter
  charCount.textContent = length;

  // Enable / disable button
  if (length === 0 || length > MAX_CHARS) {
    analyzeBtn.disabled = true;
    charCount.parentElement.classList.add("warning");
  } else {
    analyzeBtn.disabled = false;
    charCount.parentElement.classList.remove("warning");
  }
});

// Key phrase animation
const style = document.createElement("style");
style.textContent = `
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-15px); }
  to { opacity: 1; transform: translateX(0); }
}
.keyphrase-tag {
  animation: slideIn 0.3s ease-out forwards;
  opacity: 0;
}
`;
document.head.appendChild(style);
