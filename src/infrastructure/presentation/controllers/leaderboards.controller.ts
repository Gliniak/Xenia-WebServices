import { Controller, Inject, Post, Body } from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import Xuid from 'src/domain/value-objects/Xuid';
import { FindLeaderboardsRequest } from '../requests/FindLeaderboardsRequest';
import { FindLeaderboardsResponse } from '../responses/FindLeaderboardsResponse';
import { FindLeaderboardsQuery } from 'src/application/queries/FindLeaderboardsQuery';
import TitleId from 'src/domain/value-objects/TitleId';
import LeaderboardId from 'src/domain/value-objects/LeaderboardId';
import LeaderboardStatId from 'src/domain/value-objects/LeaderboardStatId';

@ApiTags('Leaderboard')
@Controller('/leaderboards')
@Controller()
export class LeaderboardsController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post('/find')
  async findPlayer(
    @Body() request: FindLeaderboardsRequest,
  ): Promise<FindLeaderboardsResponse> {
    console.log(JSON.stringify(request));
    return await this.queryBus.execute(
      new FindLeaderboardsQuery(
        request.players.map((player) => new Xuid(player)),
        new TitleId(request.titleId),
        request.queries.map((leaderboard) => ({
          id: new LeaderboardId(leaderboard.id),
          statisticIds: leaderboard.statisticIds.map(
            (statistic) => new LeaderboardStatId(statistic),
          ),
        })),
      ),
    );
  }
}
