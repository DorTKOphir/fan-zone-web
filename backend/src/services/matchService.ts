import axios, { AxiosResponse } from 'axios';
import { MatchesResponse, MatchResponseData } from '../types/matchTypes';

export const fetchMatches = async () => {
	const response: AxiosResponse<MatchesResponse> = await axios.get(
		`${process.env.MATCHES_API_BASE_URL}/v4/competitions/PL/matches`,
		{
			headers: {
				'X-Auth-Token': process.env.MATCHES_API_TOKEN,
			},
			params: {
				hours: 'hourly',
			},
		},
	);

	return parseMatches(response.data.matches);
};

export const fetchMatchById = async (matchId: string) => {
	return {
		"id": 497410,
		"date": "2024-08-16T19:00:00Z",
		"homeTeam": "Manchester United FC",
		"awayTeam": "Fulham FC",
		"homeTeamScore": 1,
		"awayTeamScore": 0
	};
}

const parseMatches = (matches: MatchResponseData[]) =>
	matches.map((match) => ({
		id: match.id,
		date: match.utcDate,
		homeTeam: match.homeTeam.name,
		awayTeam: match.awayTeam.name,
		homeTeamScore: match.score?.fullTime.home,
		awayTeamScore: match.score?.fullTime.away,
	}));
