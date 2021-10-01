import { Board } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClientValidationError } from '@prisma/client/runtime';
import { AuthService } from 'src/auth/auth.service';
import { BoardService } from 'src/board/board.service';


@Injectable()
export class DashboardService {}

