import axios, { AxiosResponse } from 'axios';
import { MatchesResponse, MatchResponseData } from '../types/matchTypes';

export const fetchMatches = async () => {
	const response: AxiosResponse<MatchesResponse> = await axios.get(
		`${process.env.MATCHE_API_BASE_URL}/v4/competitions/PL/matches`,
		{
			headers: {
				'X-Auth-Token': process.env.MATCHE_API_TOKEN,
			},
			params: {
				hours: 'hourly',
			},
		},
	);

	return parseMatches(response.data.matches);
};

const parseMatches = (matches: MatchResponseData[]) =>
	matches.map((match) => ({
		id: match.id,
		date: match.utcDate,
		homeTeam: match.homeTeam.name,
		awayTeam: match.awayTeam.name,
		homeTeamScore: match.score?.fullTime.home,
		awayTeamScore: match.score?.fullTime.away,
	}));
