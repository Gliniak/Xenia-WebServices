import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import ISessionRepository, {
  ISessionRepositorySymbol,
} from 'src/domain/repositories/ISessionRepository';
import { GetSessionQuery } from '../queries/GetSessionQuery';

@QueryHandler(GetSessionQuery)
export class GetSessionsQueryHandler implements IQueryHandler<GetSessionQuery> {
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
  ) {}

  async execute(query: GetSessionQuery) {
    return this.repository.findSession(query.title, query.session);
  }
}
