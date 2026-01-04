import { useState } from "react";
import "../styles/forms.css";

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
            onIncomeAdded();
        } catch (err) {
            setError("Could not save income");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="form-card">
            <h3 className="title-section">Add Income</h3>

            <div className="form-group">
                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                />
            </div>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Source (e.g. salary, freelance)"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Income"}
                </button>
            </div>
        </form>
    );
}

export default AddIncomeForm;
