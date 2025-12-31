function SummaryCard({ title, value, subtitle }) {
    return (
        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "12px",
                backgroundColor: "#fff",
            }}
        >
            <h3 style={{ margin: 0, color: "#383737ff" }}>{title}</h3>
            <p style={{ fontSize: "24px", fontWeight: "bold", margin: "8px 0", color: "#2a2a2aff" }}>
                {value}
            </p>
            {subtitle && (
                <p style={{ color: "#666", margin: 0 }}>{subtitle}</p>
            )}
        </div>
    );
}

export default SummaryCard;
