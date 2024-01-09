import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import IPlayerRepository, {
  IPlayerRepositorySymbol,
} from 'src/domain/repositories/IPlayerRepository';
import { GetPlayerQuery } from '../queries/GetPlayerQuery';

@QueryHandler(GetPlayerQuery)
export class GetPlayerQueryHandler implements IQueryHandler<GetPlayerQuery> {
  constructor(
    @Inject(IPlayerRepositorySymbol)
    private repository: IPlayerRepository,
  ) {}

  async execute(query: GetPlayerQuery) {
    return this.repository.findByXuid(query.xuid);
  }
}
