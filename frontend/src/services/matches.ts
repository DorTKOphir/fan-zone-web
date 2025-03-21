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

export const getMatchById = async (matchId: string): Promise<Match> => {
	const response = await api.get(`/matches/${matchId}`);
	return response.data;
  };
