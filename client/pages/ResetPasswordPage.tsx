// client/src/pages/ResetPasswordPage.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/authService';

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const tokenFromUrl = queryParams.get('token');
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            setError('No reset token found in the URL. Please use the link from your email.');
        }
    }, [location.search]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!token) {
            setError('Invalid or missing reset token.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setIsLoading(true);
        try {
            await resetPassword(token, password);
            setMessage('Your password has been reset successfully! Redirecting to login...');
            setPassword('');
            setConfirmPassword('');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="login-card w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-2xl border border-gray-200 mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Reset Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            placeholder="Enter new password"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                            Confirm New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            placeholder="Confirm new password"
                            required
                        />
                    </div>

                    {message && <p className="text-green-500 text-sm mb-4 text-center">{message}</p>}
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200 w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 text-sm">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;