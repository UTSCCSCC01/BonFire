import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDto } from './user';

export type RegistrationStatus = {
  success: boolean;
  message: string;
};

export class LoginInfoDto {
  @ApiProperty()
  readonly password: string;
  @ApiProperty()
  readonly email: string;
}

export class TokenDto {
  @ApiProperty()
  expiresIn: string;

  @ApiProperty()
  accessToken: string;
}

export class LoginResultDto extends UserDto {
  @ApiProperty()
  token: TokenDto;
}

export const RequestUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    delete request.user.password;
    return request.user;
  },
);
