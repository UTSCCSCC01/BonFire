import {
  Controller,
  Body,
  Post,
  HttpException,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '.prisma/client';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, UserDto } from 'src/constants/user';
import { LoginResultDto, LoginInfoDto, RequestUser } from 'src/constants/auth';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({
    description: 'User details',
    type: LoginResultDto,
    status: 201,
  })
  async register(@Body() userData: CreateUserDto): Promise<LoginResultDto> {
    const result = await this.authService.register({ ...(userData as User) });

    if (!result.success)
      throw new HttpException(result, HttpStatus.BAD_REQUEST);

    return this.authService.login(userData);
  }

  @Post('login')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sign a user token' })
  @ApiResponse({
    description: 'User details and token',
    type: LoginResultDto,
    status: 201,
  })
  async login(@Body() loginUserData: LoginInfoDto): Promise<LoginResultDto> {
    return this.authService.login(loginUserData);
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get the request user' })
  @ApiOkResponse({ description: 'Returns the request user', type: UserDto })
  @UseGuards(AuthGuard())
  getUser(@RequestUser() user: User): UserDto {
    return user;
  }
}
