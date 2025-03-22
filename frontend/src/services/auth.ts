import api from './api';

// Automatically attach accessToken to every request
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('accessToken');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Interceptor for handling 401 Unauthorized (refresh token flow)
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			try {
				const newToken = await refreshToken();
				if (newToken) {
					error.config.headers.Authorization = `Bearer ${newToken}`;
					return api.request(error.config); // Retry the original request
				}
			} catch (refreshError) {
				console.error('Token refresh failed', refreshError);
			}
			logout(); // If refresh fails, log out
		}
		return Promise.reject(error);
	},
);

export const login = async (username: string, password: string) => {
	const response = await api.post('/auth/login', { username, password });
	return response.data;
};

export const register = async (username: string, email: string, password: string) => {
	const response = await api.post('/auth/register', { email, username, password });
	return response.data;
};

export const loginWithGoogle = async (credential: string) => {
	const res = await api.post("/auth/google", { credential });
	return res.data;
};

export const refreshToken = async (): Promise<string | null> => {
	const storedRefreshToken = localStorage.getItem('refreshToken');
	if (!storedRefreshToken) return null;

	try {
		const response = await api.post('/auth/refresh', {
			refreshToken: storedRefreshToken,
		});
		const { accessToken } = response.data;

		if (accessToken) {
			localStorage.setItem('accessToken', accessToken);
			return accessToken;
		}
	} catch (error) {
		console.error('Refresh token error', error);
	}

	return null;
};

export const logout = async () => {
	await api.post("/auth/logout", { refreshToken: localStorage.getItem('refreshToken') });
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
};

export const getUser = async () => {
	try {
		const response = await api.get('/users');
		return response.data;
	} catch (error) {
		console.error('Failed to fetch user data', error);
		return null;
	}
};
