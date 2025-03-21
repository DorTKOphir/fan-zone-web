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
	const response: AxiosResponse<MatchResponseData> = await axios.get(
		`${process.env.MATCHES_API_BASE_URL}/v4/matches/${matchId}`,
		{
			headers: {
				'X-Auth-Token': process.env.MATCHES_API_TOKEN,
			},
		},
	);

	return parseMatch(response.data);
};

const parseMatch = (match: MatchResponseData) => ({
	id: match.id,
	date: match.utcDate,
	homeTeam: match.homeTeam.name,
	awayTeam: match.awayTeam.name,
	homeTeamScore: match.score?.fullTime.home,
	awayTeamScore: match.score?.fullTime.away,
});

const parseMatches = (matches: MatchResponseData[]) => matches.map(parseMatch);
