import { ApiProperty } from '@nestjs/swagger';

export class TagDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;

  @ApiProperty()
  readonly created_at: Date;

  @ApiProperty()
  readonly updated_at: Date;
}

export class CreateTagDto {
  @ApiProperty()
  readonly card_id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly color: string;
}
