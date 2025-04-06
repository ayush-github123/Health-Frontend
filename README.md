# HealthBridge 🎯💙✨

HealthBridge is a healthcare web app where users can register, log in, and chat with an AI-powered assistant for medical guidance. Users also fill out a patient form for personalized health suggestions. 🏥📋🤖

## Features 🚀🩺🔒

- **User Authentication:**
  - OTP verification for secure registration
  - JWT-based login for extra security

- **Patient Form Submission:**
  - Collects detailed health info
  - Emergency contact & insurance details
  - Records chronic conditions, past surgeries, medications, and symptoms

- **AI Chatbot:**
  - AI bot provides healthcare guidance through chat 🤖💬🧑‍⚕️

- **Tech Stack:**
  - **Frontend:** React (Deployed on Vercel)
  - **Backend:** Django (Deployed on Render)
  - **Database:** PostgreSQL 🛠️⚙️📡

## Patient Form 📝🏥💡

Users fill out a form with details such as:
- Name, Age, Gender, State
- Contact Details
- Chronic Conditions, Past Surgeries, Allergies, Medications
- Symptoms, Severity & Duration
- Mental Health (Stress, Anxiety, Depression)
- Vaccination History, Accessibility Needs
- Pregnancy Status
- Emergency Contact Info
- Health Insurance Details
- Preferred Language 📄💬✅

## Deployment 🌍🚀🔗

- **Frontend:** Hosted on Vercel → [HealthBridge on Vercel](https://health-bridge-eta.vercel.app/patient-form)
- **Backend:** Hosted on Render

## Installation & Setup 🖥️⚙️📌

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/HealthBridge.git
   cd HealthBridge
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup 🛠️📡🎯

1. Clone the backend repository:
   ```bash
   git clone https://github.com/your-repo/HealthBridge-Backend.git
   cd HealthBridge-Backend
   ```
2. Set up a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Apply migrations:
   ```bash
   python manage.py migrate
   ```
5. Run the development server:
   ```bash
   python manage.py runserver
   ```

## License 📜⚖️✅

This project is licensed under the **MIT License**.

---

**Developed by the HealthBridge Team** 🤝💡🎉

