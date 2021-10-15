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
import { ClassroomService } from './classroom.service';

@Controller('classroom')
@ApiTags('classroom')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @ApiOperation({ summary: 'Creates and returns a new classroom given title' })
  @ApiResponse({
    description: 'New Classroom',
    status: 201,
  })
  public async create(
    @RequestUser() user: User,
    @Body() classroom: Classroom,
  ): Promise<Classroom> {
    return this.classroomService.create(user, classroom);
  }

  @Get()
  @ApiOperation({ summary: 'Returns classroom if classroom w/ token exists' })
  @ApiOkResponse({
    description: 'Classroom',
  })
  public async classroomExists(@Body() token: string): Promise<Classroom> {
    return await this.classroomService.existsClass(token);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Adds a student to a specific classroom' })
  @ApiOkResponse({
    description: 'Added a student to classroom',
  })
  public async addStudent(
    @RequestUser() user: User,
    @Param('id') classId: number,
  ): Promise<Classroom> {
    return await this.classroomService.addStudent(user, +classId);
  }
}
