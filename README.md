# Oh-Pi-Neon

## Opinion Intelligence & Sentiment Analysis Platform

**(Microsoft Azure AI Language + Flask)**

---

## 📌 Overview

**Oh-Pi-Neon** is a web-based **Opinion Intelligence system** that analyzes textual data such as **customer reviews, feedback, or tweets** to extract:

* Overall **sentiment polarity**
* **Key phrases** representing core opinions
* **Sentiment confidence distribution**

The project leverages **Microsoft Azure AI Language (Text Analytics)** services and presents results through a **modern, user-friendly Flask web interface**.

---

## 🎯 Project Objectives

* Convert **unstructured text** into meaningful insights
* Perform **sentiment analysis** (positive / neutral / negative)
* Extract **key phrases** for opinion summarization
* Present results visually in a **single-screen dashboard**
* Demonstrate practical usage of **Azure Cognitive Services**

---

## 🚀 Features

* 🔍 **Sentiment Analysis**

  * Detects overall sentiment of input text
  * Provides confidence scores for each sentiment class

* 🧩 **Key Phrase Extraction**

  * Identifies important phrases and topics from text
  * Helps summarize long feedback efficiently

* 📊 **Sentiment Distribution Visualization**

  * Bar chart showing sentiment confidence scores

* 🖥️ **Modern Dashboard UI**

  * Clean, responsive, and user-friendly
  * Input and results displayed on a single screen

* ☁️ **Azure-Powered AI**

  * Uses Azure AI Language (Text Analytics API)

---

## 🏗️ Tech Stack

| Layer           | Technology                         |
| --------------- | ---------------------------------- |
| Backend         | Flask (Python)                     |
| AI / NLP        | Azure AI Language (Text Analytics) |
| Frontend        | HTML, CSS                          |
| Visualization   | Matplotlib                         |
| Cloud           | Microsoft Azure                    |
| Version Control | Git & GitHub                       |

---

## 📂 Project Structure

```
Oh-Pi-Neon/
│
├── app.py
├── config.py
├── requirements.txt
├── README.md
├── .gitignore
│
├── services/
│   └── language_service.py
│
├── templates/
│   └── index.html
│
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
|
└── docs/
```

---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mayur01-gg/Oh-Pi-Neon.git
cd Oh-Pi-Neon
```

### 2️⃣ Create Virtual Environment

```bash
python -m venv venv
venv\Scripts\activate
```

### 3️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 4️⃣ Configure Azure Credentials

Create a `.env` file in the project root:

```env
AZURE_LANGUAGE_ENDPOINT=your_azure_endpoint
AZURE_LANGUAGE_KEY=your_api_key
```

---

## ▶️ Run the Application

```bash
python app.py
```

Open in browser:

```
http://127.0.0.1:5000
```

---

## 📊 Example Use Cases

* Customer feedback analysis
* Product review sentiment tracking
* Social media opinion mining
* Survey response summarization

---

## 📄 Deliverables (As per Project Specification)

* ✔ Flask-based web application
* ✔ Azure AI Language integration
* ✔ Sentiment & key-phrase extraction
* ✔ Visualization of sentiment distribution
* ✔ User-friendly dashboard UI

---

## 🧠 Learning Outcomes

* Practical experience with **Azure Cognitive Services**
* Hands-on NLP using **cloud-based AI APIs**
* Flask web application development
* Clean project structuring & version control
* Secure handling of environment variables

---

## 🔮 Future Enhancements

* Multi-text (corpus) sentiment analysis
* Sentiment trend analysis over time
* Database integration for storing results
* Deployment to Azure App Service

---

## 👨‍💻 Author

**Mayur Chalke**
AI & Data Science | Cloud & Python Developer

---

## 📜 License

This project is created for **academic and learning purposes**.

---

