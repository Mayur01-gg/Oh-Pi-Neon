from flask import Flask, render_template, request, jsonify
from services.language_service import analyze_text

app = Flask(__name__)

# ---------------- UI ROUTE ----------------
@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

# ---------------- API ROUTE ----------------
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json(silent=True)

    if not data or "text" not in data:
        return jsonify({"error": "No text provided"}), 400

    text = data["text"]

    result = analyze_text(text)

    # ---------------- EXISTING RESPONSE (UNCHANGED) ----------------
    response = {
        "sentiment": result["sentiment"],
        "confidence_scores": {
            "positive": result["confidence_scores"].positive,
            "neutral": result["confidence_scores"].neutral,
            "negative": result["confidence_scores"].negative
        },
        "key_phrases": result.get("key_phrases", [])
    }

    # ---------------- NEW: LANGUAGE INFO (ADDITIVE) ----------------
    if "language" in result:
        response["language"] = result["language"]

    return jsonify(response)

# ---------------- ERROR SAFETY ----------------
@app.errorhandler(404)
def not_found(e):
    return jsonify(error="Route not found"), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify(error="Internal server error"), 500

if __name__ == "__main__":
    app.run(debug=True)
