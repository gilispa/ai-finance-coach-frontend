import Dashboard from "./pages/Dashboard";
import "./styles/layout.css";
import "./styles/header.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">AI Finance Coach</h1>
        <p className="app-subtitle">
          Smart insights to improve your financial habits
        </p>
      </header>

      <Dashboard />
    </div>
  );
}

export default App;
