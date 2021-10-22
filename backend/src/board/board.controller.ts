import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
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
import { Board, User } from '@prisma/client';
import { RequestUser } from 'src/constants/auth';
import { BoardDetailsDto, BoardDto } from 'src/constants/board';
import { StateDto } from 'src/constants/state';
import { BoardService } from './board.service';

@Controller('boards')
@ApiTags('boards')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

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
    const boardResult = await this.boardService.find(user, +boardId);
    if (!boardResult) {
      throw new HttpException('Invalid board id', HttpStatus.UNAUTHORIZED);
    }
    return boardResult;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a board by specific ID' })
  @ApiOkResponse({
    description: 'Board details',
    type: BoardDetailsDto,
  })
  public async update(
    @RequestUser() user: User,
    @Param('id') id: number,
    @Body() board: Board,
  ): Promise<BoardDto> {
    const canAccess = await this.boardService.find(user, +id);
    if (!canAccess) {
      throw new HttpException('Invalid board id', HttpStatus.UNAUTHORIZED);
    }
    const boardResult = await this.boardService.update({ where: {id: +id}, data: board});
    return boardResult;
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
    const statesResult = await this.boardService.findStates(user, +boardId);
    if (!statesResult) {
      throw new HttpException('Invalid board id', HttpStatus.UNAUTHORIZED);
    }
    return statesResult;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deletes a specific board' })
  @ApiResponse({
    description: 'Deleted Board',
    status: 201,
  })
  public async deleteBoard(
    @RequestUser() user: User,
    @Param('id') boardId: number,
  ): Promise<Board> {
    return this.boardService.delete(user, +boardId);
  }

}
