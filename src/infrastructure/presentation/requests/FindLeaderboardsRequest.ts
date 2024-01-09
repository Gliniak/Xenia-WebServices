import { ApiProperty } from '@nestjs/swagger';

class FindLeaderboardRequestLeaderboardQuery {
  @ApiProperty()
  id: string;
  @ApiProperty()
  statisticIds: string[];
}

export class FindLeaderboardsRequest {
  @ApiProperty()
  players: string[];
  @ApiProperty()
  titleId: string;
  @ApiProperty()
  queries: FindLeaderboardRequestLeaderboardQuery[];
}
