import axios from 'axios';

const apiUrl = `${import.meta.env.VITE_BACKEND_BASE_URL}/api`;

console.log('API_URL', apiUrl);

const api = axios.create({
	baseURL: apiUrl,
	headers: { 'Content-Type': 'application/json' },
});

export default api;
