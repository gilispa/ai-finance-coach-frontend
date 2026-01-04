import { useState, useEffect } from "react";
import "../styles/forms.css";

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
        } catch {
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
        <form onSubmit={handleSubmit} className="form-card">
            <h3 className="title-section">Add Expense</h3>

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
                >
                    <option value="">Select category</option>

                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}

                    <option value="new">➕ Create new category</option>
                </select>
            </div>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            {error && <p className="form-error">{error}</p>}

            <div className="form-actions">
                <button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Add Expense"}
                </button>
            </div>

            {showNewCategory && (
                <div className="category-overlay">
                    <div className="category-overlay-header">
                        <span className="category-overlay-title">
                            New category
                        </span>

                        <button
                            type="button"
                            className="overlay-close"
                            aria-label="Close"
                            onClick={() => {
                                setShowNewCategory(false);
                                setNewCategory("");
                            }}
                        >
                            ✕
                        </button>
                    </div>


                    <input
                        type="text"
                        placeholder="Category name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        autoFocus
                    />

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={createCategory}
                        >
                            Save category
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
}

export default AddExpenseForm;
