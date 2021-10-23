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
import { Classroom, User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { UserDto } from 'src/constants/user';
import { UserService } from './user.service';
import { ClassroomDto } from 'src/constants/classroom';

@Controller('user')
@ApiTags('user')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('/classroom')
  @ApiOperation({ summary: 'Adds a student to a specific classroom' })
  @ApiOkResponse({
    description: 'Added a student to classroom',
  })
  public async joinClassroom(
    @RequestUser() user: User,
    @Body() classroom: Classroom,
  ): Promise<ClassroomDto> {
    return await this.userService.joinClassroom(user, classroom.token);
  }
}
