import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
];

function ExpensesByCategoryChart({ refreshKey }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(
                    "http://127.0.0.1:8000/analytics/expenses-by-category"
                );

                if (!response.ok) {
                    throw new Error("Failed to load chart data");
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError("Could not load chart");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [refreshKey]);

    if (loading) return <p>Loading chart...</p>;
    if (error) return <p>{error}</p>;
    if (data.length === 0) return <p>No expense data yet.</p>;

    return (
        <div
            style={{
                width: "100%",
                height: 300,
                marginTop: "24px",
                padding: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#fff",
            }}
        >
            <h3>Expenses by Category</h3>

            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="total"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ExpensesByCategoryChart;
