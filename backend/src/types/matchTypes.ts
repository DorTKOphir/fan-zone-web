export type Match = {
	id: number;
	homeTeam: string;
	awayTeam: string;
	homeTeamImage: string;
	awayTeamImage: string;
	date: string; // ISO string
	homeTeamScore: number | undefined;
	awayTeamScore: number | undefined;
};

export interface MatchesResponse {
	matches: MatchResponseData[];
}

export interface MatchResponseData {
	id: number;
	utcDate: string;
	homeTeam: Team;
	awayTeam: Team;
	score: Score;
}

interface Team {
	id: number;
	name: string;
	crest: string;
}

interface Score {
	fullTime: {
		home: number | null;
		away: number | null;
	};
	halfTime?: {
		home: number | null;
		away: number | null;
	};
	extraTime?: {
		home: number | null;
		away: number | null;
	};
	penalties?: {
		home: number | null;
		away: number | null;
	};
}
