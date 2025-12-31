function RecentExpenses({ expenses, loading, error }) {
    if (loading) return <p>Loading expenses...</p>;
    if (error) return <p>{error}</p>;

    if (expenses.length === 0) {
        return <p>No expenses yet.</p>;
    }

    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#fff",
                marginTop: "16px",
            }}
        >
            <h3>Recent Expenses</h3>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {expenses.map((expense) => (
                    <li
                        key={expense.id}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "8px 0",
                            borderBottom: "1px solid #eee",
                        }}
                    >
                        <div>
                            <strong>{expense.category}</strong>
                            {expense.description && (
                                <div
                                    style={{
                                        fontSize: "12px",
                                        color: "#666",
                                    }}
                                >
                                    {expense.description}
                                </div>
                            )}
                        </div>

                        <div style={{ fontWeight: "bold" }}>
                            ${expense.amount}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RecentExpenses;
