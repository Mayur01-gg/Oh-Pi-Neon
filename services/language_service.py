from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from config import AZURE_LANGUAGE_ENDPOINT, AZURE_LANGUAGE_KEY


def get_text_client():
    credential = AzureKeyCredential(AZURE_LANGUAGE_KEY)
    return TextAnalyticsClient(
        endpoint=AZURE_LANGUAGE_ENDPOINT,
        credential=credential
    )


def analyze_text(text):
    client = get_text_client()

    documents = [text]

    sentiment_result = client.analyze_sentiment(documents)[0]
    keyphrase_result = client.extract_key_phrases(documents)[0]

    return {
        "sentiment": sentiment_result.sentiment,
        "confidence_scores": sentiment_result.confidence_scores,
        "key_phrases": keyphrase_result.key_phrases
    }
