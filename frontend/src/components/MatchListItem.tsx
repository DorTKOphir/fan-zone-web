import { Match } from '@/models/match';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type MatchListItemProps = {
	match: Match;
};

export default function MatchListItem({ match }: MatchListItemProps) {
	const navigate = useNavigate();

	const handleViewPosts = () => {
		navigate(`/${match.id}`);
	};

	return (
		<div
			key={match.id}
			className="flex flex-col items-center bg-gray-50 rounded-xl shadow-sm p-4 hover:bg-gray-100 transition"
		>
			<p className="font-semibold text-lg flex gap-2 items-center">
				{format(new Date(match.date), 'MMMM dd, yyyy - HH:mm')}
			</p>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 7fr 2fr 7fr 1fr',
					width: '100%',
					justifyItems: 'center',
					alignItems: 'center',
				}}
			>
				<img
					src={match.homeTeamImage}
					alt={`${match.homeTeam} logo`}
					className="w-10 h-10 object-contain"
				/>

				<p className="font-semibold text-lg flex gap-2 items-center">{match.homeTeam}</p>

				<div>
					<span>
						{typeof match.homeTeamScore === 'number' &&
						typeof match.awayTeamScore === 'number' ? (
							<span className="font-bold">
								{match.homeTeamScore} - {match.awayTeamScore}
							</span>
						) : (
							<span className="text-gray-500">vs</span>
						)}
					</span>
				</div>

				<p className="font-semibold text-lg flex gap-2 items-center">{match.awayTeam}</p>

				<img
					src={match.awayTeamImage}
					alt={`${match.awayTeam} logo`}
					className="w-10 h-10 object-contain"
				/>
			</div>
			<Button
				onClick={handleViewPosts}
				className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
			>
				View Posts
			</Button>
		</div>
	);
}
