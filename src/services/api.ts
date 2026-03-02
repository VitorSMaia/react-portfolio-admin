import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor: Attach JWT token and Relay API Key
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Attach Relay API Key if the request is for the SES server
        const sesUrl = import.meta.env.VITE_SES_SERVER_URL || 'http://localhost:3001';
        if (config.url?.startsWith(sesUrl) || config.url?.includes('/api/send-email')) {
            const relayKey = import.meta.env.VITE_RELAY_API_KEY;
            if (relayKey) {
                config.headers['x-api-key'] = relayKey;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor: Handle expired tokens (401)
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear token and redirect to login
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
