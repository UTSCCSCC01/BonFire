import { ApiProperty } from '@nestjs/swagger';

export class CreateStateDto {
  @ApiProperty()
  readonly board_id: number;

  @ApiProperty()
  readonly title: string;
}

export class StateDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly order: number;

  @ApiProperty()
  readonly created_at: Date;

  @ApiProperty()
  readonly updated_at: Date;
}
