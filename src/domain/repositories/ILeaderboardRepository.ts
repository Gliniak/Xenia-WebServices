import Leaderboard from '../aggregates/Leaderboard';
import LeaderboardId from '../value-objects/LeaderboardId';
import TitleId from '../value-objects/TitleId';
import Xuid from '../value-objects/Xuid';

export default interface ILeaderboardRepository {
  findLeaderboard: (
    titleId: TitleId,
    id: LeaderboardId,
    player: Xuid,
  ) => Promise<Leaderboard | undefined>;
  save: (leaderboard: Leaderboard) => Promise<void>;
}

export const ILeaderboardRepositorySymbol = Symbol('ILeaderboardRepository');
