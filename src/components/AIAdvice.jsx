import { useState } from "react";
import "../styles/cards.css";

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
        <div className="ai-card">
            <div className="ai-header">
                <span className="ai-badge">AI</span>
                <h3 className="card-title">Financial Coach</h3>
            </div>

            {!advice && (
                <>
                    <p className="ai-description">
                        Get personalized insights based on your recent income
                        and spending patterns.
                    </p>

                    <button
                        onClick={handleGetAdvice}
                        disabled={loading}
                    >
                        {loading ? "Analyzing..." : "Get Advice"}
                    </button>
                </>
            )}

            {error && <p className="ai-error">{error}</p>}

            {advice && (
                <p className="ai-response">
                    {advice}
                </p>
            )}
        </div>
    );
}

export default AIAdvice;
