import "../styles/cards.css";
import "../styles/recent-expenses.css";

function RecentExpenses({ expenses, loading, error }) {
    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p>{error}</p>;
    if (expenses.length === 0) return <p>No expenses yet.</p>;

    return (
        <div className="card">
            <h3 className="title-section">Recent Expenses</h3>

            <ul className="expenses-list">
                {expenses.map((expense) => (
                    <li key={expense.id} className="expense-item">
                        <div className="expense-info">
                            <span className="expense-category">
                                {expense.category}
                            </span>

                            {expense.description && (
                                <span className="expense-description">
                                    {expense.description}
                                </span>
                            )}
                        </div>

                        <span className="expense-amount">
                            ${expense.amount}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentExpenses;
