// client/src/pages/ForgotPasswordPage.tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { requestPasswordReset } from '../services/authService';

const ForgotPasswordPage: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<React.ReactNode>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!username) {
            setError('Please enter your username.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await requestPasswordReset(username);

            // !!! DANGEROUS AND HIGHLY INSECURE FOR PRODUCTION !!!
            // Directly navigating with the token exposes it to anyone monitoring the network.
            if (response.resetToken) {
                setMessage(
                    <p>
                        Password reset token generated. Redirecting to password reset page...
                        <span className="text-red-600 font-bold">
                            (WARNING: This flow is extremely insecure. Tokens should never be directly exposed.)
                        </span>
                    </p>
                );
                setUsername('');
                // Navigate to the reset password page with the token
                navigate(`/reset-password?token=${response.resetToken}`);
            } else {
                setMessage(response.message || 'Request processed.');
            }
        } catch (err: any) {
            // Be generic with error messages to prevent username enumeration
            setError(err.response?.data?.message || 'Failed to process request. Please try again or ensure the username is correct.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="login-card w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-2xl border border-gray-200 mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                            Username <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
                            placeholder="Your username"
                            required
                        />
                    </div>

                    {message && <div className="text-green-500 text-sm mb-4 text-center">{message}</div>}
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200 w-full"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Processing...' : 'Request Reset Link'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link to="/login" className="text-blue-500 hover:text-blue-700 text-sm">
                        Remember your password? Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;