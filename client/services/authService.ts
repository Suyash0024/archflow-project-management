// archflow-frontend/src/services/authService.ts
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Your backend API base URL
});

// Request interceptor to add JWT token to headers
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

interface AuthResponse {
    _id: string;
    username: string;
    email: string;
    token: string;
}

interface UserProfile {
    _id: string;
    username: string;
    email: string;
}

export const registerUser = async (username: string, email: string, password: string): Promise<AuthResponse> => {
    const response = await API.post('/auth/register', { username, email, password });
    return response.data;
};

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
    const response = await API.post('/auth/login', { email, password });
    return response.data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
    const response = await API.get('/auth/profile');
    return response.data;
};

// Helper function to handle logout
export const logout = (): void => {
    localStorage.removeItem('token');
    // You might want to clear user info if stored separately
    // localStorage.removeItem('userInfo');
};