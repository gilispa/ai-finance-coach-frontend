import { useEffect, useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

import "../styles/cards.css";

const COLORS = [
    "#3b82f6",
    "#60a5fa",
    "#38bdf8",
    "#22d3ee",
    "#6366f1",
    "#818cf8",
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

                if (!response.ok) throw new Error();

                const result = await response.json();
                setData(result);
            } catch {
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
        <div className="card">
            <h3 className="card-title">Spending Breakdown</h3>

            <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="total"
                            nameKey="category"
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            cursor={false}
                            contentStyle={{
                                background: "linear-gradient(180deg, #0b1220, #020617)",
                                border: "1px solid #1e293b",
                                borderRadius: "12px",
                                padding: "10px 12px",
                                boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                            }}
                            labelStyle={{
                                color: "#252525ff",
                                fontSize: "12px",
                                fontWeight: 500,
                                marginBottom: "4px",
                            }}
                            itemStyle={{
                                color: "#e5e7eb",
                                fontSize: "13px",
                                fontWeight: 600,
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default ExpensesByCategoryChart;
