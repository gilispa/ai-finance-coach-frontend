import { useState } from "react";

function AIAdvice() {
    const [advice, setAdvice] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleGetAdvice() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                "http://127.0.0.1:8000/analytics/ai-advice"
            );

            if (!response.ok) {
                throw new Error();
            }

            const data = await response.json();
            setAdvice(data.advice);
        } catch (err) {
            setError("Could not generate advice");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            style={{
                marginTop: "24px",
                padding: "16px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9fafb",
            }}
        >
            <h3>🧠 AI Financial Coach</h3>

            {!advice && (
                <>
                    <p>
                        Get personalized insights based on your recent income
                        and expenses.
                    </p>

                    <button
                        onClick={handleGetAdvice}
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Get Advice"}
                    </button>
                </>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {advice && (
                <p
                    style={{
                        marginTop: "12px",
                        whiteSpace: "pre-line",
                        lineHeight: "1.6",
                    }}
                >
                    {advice}
                </p>
            )}
        </div>
    );
}

export default AIAdvice;
