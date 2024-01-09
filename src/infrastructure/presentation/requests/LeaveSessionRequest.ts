import { ApiProperty } from '@nestjs/swagger';

export class LeaveSessionRequest {
  @ApiProperty()
  xuids: string[];
}
