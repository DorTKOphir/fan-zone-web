import { useEffect, useState } from 'react';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { format, isSameDay, parseISO } from 'date-fns';
import { Match } from '@/models/match';
import { fetchMatches } from '@/services/matches';
import MatchListItem from '../components/MatchListItem';

export default function MatchList() {
	const [matches, setMatches] = useState<Match[]>([]);
	const [selectedDate, setSelectedDate] = useState<string>(() => {
		const today = new Date();
		return today.toISOString().split('T')[0];
	});
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadMatches = async () => {
			try {
				setLoading(true);
				const data = await fetchMatches();
				setMatches(data);
				setError(null);
			} catch (err) {
				setError('Failed to load matches.');
			} finally {
				setLoading(false);
			}
		};
		loadMatches();
	}, []);

	const filteredMatches = selectedDate
		? matches.filter((match) => isSameDay(parseISO(match.date), new Date(selectedDate)))
		: matches;

	const sortedMatches = [...filteredMatches].sort(
		(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
	);

	return (
		<div className="w-[60%] max-w-5xl mx-auto mt-10 p-4 h-[80vh] flex flex-col">
			<div className="flex justify-center mb-4">
				<input
					type="date"
					value={selectedDate}
					onChange={(e) => setSelectedDate(e.target.value)}
					className="border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
				/>
				{selectedDate && (
					<button
						onClick={() => setSelectedDate('')}
						className="ml-4 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
					>
						Clear
					</button>
				)}
			</div>

			{loading && <div className="text-center text-gray-500 mt-10">Loading matches...</div>}

			{error && <div className="text-center text-red-500 mt-10">{error}</div>}

			{!loading && !error && (
				<ScrollArea className="w-[100%] mx-auto flex-1 rounded-lg border border-gray-200 shadow-inner p-4 bg-white">
					{sortedMatches.length > 0 ? (
						<div className="space-y-4">
							{sortedMatches.map((match) => (
								<MatchListItem match={match} />
							))}
						</div>
					) : (
						<div className="text-center text-gray-600 mt-24 text-xl font-semibold">
							No matches found for{' '}
							<span>
								{format(new Date(selectedDate), 'MMMM dd, yyyy')}
							</span>
							! ⚽ 
						</div>
					)}
				</ScrollArea>
			)}
		</div>
	);
}
