import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Classroom, User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { UserService } from './user.service';
import { ClassroomDto } from 'src/constants/classroom';
import { CardDto } from 'src/constants/card';

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

  @Post('/classroom/state')
  @ApiOperation({ summary: 'Adds a student to a specific classroom' })
  @ApiOkResponse({
    description: 'Added a student to classroom',
  })
  public async setClassroomState(
    @RequestUser() user: User,
    @Body() body: { state_id: number, classroom_id: number},
  ): Promise<CardDto[]> {
    return await this.userService.setClassroomState(user, body.classroom_id, body.state_id);
  }
}
