import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import ISessionRepository, {
  ISessionRepositorySymbol,
} from 'src/domain/repositories/ISessionRepository';
import { ModifySessionCommand } from '../commands/ModifySessionCommand';

@CommandHandler(ModifySessionCommand)
export class ModifySessionCommandHandler
  implements ICommandHandler<ModifySessionCommand>
{
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
  ) {}

  async execute(command: ModifySessionCommand) {
    console.log(command);
    const session = await this.repository.findSession(
      command.titleId,
      command.sessionId,
    );

    session.modify({
      flags: command.flags,
      privateSlotsCount: command.privateSlotsCount,
      publicSlotsCount: command.publicSlotsCount,
    });

    await this.repository.save(session);
  }
}
