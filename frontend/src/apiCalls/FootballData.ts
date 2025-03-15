import { Match } from "@/types/types";
import axios, { AxiosResponse } from "axios";

const url = "https://api.football-data.org/v4/competitions/PL/matches";

const headers = {
  "X-Auth-Token": "81219d8b375e4fb9bd2bdcdb5665db12",
};

const params = {
  hours: "hourly", // Query param
};

interface MatchResponse {
  matches: Match[];
}

export const fetchMatches = async (): Promise<Match[]> => {
  try {
    debugger;
    const response: AxiosResponse<any> = await axios.get(url, {
      headers,
      params,
    });
    return response.data.matches;
  } catch (error) {
    console.error("Error fetching matches:", error);
  }
};
