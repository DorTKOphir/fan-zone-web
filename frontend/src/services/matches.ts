import api from '@/services/api';
import { Match } from '@/models/match';

export const fetchMatches = async (): Promise<Match[]> => {
	try {
		const response = await api.get('/matches');
		return response.data;
	} catch (error) {
		throw error;
	}
};
