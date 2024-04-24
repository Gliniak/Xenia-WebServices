import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import ISessionRepository, {
  ISessionRepositorySymbol,
} from 'src/domain/repositories/ISessionRepository';
import { AddSessionPropertyCommand } from '../commands/AddSessionPropertyCommand';
import { property } from 'tiny-types';

@CommandHandler(AddSessionPropertyCommand)
export class AddSessionPropertyCommandHandler
  implements ICommandHandler<AddSessionPropertyCommand>
{
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
  ) {}

  async execute(command: AddSessionPropertyCommand) {
    const session = await this.repository.findSession(
      command.titleId,
      command.sessionId,
    );

    if (!session) {
      return undefined;
    }

    session.addProperty({ property: command.properties });
    await this.repository.save(session);

    return session;
  }
}
