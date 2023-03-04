import LeaderboardId from '../value-objects/LeaderboardId';
import { LeaderboardStat } from '../value-objects/LeaderboardStat';
import LeaderboardStatId from '../value-objects/LeaderboardStatId';
import TitleId from '../value-objects/TitleId';
import Xuid from '../value-objects/Xuid';

interface LeaderboardProps {
  id: LeaderboardId;
  titleId: TitleId;
  player: Xuid;
  stats: { [statId: LeaderboardStatId['value']]: LeaderboardStat };
}

interface UpdateProps {
  stats: { [statId: LeaderboardStatId['value']]: LeaderboardStat };
}

export default class Leaderboard {
  private readonly props: LeaderboardProps;

  public constructor(props: LeaderboardProps) {
    this.props = props;
  }

  public static create(props: LeaderboardProps) {
    return new Leaderboard({
      ...props,
    });
  }

  public update(props: UpdateProps) {
    Object.entries(props.stats).forEach(([key, value]) => {
      this.props.stats[key] = value;
    });
  }

  get id() {
    return this.props.id;
  }

  get titleId() {
    return this.props.titleId;
  }

  get player() {
    return this.props.player;
  }

  get stats() {
    return this.props.stats;
  }
}