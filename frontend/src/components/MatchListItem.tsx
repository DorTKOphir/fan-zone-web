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
			<p className="uppercase text-sm text-gray-500 mb-2 tracking-wide">
				{format(new Date(match.date), 'MMMM dd, yyyy - HH:mm')}
			</p>
			<div
				style={{
					display: 'grid',
					gridTemplateColumns: '1fr 7fr 3fr 7fr 1fr',
					width: '100%',
					justifyItems: 'center',
					alignItems: 'center',
				}}
			>
				<div className="flex justify-center items-center min-w-[6rem] min-h-[6rem]">
					<img
						src={match.homeTeamImage}
						alt={`${match.homeTeam} logo`}
						className="w-20 h-20 object-contain drop-shadow-lg"
					/>
				</div>

				<p className="font-semibold text-lg flex gap-2 items-center">{match.homeTeam}</p>

				<div className="flex justify-center">
					{typeof match.homeTeamScore === 'number' &&
					typeof match.awayTeamScore === 'number' ? (
						<div className="bg-blue-100 text-blue-800 font-bold text-xl px-4 py-2 rounded shadow-sm">
							{match.homeTeamScore} - {match.awayTeamScore}
						</div>
					) : (
						<div className="text-gray-500 font-medium text-lg">vs</div>
					)}
				</div>

				<p className="font-semibold text-lg flex gap-2 items-center">{match.awayTeam}</p>

				<div className="flex justify-center items-center min-w-[6rem] min-h-[6rem]">
					<img
						src={match.awayTeamImage}
						alt={`${match.awayTeam} logo`}
						className="w-20 h-20 object-contain drop-shadow-lg"
					/>
				</div>
			</div>
			<Button
				onClick={handleViewPosts}
				className="mt-6 cursor-pointer px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
			>
				View Posts
			</Button>
		</div>
	);
}
