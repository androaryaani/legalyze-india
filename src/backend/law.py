import streamlit as st
import google.generativeai as genai
from tinydb import TinyDB, Query
import pdfplumber
import requests
from bs4 import BeautifulSoup
from langdetect import detect
import uuid
import text2emotion as te
from transformers import pipeline

# ------------------ Emotion Setup ------------------
emotion_classifier = pipeline("text-classification", model="j-hartmann/emotion-english-distilroberta-base", top_k=1)

def get_emotion_text2emotion(text):
    try:
        emotions = te.get_emotion(text)
        return max(emotions, key=emotions.get) if emotions else "neutral"
    except:
        return "neutral"

def get_emotion_transformer(text):
    try:
        result = emotion_classifier(text)[0]
        return result['label']
    except:
        return "neutral"

# ------------------ Gemini Setup ------------------
genai.configure(api_key="AIzaSyCYDDJisLn7awPJxfVW0y8fiN2PMqwY0oY")  # Use your actual API key
model = genai.GenerativeModel('gemini-1.5-flash')

# ------------------ DB Setup ------------------
db = TinyDB("user.db")
User = Query()

# ------------------ Utilities ------------------
def extract_text_from_pdf(file, max_chars=5000):
    try:
        with pdfplumber.open(file) as pdf:
            text = "\n".join(page.extract_text() or "" for page in pdf.pages)
            return text[:max_chars].strip() or "❌ No readable text found in PDF."
    except Exception as e:
        return f"❌ PDF extraction error: {e}"

def extract_text_from_website(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup.get_text()[:5000]
    except Exception as e:
        return f"❌ Error fetching site: {e}"

def detect_language(text):
    try:
        return detect(text) if len(text.strip()) > 10 else "en"
    except:
        return "en"

def get_user_id():
    if "user_id" not in st.session_state:
        st.session_state.user_id = str(uuid.uuid4())
    return st.session_state.user_id

def load_history(user_id):
    user_data = db.get(User.user_id == user_id)
    return user_data.get("history", []) if user_data else []

def save_message(user_id, role, content):
    history = load_history(user_id)
    history.append({"role": role, "content": content})
    db.upsert({"user_id": user_id, "history": history}, User.user_id == user_id)

# ------------------ Prompt Logic ------------------
def generate_emotional_response(user_input, context=""):
    lang = detect_language(user_input)

    system_prompt = f"""
You are a legal AI assistant trained to act like a real lawyer or judge.
Your role is to ask smart questions, understand the user's situation, and provide realistic legal advice.
Tone: polite, neutral, empathetic. Avoid robotic or overly formal replies.

Only after understanding the issue, respond using this format:
1. Case Summary (max 4 lines)
2. Potential Legal Areas (only mention, explain if asked)
3. Required Documents
4. User’s Possible Mistake (if any)
5. Resolution Options (e.g. forgiveness, fine)
6. Court Process (if escalated)
7. Lawyer Type Recommendation (if needed)

Reply only in {lang}. Use natural language and emotional intelligence.
"""

    full_prompt = system_prompt.strip() + "\n\nUser Question:\n" + user_input + "\n\nAdditional Context:\n" + context

    try:
        chat = model.start_chat()
        response = chat.send_message(full_prompt)
        return response.text if hasattr(response, "text") else str(response)
    except Exception as e:
        return f"❌ Gemini response error: {e}"


# ------------------ Streamlit UI ------------------
st.set_page_config(page_title="🧠 Supreme Legal Assistant", layout="centered")
st.title("⚖️ Supreme Legal Assistant")
st.markdown("Upload your documents or type your legal question. I will respond kindly and intelligently.")

user_id = get_user_id()
prompt = None  # Declare prompt to avoid unbound local error

# ------------------ Sidebar Uploads ------------------
st.sidebar.header("📁 Upload Documents")
pdf_file = st.sidebar.file_uploader("Upload PDF", type=["pdf"])
website_url = st.sidebar.text_input("Paste Website URL")

# ------------------ Chat History ------------------
st.subheader("🗨️ Chat with Assistant")
history = load_history(user_id)
for msg in history:
    st.chat_message(msg["role"]).markdown(msg["content"])

# ------------------ Chat Input ------------------
prompt = st.chat_input("Ask your legal question...")

if prompt:
    st.chat_message("user").markdown(prompt)
    save_message(user_id, "user", prompt)

    context = ""
    if pdf_file:
        context += "\n[PDF Content]\n" + extract_text_from_pdf(pdf_file)
    if website_url:
        context += "\n[Website Content]\n" + extract_text_from_website(website_url)

    response = generate_emotional_response(prompt, context)
    st.chat_message("assistant").markdown(response)
    save_message(user_id, "assistant", response)

# ------------------ Sidebar Emotion Display ------------------
if prompt and prompt.strip():
    st.sidebar.markdown("📊 Emotion (Text2Emotion): " + get_emotion_text2emotion(prompt))
    st.sidebar.markdown("🤖 Emotion (Transformer): " + get_emotion_transformer(prompt))
else:
    st.sidebar.markdown("📊 Emotion: Waiting for your input...")

st.sidebar.success(f"User ID: {user_id}")
