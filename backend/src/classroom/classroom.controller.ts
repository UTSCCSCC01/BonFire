import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { ClassroomDto } from 'src/constants/classroom';
import { ClassroomService } from './classroom.service';

@Controller('classroom')
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @ApiOperation({ summary: 'Creates and returns a new classroom' })
  @ApiParam({ name: 'title' })
  @ApiResponse({
    description: 'New Classroom',
    status: 201,
  })
  public async createBoard(
    @RequestUser() user: User,
    @Body() classroom: ClassroomDto,
  ): Promise<Classroom> {
    return this.classroomService.create(user, classroom);
  }
}
