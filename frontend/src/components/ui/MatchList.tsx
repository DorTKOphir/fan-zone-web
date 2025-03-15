import { useState } from "react";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { format, isSameDay, parseISO } from "date-fns";
import { Match } from "@/types/types";
import { fetchMatches } from "@/apiCalls/FootballData";
import MatchListItem from "./MatchListItem";

const matches: Match[] = fetchMatches();

export default function MatchList() {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const filteredMatches = selectedDate
    ? matches.filter((match) =>
        isSameDay(parseISO(match.date), new Date(selectedDate))
      )
    : matches;

  const sortedMatches = [...filteredMatches].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-4 h-[80vh] flex flex-col">
      <div className="flex justify-center mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {selectedDate && (
          <button
            onClick={() => setSelectedDate("")}
            className="ml-4 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Clear
          </button>
        )}
      </div>

      <ScrollArea className="flex-1 rounded-lg border border-gray-200 shadow-inner p-4 bg-white">
        {sortedMatches.length > 0 ? (
          <div className="space-y-4">
            {sortedMatches.map((match) => (
              <MatchListItem match={match} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20">
            No matches found for{" "}
            {format(new Date(selectedDate), "MMMM dd, yyyy")}.
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
