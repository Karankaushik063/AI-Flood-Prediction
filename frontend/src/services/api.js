const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
class ApiError extends Error {
    status;
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'ApiError';
    }
}
async function handleResponse(response) {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Request failed' }));
        throw new ApiError(response.status, error.message || `HTTP ${response.status}`);
    }
    return response.json();
}
export async function predictFlood(data) {
    const response = await fetch(`${API_BASE_URL}/predict`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}
export async function getModelInfo() {
    const response = await fetch(`${API_BASE_URL}/model/info`);
    return handleResponse(response);
}
export async function checkHealth() {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(response);
}
export { ApiError };
