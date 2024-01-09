import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import ISessionRepository, {
  ISessionRepositorySymbol,
} from 'src/domain/repositories/ISessionRepository';
import { JoinSessionCommand } from '../commands/JoinSessionCommand';

@CommandHandler(JoinSessionCommand)
export class JoinSessionCommandHandler
  implements ICommandHandler<JoinSessionCommand>
{
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
  ) {}

  async execute(command: JoinSessionCommand) {
    const session = await this.repository.findSession(
      command.titleId,
      command.sessionId,
    );

    session.join({
      xuids: command.xuids,
    });

    await this.repository.save(session);
  }
}
