import Xuid from 'src/domain/value-objects/Xuid';

export class FindPlayerSessionQuery {
  constructor(public readonly xuid: Xuid) {}
}
