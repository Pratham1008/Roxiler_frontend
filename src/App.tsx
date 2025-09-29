import React, {JSX} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import Navbar from './components/Navbar';
import { Toaster } from 'react-hot-toast';
import ChangePasswordPage from "./pages/ChangePasswordPage";

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-gray-50 font-sans">
                    <Toaster position="top-right" reverseOrder={false} />
                    <Navbar />
                    <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                        <AppRoutes />
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
};

const AppRoutes: React.FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/" />} />
            <Route path="/change-password" element={user ? <ChangePasswordPage /> : <Navigate to="/login" />} />

            <Route
                path="/"
                element={
                    user ? (
                        user.role === 'ADMIN' ? <Navigate to="/admin" /> :
                            user.role === 'OWNER' ? <Navigate to="/owner" /> :
                                <UserDashboard />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route path="/admin" element={<ProtectedRoute roles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/owner" element={<ProtectedRoute roles={['OWNER']}><StoreOwnerDashboard /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const ProtectedRoute: React.FC<{ children: JSX.Element; roles: string[] }> = ({ children, roles }) => {
    const { user } = useAuth();
    if (!user || !roles.includes(user.role)) {
        return <Navigate to="/login" />;
    }
    return children;
};


export default App;

