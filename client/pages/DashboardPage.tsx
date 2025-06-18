/* eslint-disable @typescript-eslint/no-explicit-any */
// archflow-project-management/client/src/pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile, logout } from '../services/authService';
import { isLoggedIn } from '../utils/authUtils';

interface UserProfile {
    _id: string;
    username: string;
    email: string;
}

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProfile = async () => {
            if (!isLoggedIn()) {
                navigate('/login');
                return;
            }
            try {
                const profile = await getUserProfile();
                setUserProfile(profile);
            } catch (err: any) {
                console.error("Failed to fetch user profile:", err);
                setError(err.response?.data?.message || "Failed to load user profile. Please log in again.");
                logout(); // Log out if token is invalid
                navigate('/login');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) {
        return <div className="text-center mt-12 text-lg text-gray-700">Loading profile...</div>;
    }

    if (error) {
        return <div className="text-center mt-12 text-lg text-red-600">{error}</div>;
    }

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-2xl border border-gray-100">
            <h2 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Welcome to ArchFlow, {userProfile?.username}!</h2>
            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
                <p className="text-lg text-gray-700 mb-2"><strong>User ID:</strong> <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{userProfile?._id}</span></p>
                <p className="text-lg text-gray-700 mb-2"><strong>Username:</strong> <span className="font-semibold text-blue-700">{userProfile?.username}</span></p>
                <p className="text-lg text-gray-700 mb-4"><strong>Email:</strong> <span className="font-semibold text-blue-700">{userProfile?.email}</span></p>
                <p className="text-gray-600 italic">This is your ArchFlow project management dashboard. You can access your projects, tasks, and team members here.</p>
            </div>
            <button
                onClick={handleLogout}
                className="block mx-auto mt-10 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg shadow-md transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
                Logout
            </button>
        </div>
    );
};

export default DashboardPage;