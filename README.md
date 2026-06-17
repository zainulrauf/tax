# Tax Software Recommendation Platform (Tax-software)

---

## Project Overview

**Tax-software** is a full-stack AI-powered tax recommendation platform that helps users choose the most suitable tax software based on their income type, business structure, deductions, and financial situation.

The system combines **AI + rule-based logic** to deliver personalized recommendations with clear explanations, comparisons, and chat-based assistance.

---

## Key Features

### AI-Powered Assistant
- Natural language chat interface
- Understands user financial queries
- Extracts intent (income type, business type, deductions, etc.)
- Generates human-like explanations
- Combines AI reasoning with rule-based results
- Context-aware conversation flow

---

### Recommendation Engine
- Rule-based decision system
- Matches user profile with best tax software
- Supports multiple user types:
  - Salaried individuals
  - Freelancers
  - Small business owners
  - Enterprises
- Weighted scoring system for accurate recommendations

---

### Product Comparison System
- Side-by-side software comparison
- Feature-based comparison (pricing, support, usability, compliance)
- Dynamic filtering based on user needs
- Highlights best recommended option

---

###  Admin / Configurable Rules
- Modify scoring logic without code changes
- Control recommendation weights
- Extend system for new tax categories

---

##  UI / UX Features

- Modern responsive design (mobile + desktop)
- Full-screen AI chat assistant interface
- Clean dashboard-style layout
- Gradient hero sections
- Smooth animations & transitions
- Tailwind-based component system
- Chat message bubbles UI
- Product comparison table UI
- Fast and minimal UX experience


## Tech Stack

### Frontend
- Next.js (React)
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- NestJS
- TypeScript
- REST APIs

### AI System
- Custom AI logic layer
- Rule-based engine + LLM-style response generator
- Intent detection system

### Monorepo Tools
- npm workspaces
- concurrently

##  Setup Instructions

    Clone Repository
    ```bash
    - git clone <repo-url>
    - cd tax
    - npm install
    - npm run dev

## Application URLs (Default)
    Service	URL
    Frontend	http://localhost:3000
    Backend	http://localhost:3001

## System Architecture
    ```bash
    Tax-software/
    ├── frontend/        # Next.js UI (AI Chat + Dashboard)
    ├── backend/         # API server (AI + Rules + Logic)
    ├── package.json     # Monorepo workspace config
    └── README.md
