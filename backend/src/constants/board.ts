import { ApiProperty } from '@nestjs/swagger';

export class BoardDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly created_at: Date;

  @ApiProperty()
  readonly updated_at: Date;
}

export class BoardDetailsDto {
  readonly id: number;

  @ApiProperty()
  readonly title: string;

  readonly created_at: Date;

  readonly updated_at: Date;
}
