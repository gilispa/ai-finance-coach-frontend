import "../styles/cards.css";

function SummaryCard({ title, value, subtitle }) {
    return (
        <div className="card summary-card">
            <h3 className="card-title">{title}</h3>

            <p className="card-value">
                {value}
            </p>

            {subtitle && (
                <p className="card-subtitle">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

export default SummaryCard;
