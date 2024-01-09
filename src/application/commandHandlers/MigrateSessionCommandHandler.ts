import { Inject } from '@nestjs/common';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import Session from 'src/domain/aggregates/Session';
import ISessionRepository, {
  ISessionRepositorySymbol,
} from 'src/domain/repositories/ISessionRepository';
import { MigrateSessionCommand } from '../commands/MigrateSessionCommand';

@CommandHandler(MigrateSessionCommand)
export class MigrateSessionCommandHandler
  implements ICommandHandler<MigrateSessionCommand>
{
  constructor(
    @Inject(ISessionRepositorySymbol)
    private repository: ISessionRepository,
  ) {}

  async execute(command: MigrateSessionCommand) {
    console.log(command);
    const session = await this.repository.findSession(
      command.titleId,
      command.sessionId,
    );

    if (session.migration !== undefined) {
      return await this.repository.findSession(
        command.titleId,
        session.migration,
      );
    }

    const newSession = Session.createMigration({
      session,
      hostAddress: command.hostAddress,
      macAddress: command.macAddress,
      port: command.port,
    });

    await this.repository.save(newSession);
    await this.repository.save(session);

    return newSession;
  }
}
