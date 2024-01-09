import IpAddress from 'src/domain/value-objects/IpAddress';

export class FindPlayerQuery {
  constructor(public readonly hostAddress: IpAddress) {}
}
