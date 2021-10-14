import { ApiProperty } from '@nestjs/swagger';

export class ClassroomDto {
  @ApiProperty()
  readonly title: string;
}
