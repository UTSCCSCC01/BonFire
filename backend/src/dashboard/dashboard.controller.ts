import {
    Controller,
    Body,
    Post,
    HttpException,
    HttpStatus,
    Get,
    UseGuards,
  } from '@nestjs/common';
  
import { AuthGuard } from '@nestjs/passport';
import { User } from '.prisma/client';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Board } from '@prisma/client';
import { DashboardService } from './dashboard.service';
  
@Controller('User Dashboard')
@ApiTags('User Dashboard')
@UseGuards(AuthGuard())
@ApiBearerAuth() 
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}
}
