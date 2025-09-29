import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { User } from '../types';
import api from '../services/api';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const decodeToken = (token: string): User | null => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return {
                userId: payload.sub,
                email: payload.email,
                role: payload.role,
            };
        } catch (error) {
            console.error('Failed to decode token:', error);
            return null;
        }
    };

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setUser(null);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedUser = decodeToken(token);
            if (decodedUser) {
                setUser(decodedUser);
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                logout();
            }
        }
        setLoading(false);
    }, [logout]);

    const login = (token: string) => {
        localStorage.setItem('token', token);
        const decodedUser = decodeToken(token);
        setUser(decodedUser);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
