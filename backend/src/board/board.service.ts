import { Board, Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { StateDto } from 'src/constants/state';
import { PrismaService } from 'src/prisma.service';
import { BoardDto } from '../constants/board';

@Injectable()
export class BoardService {
  constructor(private prisma: PrismaService) {}

  /** Create a new board
   * @param  {User} user
   * @param  {Board} boardData
   * @returns Promise
   */
  async create(user: User, boardData: Board): Promise<Board> {
    boardData.user_id = user.id;

    try {
      return this.prisma.board.create({ data: boardData });
    } catch (e) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }
  }

  /** Find a board by id
   * @param  {number} boardId
   * @returns Promise
   */
  async find(user: User, boardId: number): Promise<BoardDto> {
    const boardWhereInput: Prisma.BoardWhereInput = {
      user_id: user.id,
      id: boardId,
    };
    const board = await this.prisma.board.findFirst({
      where: boardWhereInput,
    });

    if (!board) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }

    return board;
  }

  /** Find all boards by user id
   * @param  {User} user
   * @returns Promise
   */
  async findAll(user: User): Promise<BoardDto[]> {
    const boardWhereInput: Prisma.BoardWhereInput = {
      user_id: user.id,
    };
    return this.prisma.board.findMany({
      where: boardWhereInput,
    });
  }

  /** Find all board states
   * @param  {number} boardId
   * @returns Promise
   */
  async findStates(user: User, boardId: number): Promise<StateDto[]> {
    // Find all states tied to a boardId with a specifc user
    const boardWhereInput: Prisma.BoardWhereInput = {
      user_id: user.id,
      id: boardId,
    };
    const board = await this.prisma.board.findFirst({
      where: boardWhereInput,
    });

    if (!board) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    }

    // Find all states tied to a boardId with a specifc user
    const stateWhereInput: Prisma.StateWhereInput = {
      board_id: board.id,
    };
    return this.prisma.state.findMany({
      where: stateWhereInput,
    });
  }
}
