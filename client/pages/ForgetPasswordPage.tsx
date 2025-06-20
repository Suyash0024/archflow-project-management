/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../services/authService';

const ForgotPasswordPage: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Changed from email to username
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('');
        setError('');

    if (!username) { // Validate username
      setError('Please enter your username.');
      return;
    }

    setIsLoading(true);
    try {
      // Assuming requestPasswordReset can take a username or email.
      // In a real scenario, this would send an email and the user waits.
      // For immediate redirection as requested, we navigate after this call.
      await requestPasswordReset(username); // Call auth service to request reset

      // Immediately navigate to the reset password page as per the image's implied flow.
      // WARNING: In a production app, you would NOT navigate directly here.
      // Instead, you'd show a message like "Check your email for a reset link."
      // The user would then click a tokenized link in their email to reach the ResetPasswordPage.
      navigate('/reset-password'); // Direct navigation as per your request
      setMessage('Processing request...'); // This message might flash briefly before navigation
    } catch (err: any) {
      // Handle errors from requestPasswordReset (e.g., username not found)
      setError(err.response?.data?.message || 'Failed to process request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="login-card w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>
        {/* Removed introductory paragraph to match image */}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username <span className="text-red-500">*</span> {/* Added asterisk */}
            </label>
            <input
              type="text" // Changed type to text for username
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
              required
            />
          </div>

                    {message && <div className="text-green-500 text-sm mb-4 text-center">{message}</div>}
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

          <button
            type="submit"
            // Adjusted button styling to match image's yellow button
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200 w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Forgot Password'} {/* Changed button text */}
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