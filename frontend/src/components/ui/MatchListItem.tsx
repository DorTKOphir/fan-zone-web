import { Match } from "@/types/types";
import { format } from "date-fns";

type MatchListItemProps = {
  match: Match;
};

export default function MatchListItem({ match }: MatchListItemProps) {
  return (
    <div
      key={match.id}
      className="flex justify-between items-center bg-gray-50 rounded-xl shadow-sm p-4 hover:bg-gray-100 transition"
    >
      <div className="space-y-1">
        <p className="font-semibold text-lg">
          {match.homeTeam} <span className="text-gray-500">vs</span>{" "}
          {match.awayTeam}
        </p>
        <p className="text-sm text-gray-500">
          {format(new Date(match.date), "MMMM dd, yyyy - HH:mm")}
        </p>
        <p className="text-sm text-gray-400">{match.location}</p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        View Details
      </button>
    </div>
  );
}
