import { useState } from "react";

function AddIncomeForm({ onIncomeAdded }) {
    const [amount, setAmount] = useState("");
    const [source, setSource] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/income", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: Number(amount),
                    source,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save income");
            }

            setAmount("");
            setSource("");

            onIncomeAdded(); // notifica al dashboard
        } catch (err) {
            setError("Could not save income");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "16px",
                backgroundColor: "#fff",
            }}
        >
            <h3>Add Income</h3>

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{ width: "100%", marginBottom: "8px" }}
            />

            <input
                type="text"
                placeholder="Source (e.g. salary, freelance)"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
                style={{ width: "100%", marginBottom: "8px" }}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Add Income"}
            </button>
        </form>
    );
}

export default AddIncomeForm;
