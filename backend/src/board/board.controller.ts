import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Board, User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { BoardDto } from 'src/constants/board';
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
    @ApiResponse({
        description: 'New Board',
        status: 201,
    })
    public async createBoard(@RequestUser() user: User, @Body() board: Board): Promise<Board>{
        return this.boardService.create(user, board);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Returns a board by specific ID' })
    @ApiOkResponse({
        description: 'Get board details including corresponding states and cards',
        type: BoardDto
    })
    public async getBoard(@Param('id') id: number): Promise<BoardDto> {
        const boardResult = await this.boardService.find(Number(id));
        if (!boardResult) {
            throw new HttpException("Invalid board id", HttpStatus.NOT_FOUND);
        }
        return this.boardService.getBoardDetails(boardResult);
    }
}
