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
import { UpcomingDueDatesDto, UserAnalyticsDto } from 'src/constants/user';

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
  @ApiOperation({ summary: 'Returns user aggregated analytics' })
  @ApiOkResponse({
    description: 'Returns user analytics',
  })
  public async getAnalytics(
    @RequestUser() user: User,
  ): Promise<UserAnalyticsDto> {
    return await this.userService.getAnalytics(user);
  }

  @Get('upcoming-due-dates')
  @ApiOperation({ summary: 'Returns upcoming due dates' })
  @ApiOkResponse({
    description: 'Returns upcoming due dates',
  })
  public async getUpcomingDueDates(
    @RequestUser() user: User,
  ): Promise<UpcomingDueDatesDto[]> {
    return await this.userService.getUpcomingDueDates(user);
  }
}
