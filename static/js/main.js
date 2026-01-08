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

// Form submission handler
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const text = textInput.value.trim();

  if (!text) {
    showError("Please enter some text to analyze.");
    return;
  }

  // Show loading state
  setLoadingState(true);
  hideError();
  hideResults();

  try {
    // Send request to Flask backend
    const response = await fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Analysis failed");
    }

    // Display results
    displayResults(data);
  } catch (error) {
    console.error("Error:", error);
    showError(
      error.message || "An error occurred during analysis. Please try again."
    );
  } finally {
    setLoadingState(false);
  }
});

// Set loading state
function setLoadingState(isLoading) {
  if (isLoading) {
    analyzeBtn.disabled = true;
    btnText.style.display = "none";
    btnLoader.style.display = "inline";
  } else {
    analyzeBtn.disabled = false;
    btnText.style.display = "inline";
    btnLoader.style.display = "none";
  }
}

// Display analysis results
function displayResults(data) {
  hideError();

  // Set overall sentiment
  const sentiment = data.sentiment.toLowerCase();
  sentimentLabel.textContent = sentiment;
  sentimentBadge.className = `sentiment-badge ${sentiment}`;

  // Display sentiment scores
  const scores = data.confidence_scores;
  positiveScore.textContent = `${(scores.positive * 100).toFixed(1)}%`;
  neutralScore.textContent = `${(scores.neutral * 100).toFixed(1)}%`;
  negativeScore.textContent = `${(scores.negative * 100).toFixed(1)}%`;

  // Create bar chart
  createBarChart(scores);

  // Display key phrases
  displayKeyPhrases(data.key_phrases);

  // Show results section with animation
  resultsSection.style.display = "block";
  resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Create sentiment distribution bar chart
function createBarChart(scores) {
  barChart.innerHTML = "";

  const sentiments = [
    { name: "positive", value: scores.positive, color: "positive" },
    { name: "neutral", value: scores.neutral, color: "neutral" },
    { name: "negative", value: scores.negative, color: "negative" },
  ];

  sentiments.forEach((sentiment) => {
    const barItem = document.createElement("div");
    barItem.className = "bar-item";

    const label = document.createElement("div");
    label.className = "bar-label";
    label.textContent = sentiment.name;

    const barWrapper = document.createElement("div");
    barWrapper.className = "bar-wrapper";

    const barFill = document.createElement("div");
    barFill.className = `bar-fill ${sentiment.color}`;
    barFill.textContent = `${(sentiment.value * 100).toFixed(1)}%`;

    // Animate bar width
    setTimeout(() => {
      barFill.style.width = `${sentiment.value * 100}%`;
    }, 100);

    barWrapper.appendChild(barFill);
    barItem.appendChild(label);
    barItem.appendChild(barWrapper);
    barChart.appendChild(barItem);
  });
}

// Display key phrases as tags
function displayKeyPhrases(phrases) {
  keyphrasesContainer.innerHTML = "";

  if (!phrases || phrases.length === 0) {
    keyphrasesContainer.innerHTML =
      '<p style="color: var(--text-secondary);">No key phrases detected.</p>';
    return;
  }

  phrases.forEach((phrase, index) => {
    const tag = document.createElement("div");
    tag.className = "keyphrase-tag";
    tag.textContent = phrase;
    tag.style.animationDelay = `${index * 0.1}s`;
    keyphrasesContainer.appendChild(tag);
  });
}

// Show error message
function showError(message) {
  errorText.textContent = message;
  errorSection.style.display = "block";
  resultsSection.style.display = "none";
  errorSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// Hide error message
function hideError() {
  errorSection.style.display = "none";
}

// Hide results section
function hideResults() {
  resultsSection.style.display = "none";
}

// Add animation keyframes for key phrases
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .keyphrase-tag {
        animation: slideIn 0.3s ease-out forwards;
        opacity: 0;
    }
`;
document.head.appendChild(style);

// Auto-resize textarea
textInput.addEventListener("input", function () {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});
