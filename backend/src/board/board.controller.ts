import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Board, User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { BoardService } from './board.service';

@Controller('board')
@ApiTags('board')
@UseGuards(AuthGuard())
@ApiBearerAuth() 
export class BoardController {
    constructor(private readonly boardService: BoardService) {}

    @Post()
    @ApiOperation({ summary: 'Creates and returns a new board' })
    @ApiParam({ name: 'title' })
    public async createBoard(@RequestUser() user: User, @Body() board: Board): Promise<Board>{
        return this.boardService.create(user, board);
    }

}
