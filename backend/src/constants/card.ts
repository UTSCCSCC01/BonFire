import { ApiProperty } from '@nestjs/swagger';

export class CardDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly desc?: string;

  @ApiProperty()
  readonly submit_url?: string;

  @ApiProperty()
  readonly order: number;

  @ApiProperty()
  readonly due_date?: Date;

  @ApiProperty()
  readonly created_at: Date;

  @ApiProperty()
  readonly updated_at: Date;
}

export class CreateCardDto {
  @ApiProperty()
  readonly state_id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly desc?: string;

  @ApiProperty()
  readonly due_date?: Date;
}
