// client/src/services/authService.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Ensure this matches your backend API URL
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

/**
 * Sends a request to the backend to initiate a password reset by username.
 * In this INSECURE setup, the backend will directly return the token.
 * @param username The username of the user requesting the reset.
 */
export const requestPasswordReset = async (username: string): Promise<any> => {
    const response = await API.post('/auth/forgot-password', { username });
    return response.data;
};

/**
 * Sends a request to the backend to reset the user's password using a valid token.
 * @param token The reset token received via URL.
 * @param newPassword The user's new password.
 */
export const resetPassword = async (token: string, newPassword: string): Promise<any> => {
    const response = await API.put(`/auth/reset-password/${token}`, { newPassword });
    return response.data;
};