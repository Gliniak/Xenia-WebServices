import { Injectable } from '@nestjs/common';
import Session from '../../../domain/aggregates/Session';
import { Session as SessionModel } from '../models/SessionSchema';

@Injectable()
export default class SessionPersistanceMapper {
  public mapToDataModel(session: Session, updatedAt: Date): SessionModel {
    return {
      id: session.id.value,
      title: session.title,
      titleId: session.titleId.toString(),
      mediaId: session.mediaId,
      version: session.version,
      hostAddress: session.hostAddress.value,
      flags: session.flags.value,
      publicSlotsCount: session.publicSlotsCount,
      privateSlotsCount: session.privateSlotsCount,
      advertised: session.flags.isAdvertised,
      macAddress: session.macAddress.value,
      port: session.port,
      players: session.players.map((xuid) => xuid.value),
      deleted: session.deleted,
      context: session.context,
      properties: session.properties,
      migration: session.migration ? session.migration.value : undefined,
      updatedAt,
    };
  }
}
