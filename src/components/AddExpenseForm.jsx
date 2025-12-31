import { useState, useEffect } from "react";

function AddExpenseForm({ onExpenseAdded }) {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [showNewCategory, setShowNewCategory] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Load categories on mount
    useEffect(() => {
        fetch("http://127.0.0.1:8000/categories")
            .then((res) => res.json())
            .then(setCategories)
            .catch(() => setError("Could not load categories"));
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://127.0.0.1:8000/expenses", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: Number(amount),
                    category_id: Number(categoryId),
                    description,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save expense");
            }

            setAmount("");
            setDescription("");
            setCategoryId("");

            onExpenseAdded();
        } catch (err) {
            setError("Could not save expense");
        } finally {
            setLoading(false);
        }
    }

    async function createCategory() {
        if (!newCategory.trim()) return;

        const res = await fetch("http://127.0.0.1:8000/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newCategory }),
        });

        const created = await res.json();

        setCategories((prev) => [...prev, created]);
        setCategoryId(created.id);
        setNewCategory("");
        setShowNewCategory(false);
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
            <h3>Add Expense</h3>

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                style={{ width: "100%", marginBottom: "8px" }}
            />

            <select
                value={categoryId}
                onChange={(e) => {
                    if (e.target.value === "new") {
                        setShowNewCategory(true);
                    } else {
                        setCategoryId(e.target.value);
                    }
                }}
                required
                style={{ width: "100%", marginBottom: "8px" }}
            >
                <option value="">Select category</option>

                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}

                <option value="new">➕ Create new category</option>
            </select>

            {showNewCategory && (
                <div style={{ marginBottom: "8px" }}>
                    <input
                        type="text"
                        placeholder="New category name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        style={{ width: "100%", marginBottom: "4px" }}
                    />
                    <button
                        type="button"
                        onClick={createCategory}
                        style={{ width: "100%" }}
                    >
                        Save category
                    </button>
                </div>
            )}

            <input
                type="text"
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", marginBottom: "8px" }}
            />

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Add Expense"}
            </button>
        </form>
    );
}

export default AddExpenseForm;
