import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  readonly password: string;
}

export class UserIdDto {
  @ApiProperty()
  readonly id: number;
}

export class UserRequestDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  readonly password: string;
}

export class CreateUserDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name: string;

  @ApiProperty()
  readonly password: string;
}

export class UserAnalyticsDto {
  @ApiProperty()
  readonly user_id: number;

  @ApiProperty()
  readonly inProgressCount: number;
  
  @ApiProperty()
  readonly inProgressPercentage: number;
  
  @ApiProperty()
  readonly doneCount: number;
  
  @ApiProperty()
  readonly donePercentage: number;
  
  @ApiProperty()
  readonly todoCount: number;
  
  @ApiProperty()
  readonly todoPercentage: number;

  @ApiProperty()
  readonly totalCount: number;

}
