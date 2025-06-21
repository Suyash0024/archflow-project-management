import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import DashboardPage from '../pages/DashboardPage'; // Import DashboardPage
import ForgotPasswordPage from '../pages/ForgetPasswordPage';
import ResetPasswordPage from '../pages/ResetPasswordPage';
import { isLoggedIn } from '../utils/authUtils';
// ClientDetails is no longer directly imported here as it's rendered within DashboardContent

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    return isLoggedIn() ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />

                {/* Private Dashboard Route - now includes nested routes */}
                {/* The `/*` wildcard means this route will match /dashboard AND any sub-paths like /dashboard/clients */}
                <Route
                    path="/dashboard/*" // Use /* to allow for nested routes
                    element={
                        <PrivateRoute>
                            <DashboardPage /> {/* DashboardPage contains Sidebar and DashboardContent with its own Routes */}
                        </PrivateRoute>
                    }
                />

                {/* Redirect root to login if not authenticated, or dashboard if authenticated */}
                <Route path="/" element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />

                {/* Catch-all for undefined routes */}
                <Route path="*" element={<h2 className="text-center text-xl font-bold mt-20">404 - Page Not Found</h2>} />
            </Routes>
        </Router>
    );
};

export default App;
