import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { UserCircle, LogOut, KeyRound, LayoutDashboard } from 'lucide-react';

const Navbar: React.FC = () => {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const getDashboardLink = () => {
        if (!user) return "/";
        switch (user.role) {
            case 'ADMIN':
                return "/admin";
            case 'OWNER':
                return "/owner";
            default:
                return "/";
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to={getDashboardLink()} className="text-2xl font-bold text-blue-600">
                            StoreRating
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors"
                                >
                                    <UserCircle className="h-7 w-7 text-gray-600" />
                                    <span className="hidden md:block font-medium text-gray-700">{user.email}</span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2 z-50 border">
                                        <div className="px-4 py-2 border-b">
                                            <p className="text-sm font-semibold text-gray-800 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            to={getDashboardLink()}
                                            onClick={() => setDropdownOpen(false)}
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <LayoutDashboard className="mr-3 h-5 w-5"/>
                                            Dashboard
                                        </Link>
                                        <Link
                                            to="/change-password"
                                            onClick={() => setDropdownOpen(false)}
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            <KeyRound className="mr-3 h-5 w-5"/>
                                            Change Password
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                        >
                                            <LogOut className="mr-3 h-5 w-5"/>
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-x-2">
                                <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100">Login</Link>
                                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

