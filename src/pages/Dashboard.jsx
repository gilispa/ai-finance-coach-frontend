import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import AddExpenseForm from "../components/AddExpenseForm";
import { getSummary } from "../services/api";
import AddIncomeForm from "../components/AddIncomeForm";
import RecentExpenses from "../components/RecentExpenses";
import ExpensesByCategoryChart from "../components/ExpensesByCategoryChart";
import AIAdvice from "../components/AIAdvice";
import "../styles/layout.css";



function Dashboard() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [expensesLoading, setExpensesLoading] = useState(true);
    const [expensesError, setExpensesError] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);


    async function loadSummary() {
        try {
            const data = await getSummary();
            setSummary(data);
        } catch (err) {
            setError("Could not load summary");
        } finally {
            setLoading(false);
        }
    }

    function handleExpenseAdded() {
        loadSummary();
        setRefreshKey((prev) => prev + 1);
    }

    async function loadRecentExpenses() {
        try {
            setExpensesLoading(true);
            const response = await fetch(
                "http://127.0.0.1:8000/expenses?limit=10"
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            setExpenses(data);
        } catch (err) {
            setExpensesError("Could not load expenses");
        } finally {
            setExpensesLoading(false);
        }
    }

    useEffect(() => {
        loadSummary();
        loadRecentExpenses();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="dashboard">

            <div className="section">
                <h2 className="title-section">Overview</h2>

                <div className="summary-grid">
                    <SummaryCard
                        title="Income"
                        value={`$${summary.total_income}`}
                        subtitle="Last 30 days"
                    />

                    <SummaryCard
                        title="Expenses"
                        value={`$${summary.total_expenses}`}
                        subtitle="Last 30 days"
                    />

                    <SummaryCard
                        title="Savings"
                        value={`$${summary.savings}`}
                        subtitle="Income - Expenses"
                    />

                    <SummaryCard
                        title="Expense Ratio"
                        value={`${summary.expense_ratio}%`}
                        subtitle="Percentage of income spent"
                    />
                </div>
            </div>


            <div className="section">
                <h2 className="title-section">Actions</h2>

                <div className="actions-grid">
                    <AddIncomeForm
                        onIncomeAdded={() => {
                            loadSummary();
                        }}
                    />

                    <AddExpenseForm
                        onExpenseAdded={() => {
                            loadRecentExpenses();
                            handleExpenseAdded();
                        }}
                    />
                </div>
            </div>


            <div className="section">
                <ExpensesByCategoryChart
                    refreshKey={refreshKey}
                />
            </div>

            <div className="section">
                <AIAdvice
                    refreshKey={refreshKey}
                />
            </div>

            <div className="section">
                <RecentExpenses
                    refreshKey={refreshKey}
                    expenses={expenses}
                    loading={expensesLoading}
                    error={expensesError}
                />
            </div>
        </div>
    );
}

export default Dashboard;
