import React, { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { KeyRound, Lock, ArrowRight, LoaderCircle } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePasswordPage: React.FC = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("New password must be at least 8 characters long.");
            return;
        }

        setLoading(true);
        try {
            await api.patch('/auth/change-password', { oldPassword, newPassword });
            toast.success('Password changed successfully! Redirecting...');
            navigate('/');
        } catch (error) {
            let errorMessage = 'Failed to change password. Please check your old password.';
            if (axios.isAxiosError(error) && error.response) {
                errorMessage = error.response.data.message || errorMessage;
            }
            toast.error(errorMessage);
            console.error("Change password error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 md:p-10">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Change Your Password</h1>
                    <p className="text-gray-500 mt-2">Choose a new, strong password.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Current Password"
                            className="w-full pl-10 pr-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                            className="w-full pl-10 pr-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="relative">
                        <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm New Password"
                            className="w-full pl-10 pr-4 py-3 text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex justify-center items-center gap-2 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="animate-spin" />
                                <span>Updating...</span>
                            </>
                        ) : (
                            <>
                                <span>Update Password</span>
                                <ArrowRight className="h-5 w-5" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPage;

