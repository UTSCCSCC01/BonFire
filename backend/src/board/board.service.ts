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
    const boardWhereUniqueInput: Prisma.BoardWhereInput = {
      user_id: user.id,
      id: boardId,
    };
    const board = await this.prisma.board.findFirst({
      where: boardWhereUniqueInput,
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
    const boardWhereUniqueInput: Prisma.BoardWhereInput = {
      user_id: user.id,
    };
    return this.prisma.board.findMany({
      where: boardWhereUniqueInput,
    });
  }

  /** Update a board
   * @param  {{where:Prisma.BoardWhereUniqueInput;data:Prisma.BoardUpdateInput;}} params
   * @returns Promise
   */
  async update(params: {
    where: Prisma.BoardWhereUniqueInput;
    data: Prisma.BoardUpdateInput;
  }): Promise<Board> {
    const { where, data } = params;
    delete data.created_at;
    delete data.updated_at;

    return this.prisma.board.update({
      data,
      where,
    });
  }

  /** Find all board states
   * @param  {number} boardId
   * @returns Promise
   */
  async findStates(user: User, boardId: number): Promise<StateDto[]> {
    // Find all states tied to a boardId with a specifc user

    const board = await this.prisma.board.findFirst({
      where: {
        user_id: user.id,
        id: boardId,
      },
    });

    // Find all states tied to a boardId with a specifc user
    const stateWhereInput: Prisma.StateWhereInput = {
      board_id: board.id,
    };
    return this.prisma.state.findMany({
      where: stateWhereInput,
    });
  }

  /** Delete a board by id
   * @param  {number} boardId
   * @returns Promise
   */
  async delete(user: User, boardId: number): Promise<Board> {
    const board = await this.prisma.board.findFirst({
      where: {
        user_id: user.id,
        id: boardId,
        },
    });
    if (!board) {
      throw new HttpException('BAD_REQUEST', HttpStatus.UNAUTHORIZED);
    } 
    return this.prisma.board.delete({
      where: {
        id: boardId,
      },
    });
  }
}
