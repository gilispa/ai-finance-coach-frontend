const API_BASE_URL = "http://127.0.0.1:8000";

export async function getSummary() {
    const response = await fetch(`${API_BASE_URL}/analytics/summary`);

    if (!response.ok) {
        throw new Error("Failed to fetch summary");
    }

    return response.json();
}

export const getCategories = () =>
    fetch(`${API_URL}/categories`).then(res => res.json());

export const getExpenses = (limit = 10) =>
    fetch(`${API_URL}/expenses?limit=${limit}`).then(res => res.json());
