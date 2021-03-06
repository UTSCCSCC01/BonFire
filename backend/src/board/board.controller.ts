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
  Query,
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
import { CardDto } from 'src/constants/card';
import { StateDto } from 'src/constants/state';
import { UserAnalyticsDto } from 'src/constants/user';
import { StateService } from 'src/state/state.service';
import { UserService } from 'src/user/user.service';
import { BoardService } from './board.service';

@Controller('boards')
@ApiTags('boards')
@UseGuards(AuthGuard())
@ApiBearerAuth()
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly stateService: StateService,
    private readonly userService: UserService,
  ) {}

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
    const boardItem: Board = await this.boardService.create(user, board);
    await this.stateService.create(
      { board_id: boardItem.id, title: 'To Do' },
      'TODO',
    );
    await this.stateService.create(
      { board_id: boardItem.id, title: 'Done' },
      'DONE',
    );

    return boardItem;
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
    const boardResult = await this.boardService.update({
      where: { id: +id },
      data: board,
    });
    return boardResult;
  }

  @Put(':id/reorder-states')
  @ApiOperation({ summary: 'Reorder a boards states' })
  @ApiOkResponse({
    description: 'Board details',
    type: BoardDetailsDto,
  })
  public async reorderStates(
    @RequestUser() user: User,
    @Param('id') id: number,
    @Body()
    body: {
      oldIndex: number;
      newIndex: number;
    },
  ) {
    return await this.boardService.reorderStates(
      user,
      +id,
      body.oldIndex,
      body.newIndex,
    );
  }

  @Put(':id/reorder-cards')
  @ApiOperation({ summary: 'Reorder a boards card' })
  @ApiOkResponse({
    description: 'Card details',
    type: CardDto,
  })
  public async reorderCards(
    @RequestUser() user: User,
    @Param('id') board_id: number,
    @Body()
    body: {
      card_id: number;
      state_id: number;
      order: number;
    },
  ) {
    return await this.boardService.reorganizeCards(
      body.card_id,
      body.state_id,
      body.order,
    );
  }

  @Get(':id/states')
  @ApiOperation({ summary: 'Returns all states tied to a specific board' })
  @ApiOkResponse({
    description: 'List of States',
  })
  public async getStates(
    @RequestUser() user: User,
    @Param('id') boardId: number,
    @Query('include') include: string,
  ): Promise<StateDto[]> {
    const orderIndices = {
      cards: {
        where: {
          deleted: false,
        },
        include: {
          tags: true,
          assignment: {
            include: {
              classroom: true,
            },
          },
        },
        orderBy: {
          order: 'asc',
        },
      },
      board: true,
    };

    let includes = include.split(',').reduce((acc, field) => {
      if (orderIndices.hasOwnProperty(field)) acc[field] = orderIndices[field];
      return acc;
    }, {});

    if (Object.keys(includes).length == 0) includes = null;

    const statesResult = await this.boardService.findStates(
      user,
      +boardId,
      includes,
    );
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
  ): Promise<BoardDto> {
    return this.boardService.delete(user, +boardId);
  }

  @Get('/:id/analytics')
  @ApiOperation({ summary: 'Returns user analytics for specific board' })
  @ApiOkResponse({
    description: 'Returns user analytics for a board',
  })
  public async getBoardAnalytics(
    @RequestUser() user: User,
    @Param('id') boardId: number,
  ): Promise<UserAnalyticsDto> {
    return await this.userService.getAnalytics(user, +boardId);
  }
}
