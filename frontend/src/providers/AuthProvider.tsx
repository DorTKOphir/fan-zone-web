// src/components/AuthProvider.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import {
	login as apiLogin,
	refreshToken as apiRefreshToken,
	logout as apiLogout,
} from '../services/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
	user: any;
	accessToken: string | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<any>(null);
	const [accessToken, setAccessToken] = useState<string | null>(
		localStorage.getItem('accessToken')
	);
	const navigate = useNavigate();

	useEffect(() => {
		const initializeAuth = async () => {
			if (localStorage.getItem('refreshToken')) {
				const newAccessToken = await apiRefreshToken();
				if (newAccessToken) {
					setAccessToken(newAccessToken);
					setUser({ email: localStorage.getItem('userEmail') });
				} else {
					apiLogout();
				}
			}
		};

		initializeAuth();
	}, []);

	const login = async (email: string, password: string) => {
		const res = await apiLogin(email, password);
		if (res.accessToken && res.refreshToken) {
			setAccessToken(res.accessToken);
			setUser({ email });
			localStorage.setItem('accessToken', res.accessToken);
			localStorage.setItem('refreshToken', res.refreshToken);
			localStorage.setItem('userEmail', email);
			navigate('/dashboard');
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, accessToken, login, logout: apiLogout }}
		>
			{children}
		</AuthContext.Provider>
	);
};
