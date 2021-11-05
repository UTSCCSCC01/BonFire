import { User, Assignment } from '.prisma/client';
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
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  AssignmentDetailsDto,
  AssignmentDto,
  CreateAssignmentDto,
} from 'src/constants/assignment';
import { RequestUser } from 'src/constants/auth';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
@ApiTags('assignments')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Post()
  @ApiOperation({ summary: 'Add an assignment to classroom' })
  @ApiOkResponse({
    description: 'Assignment was added',
  })
  public async addAssignment(
    @RequestUser() user,
    @Body() assignment: CreateAssignmentDto,
  ): Promise<AssignmentDto> {
    return this.assignmentService.create(user, assignment);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a assignment by specific ID' })
  @ApiOkResponse({
    description: 'assignment details',
    type: AssignmentDto,
  })
  public async getAssignment(@Param('id') id: number): Promise<AssignmentDto> {
    const assignment = await this.assignmentService.find(+id);
    if (!assignment) {
      throw new HttpException('Invalid assignment id', HttpStatus.UNAUTHORIZED);
    }
    return assignment;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a assignment by specific ID' })
  @ApiOkResponse({
    description: 'assignment deleted',
  })
  public async deleteAssignment(
    @RequestUser() user,
    @Param('id') id: number,
  ): Promise<AssignmentDto> {
    return this.assignmentService.delete(user, +id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a assignment by specific ID' })
  @ApiOkResponse({
    description: 'Assignment details',
    type: AssignmentDetailsDto,
  })
  public async update(
    @RequestUser() user: User,
    @Param('id') id: number,
    @Body() assignment: Assignment,
  ): Promise<AssignmentDto> {
    const canAccess = await this.assignmentService.find(+id);
    if (!canAccess) {
      throw new HttpException('Invalid assignment id', HttpStatus.UNAUTHORIZED);
    }
    const boardResult = await this.assignmentService.update({
      where: { id: +id },
      data: assignment,
    });
    return boardResult;
  }
}
