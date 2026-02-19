import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
    name: string;
    email: string;
    role: 'ADMIN' | 'EDITOR';
    avatar?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock User Data
const MOCK_USER: User = {
    name: 'Alex Silva',
    email: 'alex@dev.com',
    role: 'ADMIN',
    avatar: 'https://github.com/alexdev.png' // Fallback handled in component
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for persisted session
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error('Failed to parse stored user', e);
                localStorage.removeItem('auth_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock Validation: simple integrity check
        if (email === 'alex@dev.com' && password === 'admin123') {
            const authenticatedUser = { ...MOCK_USER, email }; // ensure email matches
            setUser(authenticatedUser);
            localStorage.setItem('auth_user', JSON.stringify(authenticatedUser));
            setIsLoading(false);
            return true;
        }

        setIsLoading(false);
        return false;
    };

    const logout = () => {
        setIsLoading(true);
        // Simulate API delay
        setTimeout(() => {
            localStorage.removeItem('auth_user');
            setUser(null);
            setIsLoading(false);
        }, 500);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            isLoading,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
