# ThreatLens AI - Production-Ready Prototype

ThreatLens AI is a high-performance, AI-driven cybersecurity analytics platform designed for real-time monitoring and threat detection. Built with **Next.js 14**, it provides an intuitive, high-density dashboard to visualize and mitigate digital threats.

## 🚀 Core Features

- **Anomaly Detection Engine**: Real-time analysis of server logs using behavioral heuristics.
- **Attack Simulation**: Built-in simulator to demonstrate Brute Force and Traffic Spike scenarios.
- **Log Analyzer**: Unified search and filter interface for multi-format syslogs.
- **AI Security Copilot**: Context-aware assistant to explain complex security events and mitigation steps.
- **Modern UI**: Dark-themed, futuristic dashboard using TailwindCSS and Recharts.

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS, Recharts, Lucide-React
- **Backend**: Next.js Serverless API Routes
- **AI Engine**: Custom JavaScript anomaly detection module
- **Data Flow**: Log streaming simulation + JSON-based threat classification

## 📂 Project Structure

```bash
threatlens-ai/
├── app/                  # Main App Router (Pages: Dashboard, Analyzer, Chat, Reports)
├── components/           # Reusable UI Components & Layouts
├── lib/                  # Core Business Logic (AI Engine, Simulator, Utils)
├── pages/api/            # Serverless API Endpoints
└── database/             # Schema definitions and data models
```

## ⚡ Quick Start

### 1. Installation
```bash
npm install
```

### 2. Development Mode
```bash
npm run dev
```
Open `http://localhost:3000` to access the console.

## 📡 API Endpoints

- `POST /api/analyze`: Ingest logs and return detected threats + risk score.
- `POST /api/simulate`: Generate a synthetic attack stream for demo purposes.
- `GET /api/report`: Fetch security audit summaries (Mock).

## 🛡 Security Rules Implemented

- **Brute Force Detection**: Triggers when >10 failed logins (401/403) originate from a single IP.
- **Volumetric Anomaly**: Identifies high-frequency IP sources (>50 requests/min).
- **Behavioral Scoring**: Assigns dynamic risk scores (0-100) based on attack confidence.

---

**Developed for AI Cybersecurity Hackathon 2026**
"Deep Visibility. Zero Trust."
