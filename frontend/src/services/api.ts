// src/api/auth.ts
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_BASE_URL;
console.log(`API_BASE_URL ${import.meta.env.VITE_API_BASE_URL}`);
const api = axios.create({
	baseURL: apiUrl,
	headers: { 'Content-Type': 'application/json' },
});

export default api;
