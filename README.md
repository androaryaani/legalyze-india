# Legalyze-India - Your Legal Bridge to Justice

## 🎯 Vision
**Justice for Every Indian, One Voice at a Time**

Legalyze-India is a comprehensive legal-tech platform that makes legal services accessible to every Indian through AI-powered assistance, DigiLocker integration, and verified lawyer consultations.

## 🚀 Key Features

### 1. Intelligent AI Legal Assistant
- **Personalized AI**: Knows your complete legal history and case status
- **Hinglish Support**: Communicates in friendly Hindi-English mix
- **Case Strength Analysis**: Determines if you need a lawyer or can handle yourself
- **Risk Assessment**: Analyzes your legal position and provides recommendations

### 2. DigiLocker Integration
- **Automatic Document Fetch**: Connects to your DigiLocker account
- **Document Verification**: AI verifies documents for legal processes
- **Secure Access**: Government-grade security for your data

### 3. Comprehensive Legal Services
- **Legal Notice Drafting**: AI-powered legal notice generation
- **FIR Assistance**: Help with filing FIRs and complaints
- **RTI Applications**: Right to Information request drafting
- **Contract Drafting**: Various legal document templates
- **Case Tracking**: Monitor your legal cases and deadlines

### 4. Verified Lawyer Network
- **Expert Lawyers**: Verified legal professionals across India
- **Specialization-based**: Find lawyers by legal area
- **Consultation Booking**: Schedule video/phone/in-person meetings
- **Rating System**: Choose lawyers based on reviews and experience

### 5. User-Friendly Features
- **Multi-language Support**: Hindi and English
- **Mobile Responsive**: Works perfectly on all devices
- **Document Templates**: Ready-to-use legal document formats
- **Notification System**: Stay updated on case progress
- **Educational Content**: Learn about your legal rights

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Responsive Design** for all devices

### Backend (Python)
- **Streamlit** for web interface
- **Google Gemini AI** for intelligent responses
- **TinyDB** for user data storage
- **PDF Processing** with pdfplumber
- **Web Scraping** with BeautifulSoup

### AI Features
- **Natural Language Processing** for query understanding
- **Case Strength Analysis** using ML algorithms
- **Personalized Recommendations** based on user history
- **Multi-language Support** with automatic detection

## 🔧 Setup Instructions

### Frontend Setup
```bash
npm install
npm run dev
```

### Backend Setup
```bash
pip install streamlit google-generativeai tinydb pdfplumber requests beautifulsoup4 langdetect
streamlit run src/backend/enhanced-legal-ai.py
```

## 📱 API Integration Guide

### Changing AI API
To change the AI API in the chatbot:

1. **Update API Configuration**:
```python
# In src/backend/enhanced-legal-ai.py
genai.configure(api_key="YOUR_NEW_API_KEY")
model = genai.GenerativeModel('your-preferred-model')
```

2. **Modify Prompt System**:
```python
# Update the system_prompt in generate_contextual_response method
system_prompt = f"""
Your custom prompt here...
"""
```

3. **Update Response Processing**:
```python
# Modify response handling if needed
response = model.generate_content(full_prompt)
return response.text  # Adjust based on your API response format
```

## 🎨 Customization

### Adding New Features
1. Create new React components in `src/components/`
2. Add translations in `src/utils/translations.ts`
3. Import and use in `src/App.tsx`

### Styling Changes
- Modify `src/index.css` for global styles
- Use Tailwind classes for component styling
- Update color scheme in `tailwind.config.js`

## 🔐 Security Features

- **End-to-end Encryption** for sensitive data
- **DigiLocker Integration** with government-grade security
- **User Authentication** and session management
- **Data Privacy** compliance with Indian regulations

## 📞 Contact Information

**Founder**: Aryan Saini  
**Position**: CEO & Founder  
**Website**: www.legalyzeindia.com  
**Phone**: (91) 9414966535  
**Location**: Jaipur, Raj., India  

## 🤝 Contributing

We welcome contributions to make legal services more accessible in India. Please read our contributing guidelines and submit pull requests.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Legalyze-India** - Making justice accessible to every Indian, one voice at a time! 🇮🇳⚖️