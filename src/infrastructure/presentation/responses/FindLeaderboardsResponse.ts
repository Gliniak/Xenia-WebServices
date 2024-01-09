interface LeaderboardResponse {
  id: number;
  players: {
    xuid: string;
    gamertag: string;
    stats: {
      id: number;
      type: number;
      value: number;
    }[];
  }[];
}

export type FindLeaderboardsResponse = LeaderboardResponse[];
