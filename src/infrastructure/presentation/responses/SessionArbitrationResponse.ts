export interface SessionArbitrationResponse {
  totalPlayers: number;
  machines: {
    id: string;
    players: {
      xuid: string;
    }[];
  }[];
}
