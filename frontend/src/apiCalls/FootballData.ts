import { Match } from '@/types/types';
import axios from 'axios';

export const fetchMatches = async (): Promise<Match[]> => {
	try {
		const response = await axios.get('http://localhost:5000/api/matches');
		debugger;
		return response.data;
	} catch (error) {
		throw error;
	}
};
