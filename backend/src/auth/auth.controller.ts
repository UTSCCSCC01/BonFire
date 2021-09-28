import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';

import {
  AuthService,
  LoginInfo,
  LoginResult,
  RegistrationStatus,
  RequestUser,
} from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '.prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() userData: User): Promise<RegistrationStatus> {
    console.log(userData);
    const result: RegistrationStatus = await this.authService.register(
      userData,
    );

    if (!result.success) {
      throw new HttpException(result, HttpStatus.BAD_REQUEST);
    }

    return result;
  }

  @Post('login')
  public async login(@Body() loginUserData: LoginInfo): Promise<LoginResult> {
    return await this.authService.login(loginUserData);
  }

  @Get('whoami')
  @UseGuards(AuthGuard())
  public async testAuth(@RequestUser() user: User): Promise<User> {
    return await user;
  }
}
