import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
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
import { Board, User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { BoardDto } from 'src/constants/board';
import { StateDto } from 'src/constants/state';
import { BoardService } from './board.service';

@Controller('boards')
@ApiTags('boards')
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
  public async createBoard(
    @RequestUser() user: User,
    @Body() board: Board,
  ): Promise<Board> {
    return this.boardService.create(user, board);
  }

  @Get()
  @ApiOperation({ summary: 'Returns all boards tied to a specific user' })
  @ApiOkResponse({
    description: 'List of Boards',
  })
  public async getBoards(@RequestUser() user: User): Promise<BoardDto[]> {
    return this.boardService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Returns a board by specific ID' })
  @ApiOkResponse({
    description: 'Board details',
    type: BoardDto,
  })
  public async getBoard(
    @RequestUser() user: User,
    @Param('id') boardId: number,
  ): Promise<BoardDto> {
    return await this.boardService.find(user, +boardId);
  }

  @Get(':id/states')
  @ApiOperation({ summary: 'Returns all states tied to a specific board' })
  @ApiOkResponse({
    description: 'List of States',
  })
  public async getStates(
    @RequestUser() user: User,
    @Param('id') boardId: number,
  ): Promise<StateDto[]> {
    return await this.boardService.findStates(user, +boardId);
  }
}
