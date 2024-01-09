import { ApiProperty } from '@nestjs/swagger';

export class FindPlayerRequest {
  @ApiProperty()
  hostAddress: string;
}
