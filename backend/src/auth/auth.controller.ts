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
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiOkResponse({ description: 'User details' })
  @ApiParam({ name: 'last_name' })
  @ApiParam({ name: 'fist_name' })
  @ApiParam({ name: 'password' })
  @ApiParam({ name: 'email' })
  public async register(@Body() userData: User): Promise<LoginResult> {
    const result = await this.authService.register({ ...userData });

    if (!result.success)
      throw new HttpException(result, HttpStatus.BAD_REQUEST);

    return this.authService.login(userData);
  }

  @Post('login')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign a user token' })
  public async login(@Body() loginUserData: LoginInfo): Promise<LoginResult> {
    return this.authService.login(loginUserData);
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the request user' })
  @ApiOkResponse({ description: 'Returns the request user' })
  @UseGuards(AuthGuard())
  public async getUser(@RequestUser() user: User): Promise<User> {
    return user;
  }
}
