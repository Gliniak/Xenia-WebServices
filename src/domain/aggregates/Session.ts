import IpAddress from '../value-objects/IpAddress';
import MacAddress from '../value-objects/MacAddress';
import SessionFlags from '../value-objects/SessionFlags';
import SessionId from '../value-objects/SessionId';
import TitleId from '../value-objects/TitleId';
import Xuid from '../value-objects/Xuid';

interface SessionProps {
  id: SessionId;
  titleId: TitleId;
  title: string;
  mediaId: string;
  version: string;
  flags: SessionFlags;
  hostAddress: IpAddress;
  macAddress: MacAddress;
  publicSlotsCount: number;
  privateSlotsCount: number;
  port: number;
  players: Xuid[];
  deleted: boolean;
  context: Map<string, number>;
  properties: Map<string, number>;
  migration?: SessionId;
}

interface CreateProps {
  id: SessionId;
  titleId: TitleId;
  title: string;
  mediaId: string;
  version: string;
  flags: SessionFlags;
  hostAddress: IpAddress;
  macAddress: MacAddress;
  publicSlotsCount: number;
  privateSlotsCount: number;
  port: number;
}

interface ModifyProps {
  flags: SessionFlags;
  publicSlotsCount: number;
  privateSlotsCount: number;
}

interface CreateMigrationProps {
  session: Session;
  hostAddress: IpAddress;
  macAddress: MacAddress;
  port: number;
}

interface ContextProps {
  context: Map<number, { contextId: number; value: number }>;
}
interface PropertyProps {
  property: Map<number, { propertyId: number; value: number }>;
}
interface JoinProps {
  xuids: Xuid[];
}

interface LeaveProps {
  xuids: Xuid[];
}

export default class Session {
  private readonly props: SessionProps;

  public constructor(props: SessionProps) {
    this.props = props;
  }

  public static create(props: CreateProps) {
    return new Session({
      ...props,
      players: [],
      deleted: false,
      context: new Map<string, number>(),
      properties: new Map<string, number>(),
    });
  }

  static GenerateSessionId() {
    const rnd_value = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

    const session_id_value =
      (BigInt(0xae) << BigInt(56)) |
      (BigInt(rnd_value) & BigInt(0x0000ffffffffffff));

    const id_hex_string = session_id_value.toString(16);
    const session_id = id_hex_string.padEnd(16, '0');

    return session_id;
  }

  public static createMigration(props: CreateMigrationProps) {
    const newSession = new Session({
      ...props.session.props,
      id: new SessionId(this.GenerateSessionId()),
      hostAddress: props.hostAddress,
      macAddress: props.macAddress,
      port: props.port,
      deleted: false,
    });

    props.session.props.migration = newSession.id;

    return newSession;
  }

  public addContext(props: ContextProps) {
    props.context.forEach((entry) => {
      this.props.context.set(entry.contextId.toString(16), entry.value);
    });
  }

  public addProperty(props: PropertyProps) {
    props.property.forEach((entry) => {
      this.props.properties.set(entry.propertyId.toString(16), entry.value);
    });
  }

  public modify(props: ModifyProps) {
    this.props.flags = props.flags;
    this.props.privateSlotsCount = props.privateSlotsCount;
    this.props.publicSlotsCount = props.publicSlotsCount;
  }

  public join(props: JoinProps) {
    this.props.players.push(...props.xuids);

    const xuidValues = this.props.players.map((xuid) => xuid.value);
    const distinctXuidValues = [...new Set(xuidValues)];
    this.props.players = distinctXuidValues.map((xuid) => new Xuid(xuid));
  }

  public leave(props: LeaveProps) {
    const xuidValues = props.xuids.map((xuid) => xuid.value);
    this.props.players = this.props.players.filter(
      (player) => !xuidValues.includes(player.value),
    );
  }

  public delete() {
    this.props.deleted = true;
  }

  get id() {
    return this.props.id;
  }

  get titleId() {
    return this.props.titleId;
  }

  get title() {
    return this.props.title;
  }

  get mediaId() {
    return this.props.mediaId;
  }

  get version() {
    return this.props.version;
  }

  get hostAddress() {
    return this.props.hostAddress;
  }

  get flags() {
    return this.props.flags;
  }

  get publicSlotsCount() {
    return this.props.publicSlotsCount;
  }

  get privateSlotsCount() {
    return this.props.privateSlotsCount;
  }

  get openPublicSlots() {
    return this.publicSlotsCount - this.players.length;
  }

  get openPrivateSlots() {
    // TODO: Implement
    return this.privateSlotsCount;
  }

  get filledPublicSlots() {
    return this.publicSlotsCount - this.openPublicSlots;
  }

  get filledPrivateSlots() {
    return this.privateSlotsCount - this.openPrivateSlots;
  }

  get macAddress() {
    return this.props.macAddress;
  }

  get port() {
    return this.props.port;
  }

  get players() {
    return this.props.players;
  }

  get deleted() {
    return this.props.deleted;
  }

  get migration() {
    return this.props.migration;
  }

  get context() {
    return this.props.context;
  }

  get properties() {
    return this.props.properties;
  }
}
