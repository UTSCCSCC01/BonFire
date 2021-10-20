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
    const classroomResult = this.classroomService.existsClass(token);
    if (!classroomResult) {
      throw new HttpException('Invalid classroom token', HttpStatus.NOT_FOUND);
    }
    return classroomResult;
  }

}
