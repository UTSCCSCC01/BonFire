import { Board, Prisma } from '.prisma/client';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import e from 'express';
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
    //check if board already exists with the same name
    const board = await this.prisma.board.findFirst({
      where: {
        title: boardData.title,
        user_id: user.id,
      },
    });
    if (board) {
      throw new HttpException(
        'Already created a board with the same name',
        HttpStatus.BAD_REQUEST,
      );
    }

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
  async findStates(user: User, boardId: number, include?: Prisma.StateInclude): Promise<StateDto[]> {
    // Find all states tied to a boardId with a specific user

    const board = await this.prisma.board.findFirst({
      where: {
        user_id: user.id,
        id: boardId,
      },
    });

    // Find all states tied to a boardId with a specific user
    const stateWhereInput: Prisma.StateWhereInput = {
      board_id: board.id,
    };

    return this.prisma.state.findMany({
      where: stateWhereInput,
      orderBy: [
        {
          order: 'asc',
        },
      ],
      include
    });
  }

  /**
   * Reorganize board states
   *
   * @param {number} id
   * @param {number} oldIndex Previous state index
   * @param {number} newIndex New state index
   */
  async reorderStates(user: User, id: number, oldIndex: any, newIndex: any) {
    let states = await this.findStates(user, id);

    if (oldIndex == newIndex) {
      throw new HttpException('The state index did not change', 400);
    } else if (oldIndex < 0 || newIndex < 0) {
      throw new HttpException('State index cannot be negative', 400);
    } else if (oldIndex > states.length || newIndex > states.length) {
      throw new HttpException('State index cannot be greater than number of states', 400);
    }

    states = states.sort((a, b) => {
      if (a.type === 'TODO') return -1;
      if (a.type === 'DONE') return 1;

      if (b.type === 'TODO') return 1;
      if (b.type === 'DONE') return -1;

      return a.order - b.order;
    });

    let moved = states.splice(newIndex, 1);
    states.splice(oldIndex, 0, moved[0]);

    const promises = [];
    states.forEach((state, i) => {

      promises.push(this.prisma.state.update({
        where: {
            id: state.id,
        },
        data: {
          order: i - 1
        }
      }))
    });

    await Promise.all(promises);

    return;
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
