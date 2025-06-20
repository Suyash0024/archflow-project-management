/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/authService';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState<string>(''); // New state for email specific error
    const [passwordError, setPasswordError] = useState<string>(''); // New state for password specific error
    const [formError, setFormError] = useState<string>(''); // General form error
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const validateEmail = (email: string) => {
        
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Please enter a valid email address.');
            return false;
        }
        setEmailError('');
        return true;
    };

    const validatePassword = (password: string) => {
        if (password.length < 6) { 
            setPasswordError('Password must be at least 6 characters long.');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        
        
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

    if (!isEmailValid || !isPasswordValid) {
      return;
    }

    setLoading(true);

        try {
            const data = await loginUser(email, password);
            if (data.token) {
                localStorage.setItem('token', data.token);
                
                navigate('/dashboard');
            }
        } catch (err: unknown) {
            console.error('Login error:', err);
            if (typeof err === 'object' && err !== null && 'response' in err && typeof (err as any).response === 'object') {
                setFormError((err as { response?: { data?: { message?: string } } }).response?.data?.message || 'Invalid credentials. Please try again.');
            } else {
                setFormError('Invalid credentials. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex   items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full p-8 space-y-8 bg-white rounded-lg shadow-2xl border border-gray-200 mx-auto">
                <h2 className="text-4xl font-extrabold text-center text-gray-900">Login to ArchFlow</h2>
                {formError && <p className="text-red-500 text-center text-sm mb-4">{formError}</p>}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="sr-only">Email address</label> 
                            <input
                                type="email"
                                id="email"
                                name="email" 
                                autoComplete="email" 
                                className={`
                                    relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 
                                    text-gray-900 rounded-md focus:outline-none focus:ring-green-500 
                                    focus:border-green-500 focus:z-10 sm:text-sm
                                    ${emailError ? "border-red-500" : ""}
                                `}
                                placeholder="Email address" 
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    validateEmail(e.target.value);
                                }}
                                required
                            />
                            {emailError && <p className="text-red-500 text-xs italic mt-1">{emailError}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="sr-only">Password</label> 
                            <input
                                type="password"
                                id="password"
                                name="password" 
                                autoComplete="current-password" 
                                className={`
                                    relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 
                                    text-gray-900 rounded-md focus:outline-none focus:ring-green-500 
                                    focus:border-green-500 focus:z-10 sm:text-sm
                                    ${passwordError ? "border-red-500" : ""}
                                `}
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    validatePassword(e.target.value);
                                }}
                                required
                            />
                            {passwordError && <p className="text-red-500 text-xs italic mt-1">{passwordError}</p>}
                            <div className="text-right text-sm mt-2">
                                <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-500">
    Forgot your password?
  </Link>
                            </div>
                        </div>
                    </div>

          <div>
            <button
              type="submit"
              className={`
                                group relative w-full flex justify-center py-2 px-4 border border-transparent 
                                text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                                transition duration-200 ease-in-out transform 
                                ${
                                  loading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:scale-105 active:scale-95"
                                }
                            `}
              disabled={loading || !!emailError || !!passwordError}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-green-600 hover:text-green-500"
          >
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
