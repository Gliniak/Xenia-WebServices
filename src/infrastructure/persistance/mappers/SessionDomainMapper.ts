import { Session as SessionModel } from '../models/SessionSchema';
import Session from '../../../domain/aggregates/Session';
import { ConsoleLogger, Injectable } from '@nestjs/common';
import TitleId from 'src/domain/value-objects/TitleId';
import IpAddress from 'src/domain/value-objects/IpAddress';
import SessionFlags from 'src/domain/value-objects/SessionFlags';
import Xuid from 'src/domain/value-objects/Xuid';
import MacAddress from 'src/domain/value-objects/MacAddress';
import SessionId from 'src/domain/value-objects/SessionId';

@Injectable()
export default class SessionDomainMapper {
  constructor(private readonly logger: ConsoleLogger) {}

  public mapToDomainModel(session: SessionModel): Session {
    return new Session({
      id: new SessionId(session.id),
      title: session.title,
      titleId: new TitleId(session.titleId),
      mediaId: session.mediaId,
      version: session.version,
      flags: new SessionFlags(session.flags),
      hostAddress: new IpAddress(session.hostAddress),
      macAddress: new MacAddress(session.macAddress),
      publicSlotsCount: session.publicSlotsCount,
      privateSlotsCount: session.privateSlotsCount,
      port: session.port,
      players: session.players.map((xuid) => new Xuid(xuid)),
      deleted: session.deleted,
      context: session.context,
      properties: session.properties,
      migration: session.migration
        ? new SessionId(session.migration)
        : undefined,
    });
  }
}
