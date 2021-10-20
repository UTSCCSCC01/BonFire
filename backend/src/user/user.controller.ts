import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { UserDto } from 'src/constants/user';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('user')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}
}
