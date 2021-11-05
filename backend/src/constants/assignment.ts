import { ApiProperty } from '@nestjs/swagger';

export class AssignmentDto {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  desc?: string;

  @ApiProperty()
  submit_url?: string;

  @ApiProperty()
  creator_id: number;

  @ApiProperty()
  classroom_id: number;

  @ApiProperty()
  due_date: Date;

  @ApiProperty()
  available_date?: Date;

  @ApiProperty()
  published_date?: Date;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;

  @ApiProperty()
  deleted?: boolean;
}

export class CreateAssignmentDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  desc?: string;

  @ApiProperty()
  submit_url?: string;

  @ApiProperty()
  creator_id: number;

  @ApiProperty()
  classroom_id: number;

  @ApiProperty()
  due_date: Date;

  @ApiProperty()
  available_date?: Date;

  @ApiProperty()
  published_date?: Date;
}

export class AssignmentDetailsDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  desc?: string;

  @ApiProperty()
  submit_url?: string;

  creator_id: number;

  classroom_id: number;

  @ApiProperty()
  due_date: Date;

  @ApiProperty()
  available_date?: Date;

  @ApiProperty()
  published_date?: Date;
}
