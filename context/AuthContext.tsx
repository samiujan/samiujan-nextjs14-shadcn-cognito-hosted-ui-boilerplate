'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getSignInUrl, getSignOutUrl } from '@/lib/auth';
import { AuthUser } from '@/types/auth';

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    signIn: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/session');
            const data = await response.json();

            if (data.user) {
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const signIn = () => {
        window.location.href = getSignInUrl();
    };

    const signOut = () => {
        window.location.href = getSignOutUrl();
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};