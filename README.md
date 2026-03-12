DebtSense – AI Financial Awareness App

1. General Description
What the Project Does

DebtSense is an AI-powered financial awareness application designed to help university students understand and manage their spending habits to avoid falling into debt traps. The app analyzes user spending behavior, income levels, and financial patterns to provide personalized insights and warnings.

Using AI-driven analytics, the system can:

- Automatically classify spending transactions.
- Analyze spending patterns and lifestyle habits.
- Calculate a Debt Risk Score.
- Provide warnings about risky financial behaviors such as excessive Buy Now Pay Later (BNPL) usage.
- Offer AI-generated financial advice through a chatbot.

The goal of DebtSense is to promote responsible financial behavior among young adults who are increasingly using digital financial tools such as e-wallets and pay-later services.

SDG Addressed

This project supports Sustainable Development Goals :

1. SDG 4 – Quality Education
Promotes financial literacy among university students.

2. SDG 8 – Decent Work and Economic Growth
Encourages responsible financial management and reduces debt risks among young adults.

Target Users:

- University students with limited financial literacy
- Young adults using digital financial platforms especially e-wallets and Buy Now Pay Later services

2. Setup Instructions
Prerequisites

Install the following software before running the project:
- Node.js (v18+)
- Python (v3.9+)
- npm or yarn
- Expo CLI (for React Native)

Step 1: Clone the Repository
git clone https://github.com/Kisharini/debt-sense-ai.git
cd debt-sense-ai

Step 2: Install Frontend Dependencies
npm install or yarn install

Step 3: Install Backend Dependencies

- Navigate to the backend folder: cd backend

- Install required Python packages: pip install fastapi uvicorn scikit-learn pandas

Step 4: Run the AI Backend Server

Start the FastAPI server: uvicorn main:app --reload

The backend API will run on: http://localhost:8000

Step 5: Start the React Native App

Go back to the frontend folder: cd ..

Run the application: npx expo start

Web browser (recommended w)

3. How to Interact With the Prototype

Follow these steps to test the application:

Step 1 – Launch the Application
Start the app using Expo or run the web version.

Step 2 – Add a Transaction
Users can enter:
- Transaction description (e.g., GrabFood, Shopee purchase)
- Amount spent
- Monthly income (including student loans and pocket money)

The AI system will automatically classify the transaction category.

Step 3 – View Spending Analysis
The system generates a spending breakdown chart that shows how much money is spent across different services or platforms.

Step 4 – AI Debt Risk Analysis
The backend analyzes:

- Income vs spending ratio
- Frequency of Buy Now Pay Later usage
- Spending patterns

The system calculates a Debt Risk Score and displays financial insights.

Example insight:

"Your PayLater spending increased by 30% this month. Consider reducing impulse purchases."

Step 5 – Financial Awareness
Users receive AI-generated advice to help them make safer financial decisions and avoid potential debt traps.

Technologies Used: 

1. Frontend: React Native, Expo, React Native Chart Kit

2. Backend: FastAPI, Python, Machine Learning models for risk scoring

3. AI Features: Spending classification, Risk scoring, Spending pattern analysis, AI financial insights, AI chatbot

Future Improvements

- Automatic integration with bank or e-wallet transaction history
- Personalized budgeting recommendations
- Mobile push notifications for risky spending behavior