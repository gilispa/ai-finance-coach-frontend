# 🤖 AI Finance Coach – Frontend

Frontend web application for **AI Finance Coach**, built to help users track income and expenses, visualize spending habits, and receive AI-powered financial insights in a clear and friendly way.

This project focuses on **usability, clarity, and real-time interaction** with the backend API.

---

## 🚀 Features

- Add and manage **expenses** with categorized tracking  
- Add and track **income**
- View **financial summary** (income, expenses, savings, expense ratio)
- See **recent expenses** updated in real time
- Interactive **expenses by category chart**
- Request **AI-generated financial advice on demand**
- Clean and minimal UI, focused on clarity and ease of use

---

## Tech Stack

- **React**
- **Vite**
- **JavaScript (ES6+)**
- **Recharts** (data visualization)
- **CSS (custom styles)**
- **Fetch API** for backend communication

---

## 📂 Project Structure

```text
frontend/
│
├── src/
│   ├── components/
│   │   ├── AddExpenseForm.jsx
│   │   ├── AddIncomeForm.jsx
│   │   ├── RecentExpenses.jsx
│   │   ├── ExpensesByCategoryChart.jsx
│   │   ├── SummaryCard.jsx
│   │   └── AIAdvice.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── styles/
│   │   ├── cards.css
│   │   ├── forms.css
│   │   ├── globals.css
│   │   ├── header.css
│   │   ├── layout.css
│   │   ├── recent-expenses.css
│   │   └── summary.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── package.json
├── vite-env.d.ts
└── vite.config.js
```

## Getting Started

To run the frontend, follow these steps:

1. Clone the repository:
```bash
https://github.com/gilispa/ai-finance-coach-frontend.git
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser.

---

## Backend Integration

This Frontend is designed to work with the AI Finance Coach Backend API. The API is hosted on a separate server and is used to retrieve financial data and generate AI-powered financial insights.

[Ai-finance-coach-backend repository](https://github.com/gilispa/ai-finance-coach-backend)

Default API URL: http://127.0.0.1:8000

Endpoints:

-/expenses
-/income
-/analytics/summary
-/analytics/expenses-by-category
-/ai-advice
-/categories
-/recent-expenses


## License

MIT License
