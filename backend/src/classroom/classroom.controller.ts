import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import { ClassroomDto } from '../constants/classroom';

@Controller('classrooms')
@ApiTags('classrooms')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @ApiOperation({ summary: 'Creates and returns a new classroom, given ' })
  @ApiResponse({
    description: 'Returns new Classroom with a token',
    status: 201,
  })
  public async create(
    @RequestUser() user: User,
    @Body() classroom: Classroom,
  ): Promise<Classroom> {
    return this.classroomService.create(user, classroom);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a classroom by specific ID' })
  @ApiOkResponse({
    description: 'Classroom details',
    type: ClassroomDto,
  })
  public async getClassroom(
    @Param('id') boardId: number,
  ): Promise<ClassroomDto> {
    const boardResult = await this.classroomService.find(+boardId);
    if (!boardResult) {
      throw new HttpException('Invalid board id', HttpStatus.UNAUTHORIZED);
    }
    return boardResult;
  }

}
