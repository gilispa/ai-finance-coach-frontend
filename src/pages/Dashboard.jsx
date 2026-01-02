import { useEffect, useState } from "react";
import SummaryCard from "../components/SummaryCard";
import AddExpenseForm from "../components/AddExpenseForm";
import { getSummary } from "../services/api";
import AddIncomeForm from "../components/AddIncomeForm";
import RecentExpenses from "../components/RecentExpenses";
import ExpensesByCategoryChart from "../components/ExpensesByCategoryChart";


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
        <div style={{ padding: "16px" }}>
            <h2>Dashboard</h2>
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

            <ExpensesByCategoryChart
                refreshKey={refreshKey}
            />

            <RecentExpenses
                refreshKey={refreshKey}
                expenses={expenses}
                loading={expensesLoading}
                error={expensesError}
            />
        </div>
    );
}

export default Dashboard;
