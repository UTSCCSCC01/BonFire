import { ApiProperty } from '@nestjs/swagger';

export class CreateClassroomDto {
  @ApiProperty()
  readonly title: string;
}

export class ClassroomDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly token: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly created_at: Date;

  @ApiProperty()
  readonly updated_at: Date;

  @ApiProperty()
  readonly creator_id: number;
}
