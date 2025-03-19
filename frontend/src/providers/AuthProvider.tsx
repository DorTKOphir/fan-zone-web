import { createContext, useContext, useEffect, useState } from 'react';
import {
	login as apiLogin,
	refreshToken as apiRefreshToken,
	logout as apiLogout,
	register as apiRegister,
	getUser,
} from '../services/auth';
import { useNavigate } from 'react-router-dom';
import User from '@/models/user';

interface AuthContextType {
	user: User | null;
	accessToken: string | null;
	login: (username: string, password: string) => Promise<void>;
	signUp: (username: string, email: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [accessToken, setAccessToken] = useState<string | null>(
		localStorage.getItem('accessToken'),
	);
	const navigate = useNavigate();

	useEffect(() => {
		const initializeAuth = async () => {
			if (localStorage.getItem('refreshToken')) {
				const newAccessToken = await apiRefreshToken();
				if (newAccessToken) {
					setAccessToken(newAccessToken);

					const userData = await getUser();
					if (userData) {
						setUser(userData);
					}
				} else {
					apiLogout();
				}
			}
		};

		initializeAuth();
	}, []);

	const login = async (username: string, password: string) => {
		const res = await apiLogin(username, password);
		if (res.accessToken && res.refreshToken) {
			setAccessToken(res.accessToken);
			setUser(res.user);
			localStorage.setItem('accessToken', res.accessToken);
			localStorage.setItem('refreshToken', res.refreshToken);
			navigate('/');
		}
	};

	const signUp = async (username: string, email: string, password: string) => {
		const res = await apiRegister(username, email, password);
		if (res.accessToken && res.refreshToken) {
			setAccessToken(res.accessToken);
			localStorage.setItem('accessToken', res.accessToken);
			localStorage.setItem('refreshToken', res.refreshToken);
			setUser(res.user);
			navigate('/');
		}
	};

	return (
		<AuthContext.Provider value={{ user, accessToken, login, signUp, logout: apiLogout }}>
			{children}
		</AuthContext.Provider>
	);
};
