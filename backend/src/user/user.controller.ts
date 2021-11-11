import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
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
import { UserAnalyticsDto } from 'src/constants/user';

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

  @Get('/analytics')
  @ApiOperation({ summary: 'Returns user analytics' })
  @ApiOkResponse({
    description: 'Returns user analytics',
  })
  public async getAnalytics(
    @RequestUser() user: User,
  ): Promise<UserAnalyticsDto> {
    return await this.userService.getAnalytics(user);
  }

  @Get('/analytics/board/:id')
  @ApiOperation({ summary: 'Returns user analytics for specific board' })
  @ApiOkResponse({
    description: 'Returns user analytics for a board',
  })
  public async getBoardAnalytics(
    @RequestUser() user: User,
    @Param('id') boardId: number,
  ): Promise<UserAnalyticsDto> {
    return await this.userService.getBoardAnalytics(user, +boardId);
  }
}
