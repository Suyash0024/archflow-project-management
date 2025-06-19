import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

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

export const logout = (): void => {
    localStorage.removeItem('token');
   
};
export const requestPasswordReset = async (username: string): Promise<void> => {
    await API.post('/auth/forgot-password', { username });
};

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    await API.post('/auth/reset-password', { token, newPassword });
};