import streamlit as st
import google.generativeai as genai
from tinydb import TinyDB, Query
import pdfplumber
import requests
from bs4 import BeautifulSoup
from langdetect import detect
import uuid
import json
from datetime import datetime

# ------------------ Enhanced AI Configuration ------------------
genai.configure(api_key="AIzaSyCYDDJisLn7awPJxfVW0y8fiN2PMqwY0oY")
model = genai.GenerativeModel('gemini-1.5-flash')

# ------------------ Database Setup ------------------
db = TinyDB("legalyze_users.db")
User = Query()

# ------------------ User Profile Management ------------------
class UserProfile:
    def __init__(self, user_id):
        self.user_id = user_id
        self.profile = self.load_profile()
    
    def load_profile(self):
        user_data = db.get(User.user_id == self.user_id)
        if user_data:
            return user_data
        else:
            # Create new user profile
            default_profile = {
                "user_id": self.user_id,
                "name": "",
                "location": "",
                "phone": "",
                "email": "",
                "cases": [],
                "documents": [],
                "legal_history": [],
                "digilocker_connected": False,
                "risk_profile": "unknown",
                "created_at": datetime.now().isoformat()
            }
            db.insert(default_profile)
            return default_profile
    
    def update_profile(self, updates):
        db.update(updates, User.user_id == self.user_id)
        self.profile.update(updates)
    
    def add_case(self, case_info):
        cases = self.profile.get("cases", [])
        cases.append({
            "id": len(cases) + 1,
            "type": case_info.get("type"),
            "description": case_info.get("description"),
            "status": "active",
            "strength": self.analyze_case_strength(case_info),
            "created_at": datetime.now().isoformat()
        })
        self.update_profile({"cases": cases})
    
    def analyze_case_strength(self, case_info):
        # Simple case strength analysis
        description = case_info.get("description", "").lower()
        if any(word in description for word in ["evidence", "witness", "document", "proof"]):
            return "strong"
        elif any(word in description for word in ["maybe", "think", "probably"]):
            return "weak"
        else:
            return "medium"

# ------------------ Enhanced AI Assistant ------------------
class LegalyzeAI:
    def __init__(self, user_profile):
        self.user_profile = user_profile
        self.legal_acts_knowledge = self.load_legal_acts()
    
    def load_legal_acts(self):
        # Simulated legal acts database
        return {
            "IPC": "Indian Penal Code - Criminal offenses and punishments",
            "CrPC": "Criminal Procedure Code - Criminal court procedures",
            "CPC": "Civil Procedure Code - Civil court procedures",
            "Evidence Act": "Indian Evidence Act - Rules of evidence",
            "Contract Act": "Indian Contract Act - Contract law",
            "Property Act": "Transfer of Property Act - Property transactions",
            "Consumer Protection": "Consumer Protection Act - Consumer rights",
            "RTI": "Right to Information Act - Information access rights"
        }
    
    def analyze_query(self, user_input):
        """Intelligent query analysis with user context"""
        
        # Get user context
        user_context = self.get_user_context()
        
        # Determine if lawyer consultation is needed
        needs_lawyer = self.assess_lawyer_requirement(user_input)
        
        # Generate contextual response
        response = self.generate_contextual_response(user_input, user_context, needs_lawyer)
        
        return response
    
    def get_user_context(self):
        """Get user's complete legal context"""
        profile = self.user_profile.profile
        context = f"""
        User Profile:
        - Name: {profile.get('name', 'User')}
        - Location: {profile.get('location', 'India')}
        - Active Cases: {len(profile.get('cases', []))}
        - Legal History: {profile.get('legal_history', [])}
        - Documents Available: {profile.get('documents', [])}
        - Risk Profile: {profile.get('risk_profile', 'unknown')}
        """
        return context
    
    def assess_lawyer_requirement(self, query):
        """Assess if user needs lawyer consultation"""
        high_risk_keywords = [
            "court notice", "arrest", "police", "fir", "criminal case",
            "property dispute", "divorce", "custody", "bail", "warrant"
        ]
        
        query_lower = query.lower()
        risk_score = sum(1 for keyword in high_risk_keywords if keyword in query_lower)
        
        # Check user's case history
        active_cases = len(self.user_profile.profile.get("cases", []))
        
        return risk_score >= 2 or active_cases >= 2
    
    def generate_contextual_response(self, user_input, user_context, needs_lawyer):
        """Generate intelligent, contextual response"""
        
        # Detect language
        lang = detect(user_input) if len(user_input.strip()) > 10 else "en"
        
        # Create personalized prompt
        system_prompt = f"""
        You are Legalyze-India AI - a friendly, intelligent legal assistant that knows the user personally.
        
        User Context: {user_context}
        
        Instructions:
        1. Respond in a friendly, supportive tone (like a knowledgeable friend)
        2. Use Hinglish (mix of Hindi and English) for Indian users
        3. Reference user's previous cases/documents when relevant
        4. If case is strong, provide detailed guidance
        5. If case needs lawyer, recommend consultation
        6. Always mention relevant Indian legal acts
        7. Be encouraging and remove fear of legal processes
        8. Use emojis and casual language to be approachable
        
        Response Format:
        🤝 Personal Greeting
        📋 Case Analysis
        ⚖️ Relevant Legal Acts
        💡 Practical Advice
        🎯 Next Steps
        {"🚨 Lawyer Recommendation" if needs_lawyer else "✅ Self-Help Guidance"}
        
        Language: {lang}
        """
        
        full_prompt = system_prompt + f"\n\nUser Query: {user_input}"
        
        try:
            response = model.generate_content(full_prompt)
            return response.text
        except Exception as e:
            return f"Sorry, I'm having technical issues. Please try again. Error: {e}"

# ------------------ Streamlit UI ------------------
def main():
    st.set_page_config(
        page_title="Legalyze-India - Your Legal Bridge to Justice",
        page_icon="⚖️",
        layout="wide"
    )
    
    # Header with logo
    col1, col2 = st.columns([1, 4])
    with col1:
        st.image("logo.png", width=100)  # Add your logo here
    with col2:
        st.title("⚖️ Legalyze-India")
        st.markdown("**Justice for Every Indian, One Voice at a Time**")
    
    # Get or create user session
    if "user_id" not in st.session_state:
        st.session_state.user_id = str(uuid.uuid4())
    
    user_profile = UserProfile(st.session_state.user_id)
    ai_assistant = LegalyzeAI(user_profile)
    
    # Sidebar - User Profile
    with st.sidebar:
        st.header("👤 Your Profile")
        
        # Profile setup
        if not user_profile.profile.get("name"):
            st.subheader("Complete Your Profile")
            name = st.text_input("Name")
            location = st.text_input("Location")
            phone = st.text_input("Phone")
            
            if st.button("Save Profile"):
                user_profile.update_profile({
                    "name": name,
                    "location": location,
                    "phone": phone
                })
                st.success("Profile saved!")
                st.rerun()
        else:
            st.write(f"**Name:** {user_profile.profile.get('name')}")
            st.write(f"**Location:** {user_profile.profile.get('location')}")
            st.write(f"**Active Cases:** {len(user_profile.profile.get('cases', []))}")
        
        # DigiLocker Status
        st.subheader("🔗 DigiLocker")
        if user_profile.profile.get("digilocker_connected"):
            st.success("Connected ✅")
        else:
            if st.button("Connect DigiLocker"):
                user_profile.update_profile({"digilocker_connected": True})
                st.success("DigiLocker connected!")
                st.rerun()
    
    # Main Chat Interface
    st.header("💬 Chat with AI Legal Assistant")
    
    # Chat history
    if "messages" not in st.session_state:
        st.session_state.messages = [
            {
                "role": "assistant",
                "content": f"नमस्ते {user_profile.profile.get('name', 'दोस्त')}! 🙏 मैं आपका AI legal मित्र हूं। आपकी सारी legal history मुझे पता है। कोई भी legal problem हो, बेझिझक पूछिए! 😊"
            }
        ]
    
    # Display chat history
    for message in st.session_state.messages:
        with st.chat_message(message["role"]):
            st.markdown(message["content"])
    
    # Chat input
    if prompt := st.chat_input("अपना legal सवाल यहाँ लिखें..."):
        # Add user message
        st.session_state.messages.append({"role": "user", "content": prompt})
        with st.chat_message("user"):
            st.markdown(prompt)
        
        # Generate AI response
        with st.chat_message("assistant"):
            with st.spinner("AI सोच रहा है..."):
                response = ai_assistant.analyze_query(prompt)
                st.markdown(response)
                st.session_state.messages.append({"role": "assistant", "content": response})
    
    # Quick Actions
    st.header("🚀 Quick Actions")
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        if st.button("📄 Legal Notice"):
            st.session_state.messages.append({
                "role": "user", 
                "content": "Legal notice draft करना है"
            })
            st.rerun()
    
    with col2:
        if st.button("🚨 FIR Help"):
            st.session_state.messages.append({
                "role": "user", 
                "content": "FIR file करनी है"
            })
            st.rerun()
    
    with col3:
        if st.button("🏠 Property Issue"):
            st.session_state.messages.append({
                "role": "user", 
                "content": "Property dispute hai"
            })
            st.rerun()
    
    with col4:
        if st.button("👨‍⚖️ Need Lawyer?"):
            st.session_state.messages.append({
                "role": "user", 
                "content": "Lawyer ki zarurat hai kya?"
            })
            st.rerun()

if __name__ == "__main__":
    main()