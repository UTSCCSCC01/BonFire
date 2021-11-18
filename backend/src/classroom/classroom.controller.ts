import {
  Body,
  Controller,
  Delete,
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
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Classroom, User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { ClassroomService } from './classroom.service';
import { ClassroomDto } from '../constants/classroom';
import { AssignmentDto } from 'src/constants/assignment';
import { UserDto } from 'src/constants/user';

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
  ): Promise<ClassroomDto> {
    return this.classroomService.create(user, classroom);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a classroom by specific ID' })
  @ApiOkResponse({
    description: 'Classroom details',
    type: ClassroomDto,
  })
  public async getClassroom(
    @Param('id') classId: number,
  ): Promise<ClassroomDto> {
    const classResult = await this.classroomService.find(+classId);
    if (!classResult) {
      throw new HttpException('Invalid class id', HttpStatus.UNAUTHORIZED);
    }
    return classResult;
  }

  @Get()
  @ApiOperation({ summary: 'Returns all classrooms tied to a specific user' })
  @ApiOkResponse({
    description: 'List of Classrooms',
  })
  public async getClassrooms(@RequestUser() user): Promise<ClassroomDto[]> {
    return this.classroomService.findAll(user);
  }

  @Put(':id/leave')
  @ApiOperation({ summary: 'Removes a user from classroom' })
  public async removeStudent(
    @RequestUser() user,
    @Param('id') classId: number,
  ): Promise<User> {
    return this.classroomService.removeUser(user, +classId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a classroom by specific ID' })
  @ApiOkResponse({
    description: 'Classroom deleted',
  })
  public async deleteClassroom(
    @RequestUser() user,
    @Param('id') id: number,
  ): Promise<ClassroomDto> {
    return this.classroomService.delete(user, +id);
  }

  @Get(':id/assignments')
  @ApiOperation({ summary: 'Get all assignments to classroom' })
  @ApiOkResponse({
    description: 'Assignments returned',
  })
  public async getAssignments(
    @RequestUser() user,
    @Param('id') id: number,
  ): Promise<AssignmentDto[]> {
    return this.classroomService.getAssignments(user, +id);
  }

  @Put(':id/regenerate-token')
  @ApiOperation({ summary: 'Regenerate token by specific classroom ID' })
  @ApiOkResponse({
    description: 'Classroom updated with new token',
  })
  public async regenerateToken(
    @RequestUser() user,
    @Param('id') id: number,
  ): Promise<ClassroomDto> {
    return this.classroomService.regenerateToken(user, +id);
  }

  @Get(':id/students')
  @ApiOperation({ summary: 'Returns all students in a classroom' })
  @ApiOkResponse({
    description: 'List of Students',
  })
  public async getStudents(
    @RequestUser() user,
    @Param('id') id: number,
  ): Promise<UserDto[]> {
    return this.classroomService.getStudents(user, +id);
  }

  @Delete(':id/students/:sid')
  @ApiOperation({ summary: 'Removes a student from a classroom' })
  public async removeStudentFromClassroom(
    @RequestUser() user: User,
    @Param('id') id: number,
    @Param('sid') studentId: number,
  ): Promise<ClassroomDto> {
    return this.classroomService.kickStudent(user, +id, +studentId);
  }

  @Delete(':id/token')
  @ApiOperation({ summary: 'Delete token by specific classroom ID' })
  @ApiOkResponse({
    description: 'Classroom deletes token',
  })
  public async deleteToken(
    @RequestUser() user,
    @Param('id') id: number,
  ): Promise<ClassroomDto> {
    return this.classroomService.deleteToken(user, +id);
  }
}
