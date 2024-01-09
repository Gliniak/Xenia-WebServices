import { ApiProperty } from '@nestjs/swagger';

export class MigrateSessionRequest {
  @ApiProperty()
  hostAddress: string;
  @ApiProperty()
  macAddress: string;
  @ApiProperty()
  port: number;
}
