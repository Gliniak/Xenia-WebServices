import Xuid from 'src/domain/value-objects/Xuid';

export class GetPlayerQuery {
  constructor(public readonly xuid: Xuid) {}
}
