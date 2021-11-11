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

export class CardTags {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly tags: Tag[];
}
export class Tag {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly label: string;

  @ApiProperty()
  readonly card_id: number;

  @ApiProperty()
  readonly created_at: Date;

  @ApiProperty()
  readonly updated_at: Date;
}

export class CreateCardDto {
  @ApiProperty()
  readonly state_id: number;

  @ApiProperty()
  readonly assignment_id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly desc?: string;

  @ApiProperty()
  readonly due_date?: Date;
}
