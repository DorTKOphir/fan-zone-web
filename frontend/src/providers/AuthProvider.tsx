import { createContext, useContext, useEffect, useState } from 'react';
import {
	login as apiLogin,
	refreshToken as apiRefreshToken,
	logout as apiLogout,
	register as apiRegister,
	loginWithGoogle as apiLoginWithGoogle,
	getUser,
} from '../services/auth';
import { useNavigate } from 'react-router-dom';
import User from '@/models/user';

interface AuthContextType {
	user: User | null;
	userLoading: boolean;
	accessToken: string | null;
	login: (username: string, password: string) => Promise<void>;
	loginWithGoogle: (credential: string) => void;
	signUp: (username: string, email: string, password: string) => Promise<void>;
	logout: () => void;
	reloadUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error('useAuth must be used within an AuthProvider');
	return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [userLoading, setUserLoading] = useState<boolean>(false);
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
					reloadUser();
				} else {
					apiLogout();
				}
			}
		};

		initializeAuth();
	}, []);

	const loadUser = async (loadingUserCallback: () => Promise<void>) => {
		setUserLoading(true);
		try {
			await loadingUserCallback();
		} catch (error) {
			console.error('Error loading user:', error);
			throw error;
		} finally {
			setUserLoading(false);
		}
	};

	const login = async (username: string, password: string) => {
		await loadUser(async () => {
			const { accessToken, refreshToken, user } = await apiLogin(username, password);
			setAuthProperties(accessToken, refreshToken, user);
		});
	};

	const signUp = async (username: string, email: string, password: string) => {
		try {
			await loadUser(async () => {
				const { accessToken, refreshToken, user } = await apiRegister(
					username,
					email,
					password,
				);
				setAuthProperties(accessToken, refreshToken, user);
			});
		} catch (error) {
			throw error;
		}
	};

	const loginWithGoogle = async (credential: string) => {
		await loadUser(async () => {
			try {
				const { accessToken, refreshToken, user } = await apiLoginWithGoogle(credential);
				setAuthProperties(accessToken, refreshToken, user);
			} catch (error) {
				console.error('Google login failed:', error);
			}
		});
	};

	const setAuthProperties = (accessToken: string, refreshToken: string, user: User) => {
		if (accessToken && refreshToken) {
			setAccessToken(accessToken);
			localStorage.setItem('accessToken', accessToken);
			localStorage.setItem('refreshToken', refreshToken);
			setUser(user);
			navigate('/');
		}
	};

	const reloadUser = async () => {
		await loadUser(async () => {
			const userData = await getUser();
			if (userData) {
				setUser(userData);
			}
		});
	};

	const logout = async () => {
		await apiLogout();
		setUser(null);
		setAccessToken('');
		navigate('/sign-in');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				userLoading,
				accessToken,
				login,
				signUp,
				loginWithGoogle,
				logout,
				reloadUser,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
