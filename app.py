from flask import Flask, render_template, request
from services.language_service import analyze_text
import matplotlib.pyplot as plt
import os

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    chart_path = None

    if request.method == "POST":
        text = request.form["text"]
        result = analyze_text(text)

        # Sentiment confidence bar chart
        scores = result["confidence_scores"]
        labels = ["Positive", "Neutral", "Negative"]
        values = [
            scores.positive,
            scores.neutral,
            scores.negative
        ]

        plt.figure()
        plt.bar(labels, values)
        plt.title("Sentiment Confidence Scores")
        plt.ylabel("Score")

        chart_path = "static/sentiment_chart.png"
        plt.savefig(chart_path)
        plt.close()

    return render_template(
        "index.html",
        result=result,
        chart_path=chart_path
    )


if __name__ == "__main__":
    app.run(debug=True)
